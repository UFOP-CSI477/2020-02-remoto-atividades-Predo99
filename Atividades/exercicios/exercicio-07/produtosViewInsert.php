<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    
    <title>Inserir produtos</title>

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <link rel="stylesheet" href="./css/form.css">
    <script src="./scripts/validar.js"></script>

</head>
<body>

<div class="container-fluid">
        <header class="d-flex justify-content-center">
            <h1>Cadastrar</h1>
        </header>
    
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form name="solicitar" id="solicitar" onsubmit="return carregarDados()" action="produtosControllerInsert.php" method="POST" >

                    <div class="form-group">
                        <label for="nome" class="form-label">Nome</label>
                        <input type="text" name="nome" id="nome" class="form-control" placeholder="Digite o nome" maxlength="100">

                        <div id="alertaNome" class="alert alert-danger" style="display: none">
                            <span>Preencha o nome corretamente!</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="um" class="form-label">Unidade de medida</label>
                        <input type="text" name="um" id="um" class="form-control" placeholder="Digite a unidade de medida" maxlength="3">

                        <div id="alertaUm" class="alert alert-danger" style="display: none">
                            <span>Preencha a unidade de medida corretamente!</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <input type="submit" value="Inserir" class="btn btn-primary" value="Inserir" name="btnInserir">
                    </div>

                </form>
            </div>
        </div>
    </div>

</body>
</html>