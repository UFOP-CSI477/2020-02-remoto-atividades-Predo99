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

    <script>
        let validador = true;

        function Pessoa (nome, sobrenome, cpf, idade, endereco, email, telefone){
            this.nome = nome;
            this.sobrenome = sobrenome;
            this.cpf = cpf;
            this.idade = idade;
            this.endereco = endereco;
            this.email = email;
            this.telefone = telefone;
        }

        function carregarDados(){
            validador = true;

            const nome = document.solicitar.nome;
            const sobrenome = document.solicitar.sobrenome;
            const cpf = document.solicitar.cpf;
            const idade = document.solicitar.idade;
            const endereco = document.solicitar.endereco;
            const email = document.solicitar.email;
            const telefone = document.solicitar.telefone;

            validarCampoPreenchido(nome, "alertaNome", "nome");
            validarCampoPreenchido(sobrenome, "alertaSobrenome", "sobrenome");
            validarCampoPreenchido(cpf, "alertaCpf", "cpf");
            validarCampoPreenchido(idade, "alertaIdade", "idade");
            validarCampoPreenchido(endereco, "alertaEndereco", "endereco");
            validarCampoPreenchido(email, "alertaEmail", "email");
            validarCampoPreenchido(telefone, "alertaTelefone", "telefone");

            validarNome(nome, "alertaNome", "nome");
            validarNome(sobrenome, "alertaSobrenome", "sobrenome");
            validarCpf(cpf, "alertaCpf", "cpf");
            validarIdade(idade, "alertaIdade", "idade");
            validarEmail(email, "alertaEmail", "email");
            validarTelefone(telefone, "alertaTelefone", "telefone");

            if(!validador){
                return false;
            }
        }

        function validarCampoPreenchido(campo, alerta, label){
            let auxiliar = campo.value;

            if(auxiliar.length == 0){
                erroValidacao(campo, alerta, label);
            } else {
                validado(campo, alerta, label);
            }
        }

        function validarNome(campo, alerta, label){
            let auxiliar = campo.value;

            //https://stackoverflow.com/questions/23476532/check-if-string-contains-only-letters-in-javascript
            let padrao = /^[a-zA-Z]+$/;

            if(!padrao.test(auxiliar)){
                erroValidacao(campo, alerta, label);
            } else {
                validado(campo, alerta, label);
            }
        }

        function validarIdade(campo, alerta, label){
            let auxiliar = campo.value;

            if(isNaN(parseInt(auxiliar))){
                erroValidacao(campo, alerta, label);
            } else {
                validado(campo, alerta, label);
            }
        }

        function validarEmail(campo, alerta, label){
            let auxiliar = campo.value;

            //https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
            const padrao = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{0,})$/i;
            
            if(!padrao.test(auxiliar)){
                erroValidacao(campo, alerta, label);
            } else {
                validado(campo, alerta, label);
            }
        }

        function validarCpf(campo, alerta, label){
            let auxiliar = campo.value;

            let padrao = /(\d{3})\.(\d{3})\.(\d{3})\-(\d{2})/;

            if(!padrao.test(auxiliar) || auxiliar.length != 14){
                erroValidacao(campo, alerta, label);
            } else {
                validado(campo, alerta, label);
            }
        }

        function validarTelefone(campo, alerta, label){
            let auxiliar = campo.value;
            // pattern="\([0-9]{2}\)[0-9]{5}-[0-9]{4}" maxlength="14"
            let padrao = /\(\d{2}\)\d{5}\-\d{4}/;

            if(!padrao.test(auxiliar) || auxiliar.length != 14){
                erroValidacao(campo, alerta, label);
            } else {
                validado(campo, alerta, label);
            }
        }

        function erroValidacao(campo, alerta, label){
            document.getElementById(alerta).style.display = "block";
            campo.classList.add("is-invalid");
            document.getElementById(label).classList.add("text-danger");
            campo.focus();
            
            validador = false;
        }

        function validado(campo, alerta, label){
            document.getElementById(alerta).style.display = "none";
            campo.classList.remove("is-invalid");
            campo.classList.add("is-valid");

            document.getElementById(label).classList.remove("text-danger");

            document.getElementById(label).classList.add("text-success");
        }

    </script>
</head>
<body>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="row">
                    <header class="d-flex justify-content-center">
                        <h1>Formulário</h1>
                    </header>
                </div>

                <form name="solicitar" id="solicitar" onsubmit="return carregarDados()" action="validar.php" method="POST">
                    <div class="form-group">
                        <label for="nome" class="form-label">Nome</label>
                        <input type="text" name="nome" id="nome" value="" class="form-control" placeholder="Digite o nome">

                        <div id="alertaNome" class="alert alert-danger" style="display: none">
                            <span>Preencha o nome corretamente!</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="sobrenome" class="form-label">Sobrenome</label>
                        <input type="text" name="sobrenome" id="sobrenome" value="" class="form-control" placeholder="Digite o sobrenome">

                        <div id="alertaSobrenome" class="alert alert-danger" style="display: none">
                            <span>Preencha o sobrenome corretamente!</span>
                        </div>
                    </div>
            
                    <div class="form-group">
                        <label for="cpf" class="form-label">Cpf</label>
                        <input type="text" name="cpf" id="cpf" value="" class="form-control" placeholder="Digite o Cpf no formato: 000.000.000-00">

                        <div id="alertaCpf" class="alert alert-danger" style="display: none">
                            <span>Preencha o Cpf corretamente!</span>
                        </div>
                    </div>
            
                   <div class="form-group">
                        <label for="idade" class="form-label">Idade</label>
                        <input type="number" name="idade" id="idade" value="" class="form-control" placeholder="Digite a idade">

                        <div id="alertaIdade" class="alert alert-danger" style="display: none">
                            <span>Preencha a idade corretamente!</span>
                        </div>
                   </div>
            
                   <div class="form-group">
                        <label for="endereco" class="form-label">Endereço</label>
                        <input type="text" name="endereco" id="endereco" value="" class="form-control" placeholder="Digite o endereco">

                        <div id="alertaEndereco" class="alert alert-danger" style="display: none">
                            <span>Preencha o endereço corretamente!</span>
                        </div>
                   </div>
            
                    <div class="form-group">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" name="email" id="email" value="" class="form-control" placeholder="Digite o email">

                        <div id="alertaEmail" class="alert alert-danger" style="display: none">
                            <span>Preencha o email corretamente!</span>
                        </div>
                    </div>
            
                    <div class="form-group">
                        <label for="telefone" class="form-label">Telefone</label>
                        <input type="text" name="telefone" id="telefone" value="" class="form-control" placeholder="Digite o telefone no formato: (00)00000-0000">

                        <div id="alertaTelefone" class="alert alert-danger" style="display: none">
                            <span>Preencha o telefone corretamente!</span>
                        </div>
                    </div>     
                    
                    <div class="botao">
                        <input type="submit" value="Carregar informações" class="btn btn-primary" value="Cadastrar" name="btnCadastrar">
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
</html>