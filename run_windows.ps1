# Install Node.js and npm (using nvm for easier version management)
Write-Host "Installing nvm (Node Version Manager)..."
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/coreybutler/nvm-windows/v1.1.12/install.ps1" -OutFile "nvm-install.ps1"
Start-Process powershell -ArgumentList "-ExecutionPolicy Bypass -File nvm-install.ps1" -Wait
Remove-Item "nvm-install.ps1"

Write-Host "Installing latest LTS Node.js using nvm..."
nvm install lts
nvm use lts

# Verify Node.js and npm installation
Write-Host "Verifying Node.js and npm installations..."
node --version
npm --version

# Install Bun
Write-Host "Installing Bun..."
&{Invoke-WebRequest -UseBasicParsing -Uri https://bun.sh/install | Invoke-Expression}

# Verify Bun installation
Write-Host "Verifying Bun installation..."
bun --version

# Navigate to your project directory (replace with your actual path)
$projectPath = "C:\Program Files\loop-present" #<---Replace with your project path
if (!(Test-Path -Path $projectPath -PathType Container)) {
    Write-Error "Project path '$projectPath' does not exist."
    return
}
Set-Location $projectPath

# Install dependencies and run the development server
Write-Host "Installing Bun dependencies and starting development server..."
Start-Process bun -ArgumentList "i && bun run dev" -NoNewWindow

# Wait for the development server to start (you might need to adjust the delay)
Start-Sleep -Seconds 10 # Adjust as needed

# Open the browser
Write-Host "Opening browser to localhost:3000..."
Start-Process "http://localhost:3000"

Write-Host "Script completed."