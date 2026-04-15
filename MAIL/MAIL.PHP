<?php
ini_set('display_errors', 0);
error_reporting(0);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["ok" => false, "msg" => "Método no permitido."]);
    exit;
}

$nombre    = htmlspecialchars(trim($_POST["nombre"] ?? ""));
$apellido  = htmlspecialchars(trim($_POST["apellido"] ?? ""));
$correo    = htmlspecialchars(trim($_POST["correo"] ?? ""));
$telefono  = htmlspecialchars(trim($_POST["telefono"] ?? ""));

if (!$nombre || !$apellido || !$correo || !$telefono) {
    echo json_encode(["ok" => false, "msg" => "Por favor completa todos los campos."]);
    exit;
}

// ── CONFIGURA AQUÍ ──────────────────────────────────────────
$destino = "info@studio4.com";   // correo donde llegan los datos
$asunto  = "Nueva solicitud de proyecto"; // asunto del correo
// ────────────────────────────────────────────────────────────

$cuerpo = "
Nueva solicitud de proyecto recibida:

Nombre:     $nombre $apellido
Correo:     $correo
Teléfono:   $telefono
";

$headers  = "From: no-reply@studio4.com\r\n";
$headers .= "Reply-To: no-reply@studio4.com\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$enviado = mail($destino, $asunto, $cuerpo, $headers);

if ($enviado) {
    echo json_encode(["ok" => true, "msg" => "¡Mensaje enviado! Te contactaremos pronto."]);
} else {
    echo json_encode(["ok" => false, "msg" => "Error al enviar. Intenta de nuevo."]);
}