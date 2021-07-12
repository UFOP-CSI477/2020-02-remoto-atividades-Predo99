<?php

    session_start();

    $nome = $_POST['nome'];
    $sobrenome = $_POST['sobrenome'];
    $cpf = $_POST['cpf'];
    $idade = $_POST['idade'];
    $endereco = $_POST['endereco'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];

    if($nome && $sobrenome && $cpf && $idade && $endereco && $email && $telefone){
        $_SESSION['nome'] = $nome;
        $_SESSION['sobrenome'] = $sobrenome;
        $_SESSION['cpf'] = $cpf;
        $_SESSION['idade'] = $idade;
        $_SESSION['endereco'] = $endereco;
        $_SESSION['email'] = $email;
        $_SESSION['telefone'] = $telefone;

        header("Location: formularioPreenchido.php");
        exit();
    } else {
        echo "<h1>Preencha corretamente as informações!</h1>";
        echo '<a href="/formulario.php">Voltar</a>';
    }
?>