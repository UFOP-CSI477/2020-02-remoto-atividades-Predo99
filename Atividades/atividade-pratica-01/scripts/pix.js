function carregarDados(){
    fetch(`https://brasilapi.com.br/api/banks/v1`)
        .then(response => response.json())
        .then(data => carregarBancos(data))
        .catch(error => console.error(error))
}

function carregarBancos(data){
    const select = document.getElementById("bancos");

    data.forEach(banco => {
        let option = document.createElement("option");
        option.value = banco.code;
        option.text = banco.fullName;

        select.appendChild(option);
    });
}

async function cadastrar(){
    validador = true;

    const contador = document.getElementById("contador");
    const tabela = document.getElementById("tabelaPix");
    const body = tabela.getElementsByTagName("tbody")[0];
    
    const tipoChave = document.formulario.tipoChave;
    const valorChave = document.formulario.valorChave;
    const tipoOperacao = document.formulario.tipoOperacao;
    const valorReais = document.formulario.valorReais;
    const data = document.formulario.data;
    const bancos = document.formulario.bancos;

    validarCampoPreenchido(valorChave, "alertaValorChave", "valorChave");
    validarCampoPreenchido(valorReais, "alertaValorReais", "valorReais");
    validarCampoPreenchido(data, "alertaData", "data");
    validarValorTipo(valorReais, "alertaValorReais", "valorReais");

    if(validador){
        contador.innerHTML++;

        let linha = body.insertRow();

        let celula0 = linha.insertCell(0);

        switch (tipoChave.value){
            //P = people (CPF); C = company (CNPJ); E = email; M = mobile (celular) ; R = random (aleatório)
            case 'P':
                celula0.innerHTML = 'Cpf';
                break;
            case 'C':
                celula0.innerHTML = 'Cnpj';
                break;
            case 'E':
                celula0.innerHTML = 'Email';
                break;
            case 'M':
                celula0.innerHTML = 'Número de celular';
                break;
            case 'R':
                celula0.innerHTML = 'Chave aleatória';
                break;
        }

        let celula1 = linha.insertCell(1);
        celula1.innerHTML = valorChave.value;

        let celula2 = linha.insertCell(2);
        
        switch (tipoOperacao.value){
            //P = people (CPF); C = company (CNPJ); E = email; M = mobile (celular) ; R = random (aleatório)
            case 'E':
                celula2.innerHTML = 'Envio';
                break;
            case 'R':
                celula2.innerHTML = 'Recebimento';
                break;
        }

        let celula3 = linha.insertCell(3);
        celula3.innerHTML = valorReais.value;

        let celula4 = linha.insertCell(4);
        celula4.innerHTML = data.value;

        let celula5 = linha.insertCell(5);
        celula5.innerHTML = bancos.options[bancos.selectedIndex].innerHTML;;

        document.getElementById("botaoFinalizar").disabled = false;
    }
}

function recomecar(){
    document.getElementById("cpf").checked = true;
    document.formulario.valorChave.value = "";
    document.getElementById("envio").checked = true;
    document.formulario.valorReais.value = "";
    document.formulario.data.value = "";

    document.getElementById("botaoFinalizar").disabled = true;

    const tabela = document.getElementById("tabelaPix");
    const body = tabela.getElementsByTagName("tbody")[0];

    while(body.rows.length > 0){
        body.deleteRow(0);
    }

    const contador = document.getElementById("contador");
    contador.innerHTML = 0;

    document.getElementById("totalRecebido").value = "";
    document.getElementById("totalEnviado").value = "";
    document.getElementById("saldoFinal").value = "";
}

function finalizar(){
    const tabela = document.getElementById("tabelaPix");
    const body = tabela.getElementsByTagName("tbody")[0];

    let totalRecebido = 0;
    let totalEnviado = 0;

    for (const linha of body.rows) {

        if(linha.cells[2].innerHTML == "Envio"){
            totalEnviado += parseInt(linha.cells[3].innerHTML);
        } else {
            totalRecebido += parseInt(linha.cells[3].innerHTML);
        }
    }

    let saldoFinal = eval(totalRecebido - totalEnviado);

    document.getElementById("totalRecebido").value = `R$ ${totalRecebido.toFixed(2)}`;
    document.getElementById("totalEnviado").value = `R$ ${totalEnviado.toFixed(2)}`;
    document.getElementById("saldoFinal").value = `R$ ${saldoFinal.toFixed(2)}`;
}

function validarCampoPreenchido(campo, alerta, label){
    let auxiliar = campo.value;

    if(auxiliar.length == 0){
        erroValidacao(campo, alerta, label);
    } else {
        validado(campo, alerta, label);
    }
}

function validarValorTipo(campo, alerta, label){
    let auxiliar = campo.value;

    if(isNaN(parseInt(auxiliar)) || auxiliar < 0){
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