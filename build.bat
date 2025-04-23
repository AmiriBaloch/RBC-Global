@echo off
echo Building React app...
call npm run vite build
echo Copying configuration files...
if not exist "dist" mkdir dist
copy public\_redirects dist\ /Y
copy now.json dist\ /Y
copy vercel.json dist\ /Y
echo Build completed successfully! 