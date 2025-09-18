<?php 

class EnderecoModel extends Sql {

    private $sql;

    public function __construct()
    {
        $this->sql = new Sql();
    }

    public function salvarEnderecoCliente($idCliente, $logradouro, $complemento, $numero, $bairro, $cidade, $uf, $cep)
    {
        $result = $this->sql->query(
            "INSERT INTO tb_endereco_cliente 
            VALUES(
                NULL,
                :logradouro,
                :complemento,
                :numero,
                :bairro,
                :cidade,
                :uf,
                :cep,
                :idCliente
            );", [
                ":logradouro"   => trim(ucwords($logradouro)),
                ":complemento"  => trim(ucwords($complemento)),
                ":numero"       => $numero ? trim($numero) : '-',
                ":bairro"       => trim(ucwords($bairro)),
                ":cidade"       => trim(ucwords($cidade)),
                ":uf"           => trim(strtoupper($uf)),
                ":cep"          => trim($cep),
                ":idCliente"    => intval($idCliente)
            ]
        );

        return $result;
    }

    public function getEnderecoCliente($idCliente) {
        $result = $this->sql->select(
            "SELECT * FROM tb_endereco_cliente WHERE cliente_id = :id_cliente;",[
                ":id_cliente" => intval($idCliente)
            ]
        );

        return $result;
    }
}

?>