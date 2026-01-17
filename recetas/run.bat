@echo off
echo ====================================
echo  Sistema de Recetas con IA - BERT
echo ====================================
echo.

REM Activar entorno virtual si existe
if exist venv\Scripts\activate.bat (
    echo Activando entorno virtual...
    call venv\Scripts\activate.bat
) else (
    echo ADVERTENCIA: No se encontro el entorno virtual
    echo Ejecuta: python -m venv venv
    echo.
)

REM Verificar si Django está instalado
python -c "import django" 2>nul
if errorlevel 1 (
    echo ERROR: Django no esta instalado
    echo Ejecuta: pip install -r requirements.txt
    pause
    exit /b 1
)

echo.
echo Iniciando servidor Django...
echo Accede a: http://localhost:8000
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

python manage.py runserver
