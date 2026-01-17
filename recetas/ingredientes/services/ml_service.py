"""
Servicio de Machine Learning para predicción de sustitutos de ingredientes
usando modelo BERT con Transfer Learning
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
    para predecir sustitutos de ingredientes ecuatorianos
    """
    _instance = None
    
    def __init__(self):
        self.model = None
        self.tokenizer = None
        self.label_encoder = None
        self.max_length = 64  # Longitud máxima para secuencias BERT
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
            # Cargar tokenizer de BERT
            print(f"Cargando tokenizer desde: {settings.TOKENIZER_PATH}")
            self.tokenizer = BertTokenizer.from_pretrained(str(settings.TOKENIZER_PATH))
            
            # Cargar label encoder
            print(f"Cargando label encoder desde: {settings.LABEL_ENCODER_PATH}")
            with open(settings.LABEL_ENCODER_PATH, 'rb') as f:
                self.label_encoder = pickle.load(f)
            
            # Crear arquitectura del modelo
            print("Creando arquitectura del modelo BERT multi-tarea...")
            self.model = self._create_model_architecture()
            
            # Cargar pesos del modelo
            print(f"Cargando pesos del modelo desde: {settings.MODEL_WEIGHTS_PATH}")
            self.model.load_weights(str(settings.MODEL_WEIGHTS_PATH))
            
            print("✓ Modelo cargado exitosamente")
            
        except Exception as e:
            print(f"Error al cargar el modelo: {e}")
            raise
    
    def _create_model_architecture(self):
        """
        Crea la arquitectura del modelo BERT multi-tarea
        Debe coincidir con la arquitectura usada en el entrenamiento
        """
        from transformers import TFBertModel
        
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
        
        # BERT base model
        bert_model = TFBertModel.from_pretrained('bert-base-multilingual-cased')
        
        # Obtener la salida de BERT
        bert_output = bert_model(input_ids, attention_mask=attention_mask)
        
        # Usar el [CLS] token (primera posición)
        cls_output = bert_output.last_hidden_state[:, 0, :]
        
        # Capas densas
        x = tf.keras.layers.Dense(256, activation='relu')(cls_output)
        x = tf.keras.layers.Dropout(0.3)(x)
        x = tf.keras.layers.Dense(128, activation='relu')(x)
        x = tf.keras.layers.Dropout(0.2)(x)
        
        # Output layer - clasificación multi-clase
        num_classes = len(self.label_encoder.classes_)
        output = tf.keras.layers.Dense(num_classes, activation='softmax', name='output')(x)
        
        # Crear modelo
        model = tf.keras.Model(
            inputs=[input_ids, attention_mask],
            outputs=output
        )
        
        return model
    
    def preprocess_text(self, text):
        """
        Preprocesa el texto del ingrediente para el modelo BERT
        
        Args:
            text: Nombre del ingrediente a procesar
            
        Returns:
            Dict con input_ids y attention_mask
        """
        # Tokenizar usando el tokenizer de BERT
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
        """
        Predice sustitutos ecuatorianos para un ingrediente extranjero
        
        Args:
            ingrediente_original: Nombre del ingrediente (ej: "Pancetta")
            top_k: Número de sustitutos principales a retornar
            
        Returns:
            Lista de diccionarios con los sustitutos y sus probabilidades
        """
        try:
            # Preprocesar el texto
            processed = self.preprocess_text(ingrediente_original)
            
            # Hacer predicción
            predictions = self.model.predict({
                'input_ids': processed['input_ids'],
                'attention_mask': processed['attention_mask']
            }, verbose=0)
            
            # Obtener las top_k predicciones
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
            raise
    
    def predict_batch(self, ingredientes):
        """
        Predice sustitutos para múltiples ingredientes
        
        Args:
            ingredientes: Lista de nombres de ingredientes
            
        Returns:
            Lista de resultados para cada ingrediente
        """
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
        """
        Retorna una etiqueta de confianza basada en la probabilidad
        """
        if probability >= 0.8:
            return 'ALTA'
        elif probability >= 0.5:
            return 'MEDIA'
        else:
            return 'BAJA'
    
    def get_all_substitutes(self):
        """
        Retorna todos los sustitutos disponibles en el modelo
        """
        return list(self.label_encoder.classes_)
    
    def get_model_info(self):
        """
        Retorna información sobre el modelo cargado
        """
        return {
            'model_type': 'BERT Multi-Task (Transfer Learning)',
            'base_model': 'bert-base-multilingual-cased',
            'num_classes': len(self.label_encoder.classes_),
            'max_sequence_length': self.max_length,
            'available_substitutes': len(self.label_encoder.classes_),
            'status': 'loaded' if self.model is not None else 'not_loaded'
        }
