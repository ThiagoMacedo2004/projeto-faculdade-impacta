<?php

// $b = new Sql();
class Sql {

	const HOSTNAME = "127.0.0.1";
	const USERNAME = "root";

	const PASSWORD = "root";
	const DBNAME = "clientes_faculdade_impacta";

	private $conn;
	
	public function __construct()
	{
        try {

            $this->conn = new \PDO(
                "mysql:dbname=".Sql::DBNAME.";port:3306;host=".Sql::HOSTNAME, 
                Sql::USERNAME,
                Sql::PASSWORD,
                array(
                    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false
                )
                
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		

            // echo "<h1>Conexão realizada com sucesso !</h1>";

        } catch(\PDOException $e ) {
            echo "<h2>Erro ao conectar ao banco de dados. =><br/> $e</h2>";
        }

	}

	public function setParams($statement, $parameters = array())
	{
		foreach ($parameters as $key => $value) {		
			$this->bindParam($statement, $key, $value);
		}
	}

	public static function bindParam($statement, $key, $value)
	{
		$statement->bindParam($key, $value);	
	}

	public function query($rawQuery, $params = array()):array
	{
		$stmt = $this->conn->prepare($rawQuery);
		$this->setParams($stmt, $params);

		try {
			$stmt->execute();
			return [
				"sucesso" => true,
				"msg" => ""
			];

		} catch (\PDOException $e) {
			return [
				"error" => true,
				"erro_sistema"   => $e->getMessage(),
				"msg" => ''
			];
		}
	}

	public function select($rawQuery, $params = array())
	{
		$stmt = $this->conn->prepare($rawQuery);
		$this->setParams($stmt, $params);

		try{
			$stmt->execute();
			return [
				"sucesso" => true,
				"data"    => $stmt->fetchAll(\PDO::FETCH_ASSOC),
				"msg"     => 'Operação realizada com sucesso !'
			];
			
			 
		} catch (\PDOException $e) {
			return [
				"error" => true,
				"erro_sistema"   => $e->getMessage(),
				"msg" => ''
			];
		}
	}

	public function getLastId()
	{
		$lastId = $this->conn->lastInsertId();
		return $lastId;
	}

}

?>
