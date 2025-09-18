<?php 

class ClienteModel extends Sql
{
    private $sql;
    

    public function __construct()
    {
        $this->sql = new Sql();
    }

    public function gravarNovoCliente($nome, $email, $celular, $data_nascimento, $genero) {
        $result = $this->sql->query(
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
                ":nome"            => trim(ucwords(strtolower($nome))),
                ":email"           => trim(strtolower($email)),
                ":celular"         => trim($celular),
                ":data_nascimento" => date('Y-m-d', strtotime($data_nascimento)),
                ":genero"          => trim(ucwords($genero)),
                ":data_cadastro"   => date('Y-m-d H:i:s') 
            ]
        );


        if($result['sucesso']) {
            $result['idCliente'] = intval($this->sql->getLastId());
            return $result;
        }


        return $result;
    }

    public function getClientes() {
        $result = $this->sql->select(
            "SELECT * FROM tb_cliente ORDER BY data_cadastro DESC;"
        );

        return $result;
    }
}

?>