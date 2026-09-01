[CmdletBinding()]
param(
    [string]$AndroidStudioRoot = 'C:\Users\3stra\AndroidStudioProjects'
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$auditor = Join-Path $PSScriptRoot 'Invoke-AndroidConceptAudit.ps1'
if (-not (Test-Path -LiteralPath $auditor -PathType Leaf)) {
    throw "Audit script not found: $auditor"
}

function Invoke-ProjectAudit {
    param([string]$ProjectName)

    $path = Join-Path $AndroidStudioRoot $ProjectName
    if (-not (Test-Path -LiteralPath $path -PathType Container)) {
        throw "Required companion project not found: $path"
    }
    @(& $auditor -ProjectPath $path -EvidenceLimit 2 -PassThru)
}

function Assert-ConceptStatus {
    param(
        [object[]]$Audit,
        [string]$ProjectName,
        [string]$ConceptId,
        [string]$ExpectedStatus
    )

    $row = @($Audit | Where-Object { $_.Id -eq $ConceptId })
    if ($row.Count -ne 1) {
        throw "[$ProjectName] Expected exactly one '$ConceptId' result; found $($row.Count)."
    }
    if ($row[0].Status -ne $ExpectedStatus) {
        $evidence = $row[0].Evidence -join ', '
        throw "[$ProjectName] '$ConceptId' expected '$ExpectedStatus' but was '$($row[0].Status)'. Evidence: $evidence"
    }
    Write-Host ("PASS [{0}] {1} => {2}" -f $ProjectName, $ConceptId, $ExpectedStatus)
}

$ticTacMenu = Invoke-ProjectAudit -ProjectName 'TicTacMenu'
$collectCircles = Invoke-ProjectAudit -ProjectName 'CollectCircles'
$sqlRequery = Invoke-ProjectAudit -ProjectName 'sqlrequery'

$assertions = @(
    @{ Audit = $ticTacMenu; Project = 'TicTacMenu'; Id = 'activities'; Status = 'Present' },
    @{ Audit = $ticTacMenu; Project = 'TicTacMenu'; Id = 'fragments'; Status = 'Present' },
    @{ Audit = $ticTacMenu; Project = 'TicTacMenu'; Id = 'view-binding'; Status = 'Present' },
    @{ Audit = $ticTacMenu; Project = 'TicTacMenu'; Id = 'firebase-rtdb'; Status = 'Present' },
    @{ Audit = $ticTacMenu; Project = 'TicTacMenu'; Id = 'firebase-auth'; Status = 'Present' },
    @{ Audit = $ticTacMenu; Project = 'TicTacMenu'; Id = 'shared-preferences'; Status = 'Present' },
    @{ Audit = $ticTacMenu; Project = 'TicTacMenu'; Id = 'workmanager'; Status = 'Not detected' },
    @{ Audit = $ticTacMenu; Project = 'TicTacMenu'; Id = 'recyclerview'; Status = 'Not detected' },
    @{ Audit = $ticTacMenu; Project = 'TicTacMenu'; Id = 'custom-view-canvas'; Status = 'Not detected' },
    @{ Audit = $ticTacMenu; Project = 'TicTacMenu'; Id = 'android-service'; Status = 'Not detected' },

    @{ Audit = $collectCircles; Project = 'CollectCircles'; Id = 'activities'; Status = 'Present' },
    @{ Audit = $collectCircles; Project = 'CollectCircles'; Id = 'custom-view-canvas'; Status = 'Present' },
    @{ Audit = $collectCircles; Project = 'CollectCircles'; Id = 'touch-input'; Status = 'Present' },
    @{ Audit = $collectCircles; Project = 'CollectCircles'; Id = 'shared-preferences'; Status = 'Present' },
    @{ Audit = $collectCircles; Project = 'CollectCircles'; Id = 'notifications'; Status = 'Present' },
    @{ Audit = $collectCircles; Project = 'CollectCircles'; Id = 'fcm-service'; Status = 'Present' },
    @{ Audit = $collectCircles; Project = 'CollectCircles'; Id = 'android-service'; Status = 'Present' },
    @{ Audit = $collectCircles; Project = 'CollectCircles'; Id = 'workmanager'; Status = 'Present' },
    @{ Audit = $collectCircles; Project = 'CollectCircles'; Id = 'json'; Status = 'Present' },
    @{ Audit = $collectCircles; Project = 'CollectCircles'; Id = 'recyclerview'; Status = 'Not detected' },
    @{ Audit = $collectCircles; Project = 'CollectCircles'; Id = 'requery'; Status = 'Not detected' },
    @{ Audit = $collectCircles; Project = 'CollectCircles'; Id = 'location'; Status = 'Not detected' },
    @{ Audit = $collectCircles; Project = 'CollectCircles'; Id = 'camera-gallery'; Status = 'Not detected' },

    @{ Audit = $sqlRequery; Project = 'sqlrequery'; Id = 'activities'; Status = 'Present' },
    @{ Audit = $sqlRequery; Project = 'sqlrequery'; Id = 'view-binding'; Status = 'Present' },
    @{ Audit = $sqlRequery; Project = 'sqlrequery'; Id = 'requery'; Status = 'Present' },
    @{ Audit = $sqlRequery; Project = 'sqlrequery'; Id = 'sqlite'; Status = 'Present' },
    @{ Audit = $sqlRequery; Project = 'sqlrequery'; Id = 'sql-join'; Status = 'Present' },
    @{ Audit = $sqlRequery; Project = 'sqlrequery'; Id = 'recyclerview'; Status = 'Present' },
    @{ Audit = $sqlRequery; Project = 'sqlrequery'; Id = 'workmanager'; Status = 'Not detected' },
    @{ Audit = $sqlRequery; Project = 'sqlrequery'; Id = 'firebase-rtdb'; Status = 'Not detected' },
    @{ Audit = $sqlRequery; Project = 'sqlrequery'; Id = 'custom-view-canvas'; Status = 'Not detected' }
)

foreach ($assertion in $assertions) {
    Assert-ConceptStatus `
        -Audit $assertion.Audit `
        -ProjectName $assertion.Project `
        -ConceptId $assertion.Id `
        -ExpectedStatus $assertion.Status
}

Write-Host ("All {0} Android concept audit assertions passed." -f $assertions.Count)

