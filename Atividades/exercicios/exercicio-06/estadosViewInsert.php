<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    
    <title>Inserir estados</title>

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <link rel="stylesheet" href="./css/form.css">
</head>
<body>

<div class="container-fluid">
        <header class="d-flex justify-content-center">
            <h1>Cadastrar</h1>
        </header>
    
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form action="estadosControllerInsert.php" method="POST">

                    <div class="form-group">
                        <label for="nome" class="form-label">Nome</label>
                        <input type="text" name="nome" id="nome" class="form-control" placeholder="Digite o nome">
                    </div>

                    <div class="form-group">
                        <label for="sigla" class="form-label">Sigla</label>
                        <input type="text" name="sigla" id="sigla" class="form-control" placeholder="Digite a sigla">
                    </div>

                    <div class="botao">
                        <input type="submit" value="Inserir" class="btn btn-primary" value="Inserir" name="btnInserir">
                    </div>

                </form>
            </div>
        </div>
    </div>

</body>
</html>