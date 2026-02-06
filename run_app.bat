@echo off
echo Starting Radio-Base...

echo Starting Backend...
cd Backend
start "Radio-Base Backend" cmd /k ".\mvnw.cmd spring-boot:run"
cd ..

echo Starting Frontend...
cd Frontend
start "Radio-Base Frontend" cmd /k "npm run dev"
cd ..

echo Application starting.
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000
pause
