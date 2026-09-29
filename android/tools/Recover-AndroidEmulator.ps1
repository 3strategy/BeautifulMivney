#Requires -Version 5.1
<#
.SYNOPSIS
Stop a stuck Android emulator so it can be started again from Android Studio.

.EXAMPLE
.\Recover-AndroidEmulator.ps1
.EXAMPLE
.\Recover-AndroidEmulator.ps1 -List
.EXAMPLE
.\Recover-AndroidEmulator.ps1 -AvdName Pixel_6_Pro

By default, stops Medium_Phone_API_36. -List only shows matching processes.
It does not use ADB, change the AVD, or start an emulator. An app running
inside the selected AVD will be stopped abruptly.
#>
[CmdletBinding(SupportsShouldProcess = $true)]
param(
    [ValidatePattern('^[A-Za-z0-9_.-]+$')]
    [string]$AvdName = 'Medium_Phone_API_36',
    [switch]$List,
    [switch]$Kill
)

if ($List -and $Kill) { throw 'Use either -List or -Kill, not both.' }

$escapedName = [regex]::Escape($AvdName)
$avdArgument = "(?i)(?:^|\s)-avd\s+(?:`"$escapedName`"|$escapedName)(?=\s|$)"

function Get-AvdProcesses {
    Get-CimInstance Win32_Process |
        Where-Object {
            $_.Name -match '^(?:emulator|qemu-system-.*)\.exe$' -and
            $_.CommandLine -match $avdArgument
        } |
        Sort-Object Name
}

$processes = @(Get-AvdProcesses)
if ($processes.Count -eq 0) {
    Write-Host "No running emulator process found for AVD '$AvdName'."
    return
}

$processes | Select-Object ProcessId, ParentProcessId, Name, CommandLine | Format-Table -AutoSize
if ($List) {
    Write-Host 'Run without -List to stop this AVD, then start it in Android Studio Device Manager.'
    return
}

$taskkill = Join-Path $env:SystemRoot 'System32\taskkill.exe'
$selectedPids = @($processes | ForEach-Object { $_.ProcessId })
# /T stops descendants, so only target roots; QEMU is normally a child of emulator.exe.
$roots = @($processes | Where-Object { $_.ParentProcessId -notin $selectedPids })
foreach ($process in $roots) {
    # Recheck the PID and AVD command line in case the process has exited or
    # its PID has been reused since the initial listing.
    $current = Get-CimInstance Win32_Process -Filter "ProcessId = $($process.ProcessId)" -ErrorAction SilentlyContinue
    if (-not $current -or $current.Name -notmatch '^(?:emulator|qemu-system-.*)\.exe$' -or
        $current.CommandLine -notmatch $avdArgument) { continue }

    if ($PSCmdlet.ShouldProcess("$($current.Name) PID $($current.ProcessId) for '$AvdName'", 'Stop process tree')) {
        & $taskkill /PID $current.ProcessId /T /F
        if ($LASTEXITCODE -ne 0) {
            $stillRunning = Get-CimInstance Win32_Process -Filter "ProcessId = $($current.ProcessId)" -ErrorAction SilentlyContinue
            if ($stillRunning -and $stillRunning.CommandLine -match $avdArgument) {
                throw "Could not stop PID $($current.ProcessId)."
            }
        }
    }
}

if (-not $WhatIfPreference) {
    if (@(Get-AvdProcesses).Count -gt 0) { throw "Some processes for '$AvdName' are still running." }
    Write-Host "Stopped '$AvdName'. Start it from Android Studio Device Manager."
}
