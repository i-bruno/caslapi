<?php
header("Content-Type: application/json");

$files = ["historia", "deportes", "infraestructura"];
$result = [];

foreach ($files as $file) {
    $path = "../data/$file.json";
    if (file_exists($path)) {
        $result[$file] = json_decode(file_get_contents($path), true);
    } else {
        $result[$file] = ["error" => "Archivo no encontrado"];
    }
}

echo json_encode($result);
?>