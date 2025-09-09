<?php 
require_once '../config/config.php';

$data = json_decode(file_get_contents('php://input'));

if(!$data) {
    $data = $_REQUEST;
}

$cliente = new ClienteController($data);

class ClienteController
{
    private $clienteModel;

    public function __construct($data)
    {
        $this->clienteModel = new ClienteModel();
        $this->variaveis($data);
        $this->executarAcao($this->acao);

    }

    private function variaveis($data)
    {

        if (!$data) {
            echo json_encode(array(
                "error" => 'Ação não encontrada 2 !'
            ));
            exit(0);
        }

        foreach ($data as $key => $value) {
            $this->$key = $value;
        }
    }


    private function executarAcao($acao)
    {
        if (method_exists($this, $acao)) {
            $this->$acao();
        } else {
            echo json_encode(array(
                "error" => 'Ação não encontrada !'
            ));
            exit(0);
        }
    }

    public function gravarNovoCliente() {
        $result = $this->clienteModel->gravarNovoCliente();
        // $result = $this->clienteModel->gravarNovoCliente($this->nome, $this->email, $this->celular, $this->dataNascimento, $this->genero);

        if($result['sucesso']) {
            $result['msg'] = 'Cliente cadastrado com sucesso!';
        }

       echo json_encode($result);
    }
}

?>