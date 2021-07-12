function carregarDados(){
    validador = true;

    const nome = document.solicitar.nome;
    const um = document.solicitar.um;

    validarCampoPreenchido(nome, "alertaNome", "nome", 100);
    validarCampoPreenchido(um, "alertaUm", "um", 3);

    if(!validador){
        return false;
    }
}

function validarCampoPreenchido(campo, alerta, label, tamanho){
    let auxiliar = campo.value;

    if(auxiliar.length == 0 || auxiliar.length > tamanho){
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