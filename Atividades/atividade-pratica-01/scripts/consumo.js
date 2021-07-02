function cadastrar(){
    validador = true;

    const contador = document.getElementById("contador");
    const tabela = document.getElementById("tabelaVeiculos");
    const body = tabela.getElementsByTagName("tbody")[0];
    
    const combustivel = document.formulario.combustivel;
    const quilometros = document.formulario.quilometros;

    validarCampoPreenchido(combustivel, "alertaCombustivel", "combustivel");
    validarCampoPreenchido(quilometros, "alertaQuilometros", "quilometros");
    validarTipo(combustivel, "alertaCombustivel", "combustivel");
    validarTipo(quilometros, "alertaQuilometros", "quilometros");
    validarValoresValidos(combustivel, "alertaCombustivel", "combustivel");
    validarValoresValidos(quilometros, "alertaQuilometros", "quilometros");

    if(validador){
        contador.innerHTML++;

        let linha = body.insertRow();

        let celula0 = linha.insertCell(0);
        celula0.innerHTML = combustivel.value;

        let celula1 = linha.insertCell(1);
        celula1.innerHTML = quilometros.value;

        let celula2 = linha.insertCell(2);
        let resultado = eval(quilometros.value / combustivel.value);
        celula2.innerHTML = resultado.toFixed(2);

        document.getElementById("botaoFinalizar").disabled = false;
    }
}

function recomecar(){
    document.formulario.combustivel.value = "";
    document.formulario.quilometros.value = "";

    document.getElementById("botaoFinalizar").disabled = true;

    const tabela = document.getElementById("tabelaVeiculos");
    const body = tabela.getElementsByTagName("tbody")[0];

    while(body.rows.length > 0){
        body.deleteRow(0);
    }

    const contador = document.getElementById("contador");
    contador.innerHTML = 0;

    document.getElementById("quantidadeTotalCombustivel").value = "";
    document.getElementById("quantidadeTotalQuilometros").value = "";
    document.getElementById("mediaCombustivel").value = "";
    document.getElementById("mediaQuilometros").value = "";
    document.getElementById("mediaDesempenho").value = "";
}

function finalizar(){
    const contador = document.getElementById("contador");
    const tabela = document.getElementById("tabelaVeiculos");
    const body = tabela.getElementsByTagName("tbody")[0];

    let quantidadeTotalCombustivel = 0;
    let quantidadeTotalQuilometros = 0;

    for (const linha of body.rows) {
        quantidadeTotalCombustivel += parseInt(linha.cells[0].innerHTML);
        quantidadeTotalQuilometros += parseInt(linha.cells[1].innerHTML);
    }

    let mediaCombustivel = eval(quantidadeTotalCombustivel / contador.innerHTML);
    let mediaQuilometros = eval(quantidadeTotalQuilometros / contador.innerHTML);
    let mediaDesempenho = eval(quantidadeTotalQuilometros / quantidadeTotalCombustivel);

    document.getElementById("quantidadeTotalCombustivel").value = quantidadeTotalCombustivel;
    document.getElementById("quantidadeTotalQuilometros").value = quantidadeTotalQuilometros;
    document.getElementById("mediaCombustivel").value = mediaCombustivel.toFixed(2);
    document.getElementById("mediaQuilometros").value = mediaQuilometros.toFixed(2);
    document.getElementById("mediaDesempenho").value = mediaDesempenho.toFixed(2);
}

function validarCampoPreenchido(campo, alerta, label){
    let auxiliar = campo.value;

    if(auxiliar.length == 0){
        erroValidacao(campo, alerta, label);
    } else {
        validado(campo, alerta, label);
    }
}

function validarTipo(campo, alerta, label){
    let auxiliar = campo.value;

    if(isNaN(parseInt(auxiliar))){
        erroValidacao(campo, alerta, label);
    } else {
        validado(campo, alerta, label);
    }
}

function validarValoresValidos(campo, alerta, label){
    let auxiliar = campo.value;

    if(auxiliar <= 0){
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