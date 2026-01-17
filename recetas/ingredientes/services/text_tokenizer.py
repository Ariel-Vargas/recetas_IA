"""
TextTokenizer - Clase para tokenización de ingredientes
Idéntica a la usada durante el entrenamiento del modelo
"""
from transformers import AutoTokenizer


class TextTokenizer:
    def __init__(self, model_name, max_len=64):
        self.model_name = model_name
        self.max_len = max_len
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)

    def encode(self, texts):
        """
        Tokeniza una lista de textos
        
        Args:
            texts: Lista de strings a tokenizar
            
        Returns:
            tuple: (input_ids, attention_mask) como numpy arrays
        """
        tokens = self.tokenizer(
            texts,
            padding="max_length",
            truncation=True,
            max_length=self.max_len,
            return_tensors="tf"
        )
        return tokens["input_ids"].numpy(), tokens["attention_mask"].numpy()

    def analyze_lengths(self, texts):
        """Analiza la longitud de los textos tokenizados"""
        lengths = []
        for text in texts:
            tokens = self.tokenizer(text, truncation=False)
            lengths.append(len(tokens['input_ids']))
        return lengths
