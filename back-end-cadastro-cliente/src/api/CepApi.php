<?php
require_once '../config/config.php';
$data = json_decode(file_get_contents("php://input"));

if(!$data) {
    $data = $_REQUEST;
}

$cep = $data['cep'];

$url = "https://opencep.com/v1/{$cep}";

$endereco = json_decode(file_get_contents($url));

if(is_null($endereco) || empty($endereco)) {
    $result[] = [
        "error" => "CEP invalido"
    ];
    echo json_encode($result);
    exit(0);
}

echo json_encode($endereco);

?>