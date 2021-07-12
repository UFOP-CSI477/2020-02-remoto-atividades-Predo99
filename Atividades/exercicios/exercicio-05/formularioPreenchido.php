<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Exercício Validação</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">

    <style>
        label {
            font-weight: bold;
        }

        .botao{
            margin-top: 1.2em;
            margin-bottom: 1.2em;
        }

        h1 {
            margin-top: 0.5em;
        }
    </style>
</head>
<body>

    <?php
        session_start();

        $nome = $_SESSION['nome'];
        $sobrenome = $_SESSION['sobrenome'];
        $cpf = $_SESSION['cpf'];
        $idade = $_SESSION['idade'];
        $endereco = $_SESSION['endereco'];
        $email = $_SESSION['email'];
        $telefone = $_SESSION['telefone'];
    ?>

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="row">
                    <header class="d-flex justify-content-center">
                        <h1>Dados Preenchidos</h1>
                    </header>
                </div>

                <form>
                    <div class="form-group">
                        <label for="nomeCompletoPreenchido" class="form-label">Nome Completo</label>
                        <input type="text" id="nomeCompletoPreenchido" value="<?php echo "$nome $sobrenome"; ?>" class="form-control" disabled>
                    </div>
            
                    <div class="form-group">
                        <label for="cpfPreenchido" class="form-label">Cpf</label>
                        <input type="text" id="cpfPreenchido" value="<?php echo "$cpf"; ?>" class="form-control" disabled>
                    </div>
            
                   <div class="form-group">
                        <label for="idadePreenchido" class="form-label">Idade</label>
                        <input type="text" id="idadePreenchido" value="<?php echo "$idade"; ?>" class="form-control" disabled>
                   </div>
            
                   <div class="form-group">
                        <label for="enderecoPreenchido" class="form-label">Endereço</label>
                        <input type="text" id="enderecoPreenchido" value="<?php echo "$endereco"; ?>" class="form-control" disabled>
                   </div>
            
                    <div class="form-group">
                        <label for="emailPreenchido" class="form-label">Email</label>
                        <input type="text" id="emailPreenchido" value="<?php echo "$email"; ?>" class="form-control" disabled>
                    </div>
            
                    <div class="form-group">
                        <label for="telefonePreenchido" class="form-label">Telefone</label>
                        <input type="text" id="telefonePreenchido" value="<?php echo "$telefone"; ?>" class="form-control" disabled>
                    </div>     
                </form>
            </div>
        </div>
    </div>
</body>
</html>