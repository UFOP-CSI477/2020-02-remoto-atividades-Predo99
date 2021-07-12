<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Lista de Estados</title>

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <link rel="stylesheet" href="./css/table.css">
</head>
<body>

    <div class="container-fluid">
        <header class="d-flex justify-content-center">
            <h1>Estados</h1>
        </header>
        
        <div class="row justify-content-center">
            <div class="col-md-6">
                <a href="estadosViewInsert.php" class="btn btn-primary"><span class="material-icons md-48">add_circle_outline</span>Inserir</a>
            </div>
        </div>
    
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover table-striped caption-top">
                        <caption>Estados cadastrados</caption>
                
                        <thead>
                            <tr class="table-dark">
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Sigla</th>
                            </tr>
                        </thead>
                
                        <tbody>
                            <?php 
                                while($e = $estados->fetch()){
                                    echo "
                                        <tr>
                                            <td>" . $e["id"] . "</td>
                                            <td>" . $e["nome"] . "</td>
                                            <td>" . $e["sigla"] . "</td>
                                        </tr>
                                        
                                    ";
                                }
                            ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

</body>
</html>