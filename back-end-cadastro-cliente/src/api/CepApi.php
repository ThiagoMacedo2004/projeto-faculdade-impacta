<?php
require_once '../config/config.php';
$data = json_decode(file_get_contents("php://input"));

if(!$data) {
    $data = $_REQUEST;
}

// print_r($data);

// $cep = str_replace("-", "", $data['cep']);
// $cep = $data['cep'];

$url = "https://opencep.com/v1/07787555";

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