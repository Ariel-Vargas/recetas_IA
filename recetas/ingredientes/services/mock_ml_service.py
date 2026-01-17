"""
Mock ML Service para Vercel (sin modelo BERT por limitaciones de tamaño)
Usa sustituciones predefinidas en lugar del modelo de IA
"""
import os

class MockMLService:
    _instance = None
    
    # Sustituciones predefinidas (simulando el modelo)
    SUBSTITUCIONES = {
        "pancetta": [
            {"sustituto": "Tocino ahumado", "probabilidad": 92.5, "confianza": "ALTA"},
            {"sustituto": "Chorizo", "probabilidad": 78.3, "confianza": "MEDIA"},
            {"sustituto": "Jamón", "probabilidad": 65.0, "confianza": "MEDIA"}
        ],
        "bacon": [
            {"sustituto": "Tocino ahumado", "probabilidad": 95.0, "confianza": "ALTA"},
            {"sustituto": "Chorizo", "probabilidad": 75.0, "confianza": "MEDIA"}
        ],
        "parmesano": [
            {"sustituto": "Queso fresco", "probabilidad": 88.0, "confianza": "ALTA"},
            {"sustituto": "Queso maduro", "probabilidad": 82.5, "confianza": "ALTA"}
        ],
        "parmigiano": [
            {"sustituto": "Queso fresco", "probabilidad": 88.0, "confianza": "ALTA"},
            {"sustituto": "Queso maduro", "probabilidad": 82.5, "confianza": "ALTA"}
        ],
        "mozzarella": [
            {"sustituto": "Queso fresco", "probabilidad": 90.0, "confianza": "ALTA"},
            {"sustituto": "Quesillo", "probabilidad": 85.0, "confianza": "ALTA"}
        ],
        "basilico": [
            {"sustituto": "Albahaca", "probabilidad": 98.0, "confianza": "ALTA"},
            {"sustituto": "Cilantro", "probabilidad": 60.0, "confianza": "MEDIA"}
        ],
        "albahaca": [
            {"sustituto": "Cilantro", "probabilidad": 75.0, "confianza": "MEDIA"},
            {"sustituto": "Hierbabuena", "probabilidad": 65.0, "confianza": "MEDIA"}
        ],
        "pecorino": [
            {"sustituto": "Queso fresco", "probabilidad": 85.0, "confianza": "ALTA"},
            {"sustituto": "Queso maduro", "probabilidad": 80.0, "confianza": "ALTA"}
        ],
        "guanciale": [
            {"sustituto": "Tocino", "probabilidad": 90.0, "confianza": "ALTA"},
            {"sustituto": "Chorizo", "probabilidad": 70.0, "confianza": "MEDIA"}
        ],
        "prosciutto": [
            {"sustituto": "Jamón", "probabilidad": 92.0, "confianza": "ALTA"},
            {"sustituto": "Tocino", "probabilidad": 75.0, "confianza": "MEDIA"}
        ],
    }
    
    @classmethod
    def get_instance(cls):
        """Singleton para obtener la instancia del servicio"""
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance
    
    def __init__(self):
        self.model = "mock"  # Para compatibilidad
        print("🔧 Mock ML Service inicializado (sin modelo BERT por limitaciones de Vercel)")
    
    def normalize_text(self, text):
        """Normalizar texto para búsqueda"""
        import unicodedata
        text = text.lower().strip()
        # Remover acentos
        text = ''.join(
            c for c in unicodedata.normalize('NFD', text)
            if unicodedata.category(c) != 'Mn'
        )
        return text
    
    def predict_substitute(self, ingrediente, top_k=3):
        """
        Predice sustitutos para un ingrediente usando datos predefinidos
        
        Args:
            ingrediente (str): Nombre del ingrediente
            top_k (int): Número de sustitutos a retornar
            
        Returns:
            list: Lista de diccionarios con sustitutos y probabilidades
        """
        ingrediente_norm = self.normalize_text(ingrediente)
        
        # Buscar en sustituciones predefinidas
        if ingrediente_norm in self.SUBSTITUCIONES:
            return self.SUBSTITUCIONES[ingrediente_norm][:top_k]
        
        # Si no está en la lista, retornar sustituto genérico
        return [
            {
                "sustituto": "Ingrediente local similar",
                "probabilidad": 50.0,
                "confianza": "BAJA"
            }
        ]
    
    def predict_batch(self, ingredientes):
        """
        Predice sustitutos para múltiples ingredientes
        
        Args:
            ingredientes (list): Lista de nombres de ingredientes
            
        Returns:
            list: Lista de resultados para cada ingrediente
        """
        resultados = []
        
        for ing in ingredientes:
            try:
                sustitutos = self.predict_substitute(ing, top_k=3)
                resultados.append({
                    'ingrediente_original': ing,
                    'sustitutos': sustitutos,
                    'status': 'success'
                })
            except Exception as e:
                resultados.append({
                    'ingrediente_original': ing,
                    'error': str(e),
                    'status': 'error'
                })
        
        return resultados
    
    def get_all_substitutes(self):
        """Retorna todos los sustitutos disponibles"""
        all_subs = set()
        for subs_list in self.SUBSTITUCIONES.values():
            for sub in subs_list:
                all_subs.add(sub['sustituto'])
        return sorted(list(all_subs))
    
    def get_model_info(self):
        """Retorna información del servicio"""
        return {
            'model_type': 'Mock Service (Static Substitutions)',
            'message': 'Usando sustituciones predefinidas debido a limitaciones de Vercel',
            'num_substitutions': len(self.SUBSTITUCIONES),
            'available': True
        }
