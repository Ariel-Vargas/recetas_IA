@echo off
echo ====================================
echo  Instalacion - Sistema de Recetas
echo ====================================
echo.

REM Verificar Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python no esta instalado
    echo Descarga Python desde: https://www.python.org/downloads/
    pause
    exit /b 1
)

echo [1/5] Creando entorno virtual...
python -m venv venv
if errorlevel 1 (
    echo ERROR: No se pudo crear el entorno virtual
    pause
    exit /b 1
)

echo [2/5] Activando entorno virtual...
call venv\Scripts\activate.bat

echo [3/5] Instalando dependencias (esto puede tardar varios minutos)...
pip install --upgrade pip
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: No se pudieron instalar las dependencias
    pause
    exit /b 1
)

echo [4/5] Creando base de datos...
python manage.py migrate

echo [5/5] Verificando instalacion...
python -c "import django; import tensorflow; import transformers; print('OK')"
if errorlevel 1 (
    echo ERROR: Algunos paquetes no se instalaron correctamente
    pause
    exit /b 1
)

echo.
echo ====================================
echo  Instalacion completada exitosamente
echo ====================================
echo.
echo Para iniciar el servidor ejecuta:
echo   run.bat
echo.
echo O manualmente:
echo   venv\Scripts\activate
echo   python manage.py runserver
echo.
pause
