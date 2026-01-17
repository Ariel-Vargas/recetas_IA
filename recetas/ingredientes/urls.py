"""
URL configuration para la app de ingredientes
"""
from django.urls import path
import os

# Usar views de Vercel si está en modo mock
USE_MOCK = os.getenv('USE_MOCK_ML', 'False') == 'True'

if USE_MOCK:
    from . import views_vercel as views
else:
    from . import views

app_name = 'ingredientes'

urlpatterns = [
    # API endpoints para predicción
    path('predict/', views.predict_substitute, name='predict_substitute'),
    path('predict-batch/', views.predict_batch, name='predict_batch'),
    
    # Endpoints de información
    path('substitutes/', views.get_all_substitutes, name='all_substitutes'),
    path('model-info/', views.model_info, name='model_info'),
    
    # Health check
    path('health/', views.health_check, name='health_check'),
]
