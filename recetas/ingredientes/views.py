"""
Views para la API de sustitución de ingredientes
"""
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .services.ml_service_final import MLService


@api_view(['POST'])
def predict_substitute(request):
    """
    API endpoint para predecir un sustituto ecuatoriano para un ingrediente
    
    Request body:
    {
        "ingrediente": "Pancetta",
        "top_k": 3  // opcional, default 3
    }
    
    Response:
    {
        "ingrediente_original": "Pancetta",
        "sustitutos": [
            {
                "sustituto": "Tocino ahumado",
                "probabilidad": 85.5,
                "confianza": "ALTA"
            },
            ...
        ],
        "status": "success"
    }
    """
    try:
        # Obtener datos del request
        ingrediente = request.data.get('ingrediente')
        top_k = request.data.get('top_k', 3)
        
        if not ingrediente:
            return Response(
                {'error': 'El campo "ingrediente" es requerido'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Obtener servicio de ML
        ml_service = MLService.get_instance()
        
        # Hacer predicción
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
    """
    API endpoint para predecir sustitutos para múltiples ingredientes
    
    Request body:
    {
        "ingredientes": ["Pancetta", "Parmesano", "Mozzarella"]
    }
    
    Response:
    {
        "resultados": [
            {
                "ingrediente_original": "Pancetta",
                "sustitutos": [...],
                "status": "success"
            },
            ...
        ],
        "total": 3,
        "exitosos": 3,
        "fallidos": 0
    }
    """
    try:
        ingredientes = request.data.get('ingredientes', [])
        
        # DEBUG: Mostrar exactamente qué recibe el servidor
        print("=" * 70)
        print("[API] Ingredientes recibidos del frontend:")
        for i, ing in enumerate(ingredientes, 1):
            print(f"  {i}. '{ing}' (tipo: {type(ing).__name__}, len: {len(ing)}, bytes: {ing.encode('utf-8').hex()})")
        print("=" * 70)
        
        if not ingredientes or not isinstance(ingredientes, list):
            return Response(
                {'error': 'El campo "ingredientes" debe ser una lista no vacía'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Obtener servicio de ML
        ml_service = MLService.get_instance()
        
        # Hacer predicciones en batch
        resultados = ml_service.predict_batch(ingredientes)
        
        # Contar exitosos y fallidos
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
    """
    API endpoint para obtener todos los sustitutos disponibles
    
    Response:
    {
        "sustitutos": ["Tocino ahumado", "Queso fresco", ...],
        "total": 50
    }
    """
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
    """
    API endpoint para obtener información sobre el modelo cargado
    
    Response:
    {
        "model_type": "BERT Multi-Task (Transfer Learning)",
        "base_model": "bert-base-multilingual-cased",
        "num_classes": 50,
        ...
    }
    """
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
    """
    Health check endpoint para verificar que el servicio está funcionando
    
    Response:
    {
        "status": "healthy",
        "model_loaded": true,
        "message": "Servicio funcionando correctamente"
    }
    """
    try:
        ml_service = MLService.get_instance()
        model_loaded = ml_service.model is not None
        
        return Response({
            'status': 'healthy' if model_loaded else 'degraded',
            'model_loaded': model_loaded,
            'message': 'Servicio funcionando correctamente' if model_loaded else 'Modelo no cargado'
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
