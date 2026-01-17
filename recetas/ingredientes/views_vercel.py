"""
Views para Vercel (sin modelo BERT)
"""
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import os

# Usar mock service en Vercel
USE_MOCK = os.getenv('USE_MOCK_ML', 'True') == 'True'

if USE_MOCK:
    from .services.mock_ml_service import MockMLService as MLService
else:
    from .services.ml_service_final import MLService


@api_view(['POST'])
def predict_substitute(request):
    """API endpoint para predecir un sustituto"""
    try:
        ingrediente = request.data.get('ingrediente')
        top_k = request.data.get('top_k', 3)
        
        if not ingrediente:
            return Response(
                {'error': 'El campo "ingrediente" es requerido'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        ml_service = MLService.get_instance()
        sustitutos = ml_service.predict_substitute(ingrediente, top_k=top_k)
        
        return Response({
            'ingrediente_original': ingrediente,
            'sustitutos': sustitutos,
            'status': 'success'
        })
        
    except Exception as e:
        return Response(
            {'error': str(e), 'status': 'error'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
def predict_batch(request):
    """API endpoint para predecir sustitutos para múltiples ingredientes"""
    try:
        ingredientes = request.data.get('ingredientes', [])
        
        if not ingredientes or not isinstance(ingredientes, list):
            return Response(
                {'error': 'El campo "ingredientes" debe ser una lista no vacía'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        ml_service = MLService.get_instance()
        resultados = ml_service.predict_batch(ingredientes)
        
        exitosos = sum(1 for r in resultados if r['status'] == 'success')
        fallidos = len(resultados) - exitosos
        
        return Response({
            'resultados': resultados,
            'total': len(resultados),
            'exitosos': exitosos,
            'fallidos': fallidos
        })
        
    except Exception as e:
        return Response(
            {'error': str(e), 'status': 'error'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
def get_all_substitutes(request):
    """API endpoint para obtener todos los sustitutos disponibles"""
    try:
        ml_service = MLService.get_instance()
        sustitutos = ml_service.get_all_substitutes()
        
        return Response({
            'sustitutos': sustitutos,
            'total': len(sustitutos)
        })
        
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
def model_info(request):
    """API endpoint para obtener información sobre el servicio"""
    try:
        ml_service = MLService.get_instance()
        info = ml_service.get_model_info()
        
        return Response(info)
        
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
def health_check(request):
    """Health check endpoint"""
    try:
        ml_service = MLService.get_instance()
        model_loaded = ml_service.model is not None
        
        return Response({
            'status': 'healthy',
            'model_loaded': model_loaded,
            'message': 'Servicio funcionando correctamente (Mock Mode)' if USE_MOCK else 'Servicio funcionando correctamente',
            'mock_mode': USE_MOCK
        })
        
    except Exception as e:
        return Response(
            {
                'status': 'unhealthy',
                'model_loaded': False,
                'error': str(e)
            },
            status=status.HTTP_503_SERVICE_UNAVAILABLE
        )
