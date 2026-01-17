from django.apps import AppConfig


class IngredientesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ingredientes'
    
    def ready(self):
        """
        Inicializa el servicio de ML cuando la app esté lista
        """
        from .services.ml_service_final import MLService
        
        # Precarga del modelo al iniciar la aplicación
        try:
            MLService.get_instance()
            print("[OK] Modelo BERT multi-tarea cargado exitosamente")
        except Exception as e:
            print(f"[ERROR] Error al cargar el modelo BERT: {e}")
            import traceback
            traceback.print_exc()
