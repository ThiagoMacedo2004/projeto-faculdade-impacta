<?php 

class ClienteModel extends Sql
{
    private $sql;

    public function __construct()
    {
        $this->sql = new Sql();
    }

    public function gravarNovoCliente($nome='thiago de souza macedo', $email='tsouzaMdd@gmail.com', $celular='11966477321', $data_nascimento='1988-02-28', $genero='masculino') {
        $result = $this->sql->query(
            "INSERT INTO tb_cliente
            VALUES(
                'null',
                :nome,
                :email,
                :celular,
                :data_nascimento,
                :genero,
                :data_cadastro
            );",[
                ":nome"            => trim(strtolower($nome)),
                ":email"           => trim(strtolower($email)),
                ":celular"         => trim($celular),
                ":data_nascimento" => date('Y-m-d', strtotime($data_nascimento)),
                ":genero"          => trim(strtolower($genero)),
                ":data_cadastro"   => date('Y-m-d H:i:s') 
            ]
        );
        
        $id_cliente = $this->sql->getLastId();

        return $result;
    }

    public function gravarEnderecoCliente($idCliente) {

    }
}

?>