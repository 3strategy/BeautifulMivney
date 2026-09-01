[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]$ProjectPath,

    [ValidateRange(1, 10)]
    [int]$EvidenceLimit = 2,

    [ValidateSet('Markdown', 'Table', 'Json')]
    [string]$OutputFormat = 'Markdown',

    [switch]$PassThru
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function New-Concept {
    param(
        [string]$Id,
        [string]$Name,
        [string[]]$AnyPatterns = @(),
        [object[]]$SameFileGroups = @()
    )

    [PSCustomObject]@{
        Id             = $Id
        Name           = $Name
        AnyPatterns    = @($AnyPatterns)
        SameFileGroups = @($SameFileGroups)
    }
}

function New-SameFileGroup {
    param([string[]]$Patterns)
    [PSCustomObject]@{ Patterns = @($Patterns) }
}

function Test-Pattern {
    param([string]$Text, [string]$Pattern)
    [regex]::IsMatch($Text, $Pattern, [Text.RegularExpressions.RegexOptions]::IgnoreCase)
}

function Add-UniqueEvidence {
    param(
        [System.Collections.Generic.List[string]]$Evidence,
        [string]$Value,
        [int]$Limit
    )

    if ($Evidence.Count -lt $Limit -and -not $Evidence.Contains($Value)) {
        $Evidence.Add($Value)
    }
}

$resolved = Resolve-Path -LiteralPath $ProjectPath -ErrorAction Stop
$root = $resolved.Path.TrimEnd([char]'\', [char]'/')
if (-not (Test-Path -LiteralPath $root -PathType Container)) {
    throw "ProjectPath is not a directory: $ProjectPath"
}

$projectMarkers = @('settings.gradle', 'settings.gradle.kts', 'build.gradle', 'build.gradle.kts')
$hasMarker = $false
foreach ($marker in $projectMarkers) {
    if (Test-Path -LiteralPath (Join-Path $root $marker) -PathType Leaf) {
        $hasMarker = $true
        break
    }
}
if (-not $hasMarker) {
    throw "No Gradle Android project marker was found at: $root"
}

$excludedDirectories = @('.git', '.gradle', '.idea', 'build', 'generated', 'out', 'node_modules')
$excludedFiles = @('local.properties', 'google-services.json', 'gradle-wrapper.properties')
$allowedExtensions = @('.java', '.kt', '.kts', '.xml', '.gradle', '.properties', '.toml', '.json')

$sourceFiles = [System.Collections.Generic.List[object]]::new()
$candidates = Get-ChildItem -LiteralPath $root -Recurse -File -ErrorAction SilentlyContinue
foreach ($file in $candidates) {
    $relative = $file.FullName.Substring($root.Length).TrimStart([char]'\', [char]'/')
    $segments = @($relative -split '[\\/]')
    $isExcluded = $false
    foreach ($segment in $segments) {
        if ($excludedDirectories -contains $segment) {
            $isExcluded = $true
            break
        }
    }
    if ($isExcluded -or ($excludedFiles -contains $file.Name)) {
        continue
    }
    if ($allowedExtensions -notcontains $file.Extension.ToLowerInvariant()) {
        continue
    }

    try {
        $lines = [IO.File]::ReadAllLines($file.FullName)
    }
    catch {
        continue
    }

    $sourceFiles.Add([PSCustomObject]@{
        RelativePath = $relative.Replace([char]'\', [char]'/')
        Lines        = $lines
    })
}

$concepts = @(
    (New-Concept -Id 'activities' -Name 'Activities' -AnyPatterns @(
        '<activity(?:-alias)?\b',
        '\bclass\s+\w+(?:<[^>]+>)?\s+extends\s+(?:\w+\.)*(?:Activity|AppCompatActivity|ComponentActivity)\b',
        '\bclass\s+\w+.*:\s*(?:\w+\.)*(?:Activity|AppCompatActivity|ComponentActivity)\s*\('
    )),
    (New-Concept -Id 'fragments' -Name 'Fragments' -AnyPatterns @(
        '\bclass\s+\w+(?:<[^>]+>)?\s+extends\s+(?:\w+\.)*Fragment\b',
        '\bclass\s+\w+.*:\s*(?:\w+\.)*Fragment\s*\('
    )),
    (New-Concept -Id 'view-binding' -Name 'View Binding' -AnyPatterns @(
        '\.databinding\.[A-Z][A-Za-z0-9]*Binding\b',
        '\b[A-Z][A-Za-z0-9]*Binding\.inflate\s*\('
    )),
    (New-Concept -Id 'navigation-component' -Name 'Navigation Component' -AnyPatterns @(
        'androidx\.navigation\.',
        '<navigation\b',
        '\bNavController\b'
    )),
    (New-Concept -Id 'activity-result-contracts' -Name 'Activity Result Contracts' -AnyPatterns @(
        '\bregisterForActivityResult\s*\(',
        '\bActivityResultLauncher\b',
        '\bActivityResultContracts\.'
    )),
    (New-Concept -Id 'runtime-permissions' -Name 'Runtime permissions' -AnyPatterns @(
        '\brequestPermissions\s*\(',
        '\bcheckSelfPermission\s*\(',
        '\bActivityCompat\.requestPermissions\s*\(',
        '\bActivityResultContracts\.(?:RequestPermission|RequestMultiplePermissions)\b'
    )),
    (New-Concept -Id 'shared-preferences' -Name 'SharedPreferences' -AnyPatterns @(
        '\bSharedPreferences\b',
        '\bgetSharedPreferences\s*\(',
        '\bPreferenceManager\.getDefaultSharedPreferences\s*\('
    )),
    (New-Concept -Id 'datastore' -Name 'DataStore' -AnyPatterns @(
        'androidx\.datastore\.',
        '\bDataStore<',
        '\bpreferencesDataStore\b'
    )),
    (New-Concept -Id 'recyclerview' -Name 'RecyclerView' -AnyPatterns @(
        '<androidx\.recyclerview\.widget\.RecyclerView\b',
        '\bextends\s+RecyclerView\.(?:Adapter|ViewHolder)\b',
        '\bRecyclerView\.(?:Adapter|ViewHolder)\b',
        '\bRecyclerView\s+[A-Za-z_]\w*'
    )),
    (New-Concept -Id 'custom-view-canvas' -Name 'Custom View / Canvas' -SameFileGroups @(
        (New-SameFileGroup @(
            '\bclass\s+\w+(?:<[^>]+>)?\s+extends\s+(?:\w+\.)*View\b',
            '\bonDraw\s*\([^)]*\bCanvas\b'
        )),
        (New-SameFileGroup @(
            '\bclass\s+\w+.*:\s*(?:\w+\.)*View\s*\(',
            '\boverride\s+fun\s+onDraw\s*\([^)]*\bCanvas\b'
        ))
    )),
    (New-Concept -Id 'touch-input' -Name 'Touch input' -AnyPatterns @(
        '\bonTouchEvent\s*\(',
        '\bsetOnTouchListener\s*\(',
        '\bMotionEvent\.(?:ACTION_DOWN|ACTION_MOVE|ACTION_UP|ACTION_CANCEL)\b'
    )),
    (New-Concept -Id 'notifications' -Name 'Notifications' -AnyPatterns @(
        '\bNotificationCompat\.Builder\b',
        '\bNotificationChannel\s*\(',
        '\bNotificationManager\b'
    )),
    (New-Concept -Id 'workmanager' -Name 'WorkManager' -AnyPatterns @(
        '\bextends\s+(?:CoroutineWorker|Worker|ListenableWorker)\b',
        '\bWorkManager\.getInstance\s*\(',
        '\b(?:OneTimeWorkRequest|PeriodicWorkRequest)(?:\.Builder|Builder|\s)'
    )),
    (New-Concept -Id 'android-service' -Name 'Android Service' -AnyPatterns @(
        '<service\b',
        '\bextends\s+(?:android\.app\.)?Service\b',
        '\bextends\s+FirebaseMessagingService\b',
        '\bclass\s+\w+.*:\s*(?:android\.app\.)?Service\s*\(',
        '\bclass\s+\w+.*:\s*FirebaseMessagingService\s*\('
    )),
    (New-Concept -Id 'fcm-service' -Name 'Firebase Messaging Service' -AnyPatterns @(
        '\bextends\s+FirebaseMessagingService\b',
        '\bclass\s+\w+.*:\s*FirebaseMessagingService\s*\(',
        '\bonMessageReceived\s*\(\s*(?:@NonNull\s+)?RemoteMessage\b'
    )),
    (New-Concept -Id 'broadcast-receiver' -Name 'BroadcastReceiver' -AnyPatterns @(
        '<receiver\b',
        '\bextends\s+(?:android\.content\.)?BroadcastReceiver\b',
        '\bclass\s+\w+.*:\s*(?:android\.content\.)?BroadcastReceiver\s*\('
    )),
    (New-Concept -Id 'alarm-manager' -Name 'AlarmManager' -AnyPatterns @(
        '\bAlarmManager\b',
        '\bsetExactAndAllowWhileIdle\s*\(',
        '\bsetAndAllowWhileIdle\s*\('
    )),
    (New-Concept -Id 'firebase-rtdb' -Name 'Firebase Realtime Database' -AnyPatterns @(
        'com\.google\.firebase\.database\.',
        '\bFirebaseDatabase\.getInstance\s*\(',
        '\bDatabaseReference\b',
        '\bValueEventListener\b'
    )),
    (New-Concept -Id 'firebase-auth' -Name 'Firebase Authentication' -AnyPatterns @(
        'com\.google\.firebase\.auth\.',
        '\bFirebaseAuth\.getInstance\s*\(',
        '\bGoogleAuthProvider\b'
    )),
    (New-Concept -Id 'requery' -Name 'Requery ORM' -AnyPatterns @(
        'io\.requery\.',
        '\bEntityDataStore<',
        '\bPersistable\b'
    )),
    (New-Concept -Id 'sqlite' -Name 'SQLite data layer' -AnyPatterns @(
        'android\.database\.sqlite\.',
        '\bSQLiteOpenHelper\b',
        '\bSQLiteDatabase\b',
        'io\.requery\.android\.sqlite\.'
    )),
    (New-Concept -Id 'sql-join' -Name 'Relational JOIN' -SameFileGroups @(
        (New-SameFileGroup @(
            'io\.requery\.|\bEntityDataStore<|\bPersistable\b',
            '\.join\s*\('
        )),
        (New-SameFileGroup @(
            '\bSQLiteDatabase\b|\bRoomDatabase\b',
            '\b(?:INNER|LEFT|RIGHT|CROSS)?\s*JOIN\b'
        ))
    )),
    (New-Concept -Id 'room' -Name 'Room database' -AnyPatterns @(
        'androidx\.room\.',
        '\bextends\s+RoomDatabase\b',
        '\bRoom\.databaseBuilder\s*\('
    )),
    (New-Concept -Id 'json' -Name 'JSON parsing or generation' -AnyPatterns @(
        'org\.json\.(?:JSONObject|JSONArray)',
        '\b(?:JSONObject|JSONArray)\s*\(',
        '\b(?:Gson|Moshi|ObjectMapper|JsonReader)\b'
    )),
    (New-Concept -Id 'http-api' -Name 'HTTP / API client' -AnyPatterns @(
        '\bRetrofit\.Builder\s*\(',
        '\bOkHttpClient\b',
        '\bHttpURLConnection\b',
        '\bRequest\.Builder\s*\('
    )),
    (New-Concept -Id 'signalr' -Name 'SignalR real-time client' -AnyPatterns @(
        'com\.microsoft\.signalr\.',
        '\bHubConnectionBuilder\b',
        '\bHubConnection\b'
    )),
    (New-Concept -Id 'location' -Name 'Location' -AnyPatterns @(
        'android\.location\.(?:Location|LocationManager|LocationListener)',
        '\bFusedLocationProviderClient\b',
        '\bLocationServices\.getFusedLocationProviderClient\s*\(',
        '\brequestLocationUpdates\s*\('
    )),
    (New-Concept -Id 'maps' -Name 'Maps' -AnyPatterns @(
        'com\.google\.android\.gms\.maps\.',
        '\bGoogleMap\b',
        '<fragment\b[^>]*com\.google\.android\.gms\.maps\.'
    )),
    (New-Concept -Id 'camera-gallery' -Name 'Camera / Gallery' -AnyPatterns @(
        '\bActivityResultContracts\.(?:TakePicture|TakePicturePreview|GetContent|GetMultipleContents|PickVisualMedia|PickMultipleVisualMedia)\b',
        '\bMediaStore\.ACTION_IMAGE_CAPTURE\b',
        '\bIntent\.(?:ACTION_PICK|ACTION_GET_CONTENT)\b'
    )),
    (New-Concept -Id 'sensors' -Name 'Sensors' -AnyPatterns @(
        'android\.hardware\.(?:Sensor|SensorManager|SensorEvent|SensorEventListener)',
        '\bSensorManager\b',
        '\bonSensorChanged\s*\('
    )),
    (New-Concept -Id 'content-provider' -Name 'ContentProvider' -AnyPatterns @(
        '<provider\b',
        '\bextends\s+(?:android\.content\.)?ContentProvider\b',
        '\bclass\s+\w+.*:\s*(?:android\.content\.)?ContentProvider\s*\('
    )),
    (New-Concept -Id 'viewmodel' -Name 'ViewModel / observable state' -AnyPatterns @(
        'androidx\.lifecycle\.(?:ViewModel|LiveData|MutableLiveData)',
        '\bextends\s+ViewModel\b',
        '\bStateFlow<',
        '\bMutableStateFlow\s*\('
    )),
    (New-Concept -Id 'dependency-injection' -Name 'Dependency injection' -AnyPatterns @(
        '\b@HiltAndroidApp\b',
        '\b@AndroidEntryPoint\b',
        '\b@Inject\b',
        '\bDagger[A-Z]\w*Component\b'
    )),
    (New-Concept -Id 'compose' -Name 'Jetpack Compose' -AnyPatterns @(
        'androidx\.compose\.',
        '\b@Composable\b',
        '\bsetContent\s*\{'
    )),
    (New-Concept -Id 'unit-tests' -Name 'Unit or instrumented tests' -AnyPatterns @(
        '\bimport\s+org\.junit\.',
        '\b@Test\b',
        '\bAndroidJUnit4\b'
    ))
)

$results = [System.Collections.Generic.List[object]]::new()
foreach ($concept in $concepts) {
    $evidence = [System.Collections.Generic.List[string]]::new()

    foreach ($file in $sourceFiles) {
        for ($lineIndex = 0; $lineIndex -lt $file.Lines.Count; $lineIndex++) {
            $line = $file.Lines[$lineIndex]
            $matched = $false
            foreach ($pattern in $concept.AnyPatterns) {
                if (Test-Pattern -Text $line -Pattern $pattern) {
                    $matched = $true
                    break
                }
            }
            if ($matched) {
                Add-UniqueEvidence -Evidence $evidence -Value ("{0}:{1}" -f $file.RelativePath, ($lineIndex + 1)) -Limit $EvidenceLimit
                if ($evidence.Count -ge $EvidenceLimit) {
                    break
                }
            }
        }
        if ($evidence.Count -ge $EvidenceLimit) {
            break
        }
    }

    if ($evidence.Count -eq 0 -and $concept.SameFileGroups.Count -gt 0) {
        foreach ($file in $sourceFiles) {
            foreach ($group in $concept.SameFileGroups) {
                $groupEvidence = [System.Collections.Generic.List[string]]::new()
                $allMatched = $true
                foreach ($pattern in $group.Patterns) {
                    $patternMatched = $false
                    for ($lineIndex = 0; $lineIndex -lt $file.Lines.Count; $lineIndex++) {
                        if (Test-Pattern -Text $file.Lines[$lineIndex] -Pattern $pattern) {
                            Add-UniqueEvidence -Evidence $groupEvidence -Value ("{0}:{1}" -f $file.RelativePath, ($lineIndex + 1)) -Limit $EvidenceLimit
                            $patternMatched = $true
                            break
                        }
                    }
                    if (-not $patternMatched) {
                        $allMatched = $false
                        break
                    }
                }
                if ($allMatched) {
                    foreach ($item in $groupEvidence) {
                        Add-UniqueEvidence -Evidence $evidence -Value $item -Limit $EvidenceLimit
                    }
                    break
                }
            }
            if ($evidence.Count -gt 0) {
                break
            }
        }
    }

    $status = 'Not detected'
    if ($evidence.Count -gt 0) {
        $status = 'Present'
    }
    $results.Add([PSCustomObject]@{
        Id       = $concept.Id
        Concept  = $concept.Name
        Status   = $status
        Evidence = @($evidence)
    })
}

if ($PassThru) {
    $results
    return
}

switch ($OutputFormat) {
    'Json' {
        $results | ConvertTo-Json -Depth 4
    }
    'Table' {
        $display = foreach ($result in $results) {
            [PSCustomObject]@{
                Concept  = $result.Concept
                Status   = $result.Status
                Evidence = ($result.Evidence -join '; ')
            }
        }
        $display | Format-Table -AutoSize -Wrap
    }
    default {
        '| Concept | Status | Evidence |'
        '|:---|:---:|:---|'
        foreach ($result in $results) {
            $safeConcept = $result.Concept.Replace('|', '\|')
            $safeEvidence = ($result.Evidence -join '<br>').Replace('|', '\|')
            if ([string]::IsNullOrWhiteSpace($safeEvidence)) {
                $safeEvidence = '-'
            }
            "| $safeConcept | **$($result.Status)** | $safeEvidence |"
        }
        ''
        '> Static heuristics are clues, not proof of behavior, correctness, meaningful use, or student understanding.'
    }
}
