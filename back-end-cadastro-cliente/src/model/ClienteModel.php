<?php 

class ClienteModel extends Sql
{
    private $sql;

    public function __construct()
    {
        $this->sql = new Sql();
    }

    public function gravarNovoCliente($nome, $email, $celular, $data_nascimento, $genero) {
        $this->select(
            "INSERT INTO tb_cliente
            VALUES(
                null,
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

        $id_cliente = $this->select("LAST_INSERT_ID();");

        print_r($id_cliente);
    }

    public function gravarEnderecoCliente($idCliente) {

    }
}

?>