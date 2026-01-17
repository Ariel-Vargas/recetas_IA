"""
Servicio de Machine Learning para modelo de clasificación de ingredientes
Arquitectura: TFAutoModel → pooler_output → Dropout → Dense(gelu) → Dropout → Dense(softmax)
"""
import os
import pickle
import numpy as np
import tensorflow as tf
from django.conf import settings
from .text_tokenizer import TextTokenizer


class MLService:
    """
    Servicio singleton para modelo BERT multi-tarea
    """
    _instance = None
    
    def __init__(self):
        self.model = None
        self.tokenizer = None
        self.label_encoder = None
        self.max_length = 64
        self._load_model()
    
    @classmethod
    def get_instance(cls):
        """Obtiene la instancia singleton del servicio"""
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance
    
    def _load_model(self):
        """Carga el modelo, tokenizer y label encoder"""
        try:
            # Cargar configuración del modelo
            config_path = settings.MODEL_PATH / 'config.pkl'
            print(f"Cargando configuracion desde: {config_path}")
            with open(config_path, 'rb') as f:
                self.config = pickle.load(f)
            
            print(f"Modelo BERT: {self.config['model_name']}")
            print(f"Max length: {self.config['max_len']}")
            print(f"Numero de labels: {self.config['num_labels']}")
            
            # Actualizar max_length desde config
            self.max_length = self.config['max_len']
            
            # Cargar tokenizer usando TextTokenizer (igual que en entrenamiento)
            print(f"Cargando tokenizer: {self.config['model_name']}")
            self.tokenizer = TextTokenizer(
                model_name=self.config['model_name'],
                max_len=self.config['max_len']
            )
            print(f"[OK] TextTokenizer creado correctamente")
            
            # Cargar label encoder
            print(f"Cargando label encoder desde: {settings.LABEL_ENCODER_PATH}")
            with open(settings.LABEL_ENCODER_PATH, 'rb') as f:
                self.label_encoder = pickle.load(f)
            
            num_label_classes = len(self.label_encoder.classes_)
            print(f"Clases de ingredientes: {num_label_classes}")
            
            # Intentar cargar el modelo completo primero
            modelo_completo_path = settings.MODEL_PATH / 'modelo_completo.h5'
            
            if modelo_completo_path.exists():
                # Cargar modelo completo (arquitectura + pesos)
                print(f"[OK] Encontrado modelo completo: {modelo_completo_path}")
                print("Cargando modelo completo (arquitectura + pesos)...")
                
                # Importar TFAutoModel para custom_object_scope
                from transformers import TFAutoModel, TFBertModel
                
                # Usar custom_object_scope para que Keras reconozca las capas de transformers
                with tf.keras.utils.custom_object_scope({'TFBertModel': TFBertModel, 'TFAutoModel': TFAutoModel}):
                    self.model = tf.keras.models.load_model(str(modelo_completo_path))
                print("[OK] Modelo completo cargado exitosamente")
            else:
                # Fallback: crear arquitectura y cargar pesos
                print("[ADVERTENCIA] No se encontro modelo_completo.h5")
                print("             Usando metodo alternativo: crear arquitectura + cargar pesos")
                print("Creando arquitectura del modelo multi-tarea...")
                self.model = self._create_multitask_model(num_label_classes)
                
                print(f"Cargando pesos desde: {settings.MODEL_WEIGHTS_PATH}")
                print("[ADVERTENCIA] La arquitectura es diferente a la del archivo .h5")
                print("             Intentando carga flexible con by_name=True y skip_mismatch=True")
                try:
                    # Cargar pesos por nombre, ignorando capas que no coincidan
                    self.model.load_weights(
                        str(settings.MODEL_WEIGHTS_PATH),
                        by_name=True,
                        skip_mismatch=True
                    )
                    print("[OK] Pesos cargados (se cargaron las capas compatibles)")
                    print("     NOTA: Algunas capas pueden no haberse cargado debido a diferencias de arquitectura")
                except Exception as e:
                    print(f"[ERROR] No se pudieron cargar los pesos: {e}")
                    raise
            
            print("[OK] Modelo BERT multi-tarea cargado exitosamente")
            
        except Exception as e:
            print(f"Error al cargar el modelo: {e}")
            import traceback
            traceback.print_exc()
            raise
    
    def _create_multitask_model(self, num_label_classes):
        """
        Crea la arquitectura EXACTA del modelo de entrenamiento
        
        Arquitectura (TransformerEncoder):
        - TFAutoModel.from_pretrained (no TFBertModel)
        - pooler_output (no [CLS] token directo)
        - Dropout(0.3)
        - Dense(256, gelu)  ← GELU, no ReLU
        - Dropout(0.2)      ← 0.2, no 0.3
        - Dense(num_labels, softmax)
        """
        from transformers import TFAutoModel
        
        # Input layers
        input_ids = tf.keras.layers.Input(
            shape=(self.max_length,), 
            dtype=tf.int32, 
            name='input_ids'
        )
        attention_mask = tf.keras.layers.Input(
            shape=(self.max_length,), 
            dtype=tf.int32, 
            name='attention_mask'
        )
        
        # Cargar el encoder usando TFAutoModel (igual que en entrenamiento)
        print(f"Cargando TFAutoModel: {self.config['model_name']}")
        encoder = TFAutoModel.from_pretrained(self.config['model_name'])
        
        # Obtener outputs del encoder
        outputs = encoder(input_ids, attention_mask=attention_mask)
        
        # IMPORTANTE: Usar pooler_output (no last_hidden_state[:, 0, :])
        cls_embedding = outputs.pooler_output
        
        # Primera capa dropout (0.3)
        x = tf.keras.layers.Dropout(0.3)(cls_embedding)
        
        # Capa densa intermedia con GELU (no ReLU!)
        x = tf.keras.layers.Dense(256, activation="gelu")(x)
        
        # Segunda capa dropout (0.2, no 0.3!)
        x = tf.keras.layers.Dropout(0.2)(x)
        
        # Capa de salida
        output = tf.keras.layers.Dense(
            num_label_classes, 
            activation="softmax", 
            name="label_out"
        )(x)
        
        # Crear modelo
        model = tf.keras.Model(
            inputs=[input_ids, attention_mask],
            outputs=output
        )
        
        print(f"Modelo creado con {len(model.layers)} capas")
        print(f"Arquitectura: TFAutoModel -> pooler_output -> Dropout(0.3) -> Dense(256, gelu) -> Dropout(0.2) -> Dense({num_label_classes}, softmax)")
        
        return model
    
    def preprocess_text(self, text):
        """
        Preprocesa el texto usando TextTokenizer (idéntico al entrenamiento)
        Convierte a minúsculas para mejorar las predicciones
        """
        # Convertir a minúsculas para el modelo
        text_lower = text.lower().strip()
        
        # Debug: mostrar la conversión
        if text != text_lower:
            print(f"[Normalización] '{text}' -> '{text_lower}'")
        
        # Tokenizar usando TextTokenizer.encode() (igual que en entrenamiento)
        # IMPORTANTE: encode() espera una lista y retorna (ids, mask)
        ids, mask = self.tokenizer.encode([text_lower])
        
        return {
            'input_ids': ids,
            'attention_mask': mask
        }
    
    def predict_substitute(self, ingrediente_original, top_k=3):
        """
        Predice sustitutos ecuatorianos para un ingrediente extranjero
        
        El modelo retorna la predicción de label_out (clases de ingredientes/sustitutos)
        """
        try:
            # DEBUG: Mostrar ingrediente original
            print(f"[ML] Predicción para: '{ingrediente_original}'")
            
            if self.model is None:
                return [{
                    'sustituto': 'Modelo no disponible',
                    'probabilidad': 0.0,
                    'confianza': 'BAJA'
                }]
            
            processed = self.preprocess_text(ingrediente_original)
            
            # El modelo retorna un array con las predicciones
            predictions = self.model.predict({
                'input_ids': processed['input_ids'],
                'attention_mask': processed['attention_mask']
            }, verbose=0)
            
            # predictions shape: (1, num_classes)
            label_predictions = predictions[0]  # Tomar el primer (y único) ejemplo
            
            # Obtener top_k predicciones
            top_indices = np.argsort(label_predictions)[-top_k:][::-1]
            
            results = []
            for idx in top_indices:
                sustituto = self.label_encoder.classes_[idx]
                probabilidad = float(label_predictions[idx])
                
                results.append({
                    'sustituto': sustituto,
                    'probabilidad': round(probabilidad * 100, 2),
                    'confianza': self._get_confidence_label(probabilidad)
                })
            
            # DEBUG: Mostrar mejor resultado
            if results:
                print(f"[ML] Mejor resultado: '{results[0]['sustituto']}' ({results[0]['probabilidad']}%)")
            
            return results
            
        except Exception as e:
            print(f"Error en predicción: {e}")
            import traceback
            traceback.print_exc()
            return [{
                'sustituto': f'Error: {str(e)}',
                'probabilidad': 0.0,
                'confianza': 'BAJA'
            }]
    
    def predict_batch(self, ingredientes):
        """Predice sustitutos para múltiples ingredientes"""
        results = []
        for ingrediente in ingredientes:
            try:
                substitutos = self.predict_substitute(ingrediente)
                results.append({
                    'ingrediente_original': ingrediente,
                    'sustitutos': substitutos,
                    'status': 'success'
                })
            except Exception as e:
                results.append({
                    'ingrediente_original': ingrediente,
                    'error': str(e),
                    'status': 'error'
                })
        
        return results
    
    def _get_confidence_label(self, probability):
        """Retorna una etiqueta de confianza basada en la probabilidad"""
        if probability >= 0.8:
            return 'ALTA'
        elif probability >= 0.5:
            return 'MEDIA'
        else:
            return 'BAJA'
    
    def get_all_substitutes(self):
        """Retorna todos los sustitutos disponibles en el modelo"""
        return list(self.label_encoder.classes_)
    
    def get_model_info(self):
        """Retorna información sobre el modelo cargado"""
        return {
            'model_type': 'BERT Spanish (Transfer Learning)',
            'base_model': self.config['model_name'] if self.config else 'unknown',
            'architecture': f'BERT -> Dropout -> Dense(256) -> Dense({len(self.label_encoder.classes_)})',
            'num_classes': len(self.label_encoder.classes_),
            'max_sequence_length': self.max_length,
            'available_substitutes': len(self.label_encoder.classes_),
            'outputs': {
                'label_out': f'{len(self.label_encoder.classes_)} clases (ingredientes/sustitutos)'
            },
            'status': 'loaded' if self.model is not None else 'not_loaded',
            'model_layers': len(self.model.layers) if self.model is not None else 0
        }
