<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataFile = __DIR__ . '/../data/counter.json';
$today = date('Y-m-d');
$now = time();

// Default 100% real, organic state starting from 0
$defaultData = [
    'total_readings' => 0,
    'today_readings' => 0,
    'total_visitors' => 0,
    'today_date' => $today,
    'active_sessions' => [],
    'last_updated' => $now
];

$fp = fopen($dataFile, 'c+');
if (!$fp) {
    echo json_encode(['status' => 'error', 'message' => 'Cannot open data file']);
    exit;
}

flock($fp, LOCK_EX);

$content = '';
while (!feof($fp)) {
    $content .= fread($fp, 8192);
}

$data = json_decode($content, true);
// If data was corrupted, missing, or had old artificial baseline seeds, reset to 0
if (!$data || !is_array($data) || isset($data['base_readings'])) {
    $data = $defaultData;
}

// Ensure active_sessions is an array
if (!isset($data['active_sessions']) || !is_array($data['active_sessions'])) {
    $data['active_sessions'] = [];
}

// Reset today's readings when the date rolls over
if (empty($data['today_date']) || $data['today_date'] !== $today) {
    $data['today_date'] = $today;
    $data['today_readings'] = 0;
}

// Clean up expired sessions (inactivity > 120 seconds)
foreach ($data['active_sessions'] as $sid => $lastSeen) {
    if ($now - $lastSeen > 120) {
        unset($data['active_sessions'][$sid]);
    }
}

$action = $_GET['action'] ?? $_POST['action'] ?? 'get';
$sessionId = $_GET['session'] ?? $_POST['session'] ?? '';

// Sanitize session identifier
$sessionId = preg_replace('/[^a-zA-Z0-9_\-]/', '', $sessionId);
if (!empty($sessionId)) {
    $data['active_sessions'][$sessionId] = $now;
}

if ($action === 'visit') {
    // Record real new visitor session
    $data['total_visitors'] = ($data['total_visitors'] ?? 0) + 1;
    $data['last_updated'] = $now;
} elseif ($action === 'read') {
    // Record real completed fortune reading
    $data['total_readings'] = ($data['total_readings'] ?? 0) + 1;
    $data['today_readings'] = ($data['today_readings'] ?? 0) + 1;
    $data['last_updated'] = $now;
}

// Calculate real online active users
$onlineNow = count($data['active_sessions']);
if ($onlineNow === 0 && !empty($sessionId)) {
    $onlineNow = 1;
}

// Save to disk
ftruncate($fp, 0);
rewind($fp);
fwrite($fp, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
fflush($fp);
flock($fp, LOCK_UN);
fclose($fp);

echo json_encode([
    'status' => 'ok',
    'total_readings' => $data['total_readings'],
    'today_readings' => $data['today_readings'],
    'total_visitors' => $data['total_visitors'],
    'online_now' => $onlineNow,
    'today_date' => $data['today_date'],
    'server_time' => date('H:i:s')
]);
