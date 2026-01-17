"""
Servicio de Machine Learning ALTERNATIVO para predicción de sustitutos de ingredientes
Esta versión intenta cargar el modelo de forma más flexible
"""
import os
import pickle
import numpy as np
import tensorflow as tf
from transformers import BertTokenizer
from django.conf import settings


class MLService:
    """
    Servicio singleton para cargar y usar el modelo BERT
    Versión alternativa que intenta múltiples métodos de carga
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
            # Cargar tokenizer
            print(f"Cargando tokenizer desde: {settings.TOKENIZER_PATH}")
            self.tokenizer = BertTokenizer.from_pretrained(str(settings.TOKENIZER_PATH))
            
            # Cargar label encoder
            print(f"Cargando label encoder desde: {settings.LABEL_ENCODER_PATH}")
            with open(settings.LABEL_ENCODER_PATH, 'rb') as f:
                self.label_encoder = pickle.load(f)
            
            print(f"Clases encontradas: {len(self.label_encoder.classes_)}")
            
            # MÉTODO 1: Intentar cargar el modelo completo directamente
            try:
                print("Intentando cargar modelo completo...")
                model_dir = settings.MODEL_WEIGHTS_PATH.parent
                
                # Buscar archivo .keras o modelo completo
                keras_file = model_dir / 'multi_task_model.keras'
                h5_model_file = model_dir / 'multi_task_model.h5'
                
                if keras_file.exists():
                    print(f"Encontrado archivo .keras: {keras_file}")
                    self.model = tf.keras.models.load_model(str(keras_file))
                    print("✓ Modelo cargado desde .keras")
                    return
                elif h5_model_file.exists():
                    print(f"Encontrado archivo modelo .h5: {h5_model_file}")
                    self.model = tf.keras.models.load_model(str(h5_model_file))
                    print("✓ Modelo cargado desde .h5 completo")
                    return
                else:
                    print("No se encontró modelo completo, intentando cargar solo pesos...")
            except Exception as e:
                print(f"No se pudo cargar modelo completo: {e}")
            
            # MÉTODO 2: Cargar solo pesos (requiere recrear arquitectura)
            print("Intentando cargar pesos del modelo...")
            self.model = self._create_flexible_model()
            
            # Intentar cargar los pesos
            print(f"Cargando pesos desde: {settings.MODEL_WEIGHTS_PATH}")
            try:
                self.model.load_weights(str(settings.MODEL_WEIGHTS_PATH))
                print("✓ Pesos cargados exitosamente")
            except Exception as e:
                print(f"Error al cargar pesos: {e}")
                # Intentar con by_name=True y skip_mismatch=True
                print("Intentando carga flexible de pesos...")
                self.model.load_weights(
                    str(settings.MODEL_WEIGHTS_PATH),
                    by_name=True,
                    skip_mismatch=True
                )
                print("✓ Pesos cargados con skip_mismatch=True")
            
            print("✓ Modelo cargado exitosamente")
            
        except Exception as e:
            print(f"Error al cargar el modelo: {e}")
            import traceback
            traceback.print_exc()
            raise
    
    def _create_flexible_model(self):
        """
        Crea una arquitectura flexible del modelo
        Intenta adaptarse a diferentes configuraciones
        """
        from transformers import TFBertModel
        
        num_classes = len(self.label_encoder.classes_)
        print(f"Creando modelo para {num_classes} clases...")
        
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
        
        # BERT model
        bert_model = TFBertModel.from_pretrained(
            'bert-base-multilingual-cased',
            from_pt=False
        )
        
        # Obtener la salida de BERT
        bert_output = bert_model(input_ids, attention_mask=attention_mask)
        cls_output = bert_output.last_hidden_state[:, 0, :]
        
        # OPCIÓN 1: Arquitectura simple (sin capas intermedias)
        # output = tf.keras.layers.Dense(num_classes, activation='softmax', name='output')(cls_output)
        
        # OPCIÓN 2: Arquitectura con 1 capa densa
        # x = tf.keras.layers.Dense(256, activation='relu')(cls_output)
        # output = tf.keras.layers.Dense(num_classes, activation='softmax', name='output')(x)
        
        # OPCIÓN 3: Arquitectura completa (la que teníamos)
        x = tf.keras.layers.Dense(256, activation='relu', name='dense_1')(cls_output)
        x = tf.keras.layers.Dropout(0.3, name='dropout_1')(x)
        x = tf.keras.layers.Dense(128, activation='relu', name='dense_2')(x)
        x = tf.keras.layers.Dropout(0.2, name='dropout_2')(x)
        output = tf.keras.layers.Dense(num_classes, activation='softmax', name='output')(x)
        
        model = tf.keras.Model(
            inputs=[input_ids, attention_mask],
            outputs=output,
            name='bert_classifier'
        )
        
        print(f"Modelo creado con {len(model.layers)} capas")
        print("Resumen del modelo:")
        model.summary()
        
        return model
    
    def preprocess_text(self, text):
        """Preprocesa el texto del ingrediente para el modelo BERT"""
        encoding = self.tokenizer.encode_plus(
            text,
            add_special_tokens=True,
            max_length=self.max_length,
            padding='max_length',
            truncation=True,
            return_attention_mask=True,
            return_tensors='np'
        )
        
        return {
            'input_ids': encoding['input_ids'],
            'attention_mask': encoding['attention_mask']
        }
    
    def predict_substitute(self, ingrediente_original, top_k=3):
        """Predice sustitutos ecuatorianos para un ingrediente extranjero"""
        try:
            if self.model is None:
                return [{
                    'sustituto': 'Modelo no disponible',
                    'probabilidad': 0.0,
                    'confianza': 'BAJA'
                }]
            
            processed = self.preprocess_text(ingrediente_original)
            
            predictions = self.model.predict({
                'input_ids': processed['input_ids'],
                'attention_mask': processed['attention_mask']
            }, verbose=0)
            
            top_indices = np.argsort(predictions[0])[-top_k:][::-1]
            
            results = []
            for idx in top_indices:
                sustituto = self.label_encoder.classes_[idx]
                probabilidad = float(predictions[0][idx])
                
                results.append({
                    'sustituto': sustituto,
                    'probabilidad': round(probabilidad * 100, 2),
                    'confianza': self._get_confidence_label(probabilidad)
                })
            
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
            'model_type': 'BERT Multi-Task (Transfer Learning)',
            'base_model': 'bert-base-multilingual-cased',
            'num_classes': len(self.label_encoder.classes_),
            'max_sequence_length': self.max_length,
            'available_substitutes': len(self.label_encoder.classes_),
            'status': 'loaded' if self.model is not None else 'not_loaded',
            'model_layers': len(self.model.layers) if self.model is not None else 0
        }
