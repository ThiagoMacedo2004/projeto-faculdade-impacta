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
    private $enderecoModel;

    public function __construct($data)
    {
        $this->clienteModel = new ClienteModel();
        $this->enderecoModel = new EnderecoModel();

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
            http_response_code(404);
            echo json_encode(array(
                "msg" => 'Ação não encontrada !',
                "erro_sistema" => http_response_code(404)
            ));
            exit(0);
        }
    }

    public function gravarNovoCliente() {
        
        $resultCliente = $this->clienteModel->gravarNovoCliente($this->nome, $this->email, $this->celular, $this->dataNascimento, $this->genero);

        if($resultCliente['sucesso']) {
            $resultEndereco = $this->enderecoModel->salvarEnderecoCliente(
                $resultCliente['idCliente'], $this->logradouro, $this->complemento, $this->numero, $this->bairro, $this->cidade, $this->uf, $this->cep
            );

            if($resultEndereco['sucesso']) {
                $resultEndereco['msg'] = 'Cliente cadastrado com sucesso !';
                http_response_code(201);
                echo json_encode($resultEndereco);
            } else {
                $resultEndereco['msg'] = 'Erro ao salvar cliente. Verifique as informações.... endereco';
                http_response_code(200);
                echo json_encode($resultEndereco);
                exit(0);
            }
        } else {
            $resultCliente['msg'] = 'Erro ao salvar cliente. Verifique as informações';
            http_response_code(200);
            echo json_encode($resultCliente);
            exit(0);
        }
    
    }

    public function getClientes() {
        $result = $this->clienteModel->getClientes();
        
        
        if($result['sucesso']) {
            
            echo json_encode($result) ;
        } else {
            $result['msg'] = 'Problema ao listas clientes.';
            echo json_encode($result);
        }
    }

    public function getCliente() {
        $result = $this->clienteModel->getCliente($this->idCliente);

        if(!$result['data']) {
            http_response_code(404);
            $result['erro_sistema'] = http_response_code(404);
            $result['msg'] = 'Cliente não encontrado !';
            echo json_encode($result);
            
            exit(0);
        }

        if($result['sucesso']) {
            echo json_encode($result);
        } else {
            $result['msg'] = 'Problemas ao consultar cliente.';
            echo json_encode($result);
        }
    }

    public function editarCliente() {
        $result = $this->clienteModel->editarCliente($this->idCliente, $this->nome, $this->email, $this->celular, $this->dataNascimento, $this->genero);

        if($result['sucesso']) {
            $resultEndereco = $this->enderecoModel->editarEnderecoCliente(
                $this->logradouro, 
                $this->complemento, 
                $this->numero, 
                $this->bairro, 
                $this->cidade, 
                $this->uf, 
                $this->cep,
                $this->idCliente
            );

            if($resultEndereco['sucesso']) {
                $resultEndereco['msg'] = 'Dados atualizados com sucesso !';
                http_response_code(200);
                echo json_encode($resultEndereco);
            } else {
                $resultEndereco['Erro ao atualizar o endereço do cliente...'];
                echo json_encode($resultEndereco);
            }

        } else {
            $result['msg'] = 'Não foi possível atualizar os dados do cliente...';
            echo json_encode($result);
        }
    }
}

?>