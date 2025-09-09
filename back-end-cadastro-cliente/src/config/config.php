<?php

// require_once realpath('../../vendor/autoload.php');


header('Content-type: octet/stream');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: X-'Request'ed-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
header('Pragma: no-cache');
header('Cache: no-cache');
header('Cache-Control: no-cache, no-store, must-revalidate, post-check=0, pre-check=0', FALSE);
header('Expires: ' . gmdate('D, d M Y H:i:s') . ' GMT');
header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Headers: Authorization, Content-Type");

date_default_timezone_set('America/Sao_Paulo');
setlocale(LC_TIME, 'pt-BR', 'pt-BR.utf-8', 'portuguese');

error_reporting(E_ALL ^ E_NOTICE);

// arquivo de configuração do banco de dados
require_once __DIR__ . '/Database.php';

// arquivos
require_once __DIR__ . '/../models/ClienteModel.php';
require_once __DIR__ . '/../models/EnderecoModel.php';
// require_once __DIR__ . '/../models/ContasFluxoModel.php';

?>
