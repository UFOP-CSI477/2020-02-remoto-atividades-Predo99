let validador;

function cadastrar(){ 
    validador = true;

    const contador = document.getElementById("contador");
    const tabela = document.getElementById("tabelaResultado");
    const body = tabela.getElementsByTagName("tbody")[0];
    
    const nome = document.formulario.nome;
    const tempo = document.formulario.tempo;

    validarCampoPreenchido(nome, "alertaNome", "nome");
    validarCampoPreenchido(tempo, "alertaTempo", "tempo");
    validarTipo(tempo, "alertaTempo", "tempo");

    if(validador){
        contador.innerHTML++;

        let linha = body.insertRow();
        
        let celula0 = linha.insertCell(0);
        celula0.innerHTML = "-";

        let celula1 = linha.insertCell(1);
        celula1.innerHTML = contador.innerHTML;

        let celula2 = linha.insertCell(2);
        celula2.innerHTML = nome.value;

        let celula3 = linha.insertCell(3);
        celula3.innerHTML = tempo.value;

        let celula4 = linha.insertCell(4);
        celula4.innerHTML = "-"; 

        if(contador.innerHTML == 6){
            ordenar();
        }
    }
}

function ordenar(){
    document.formulario.nome.disabled = true;
    document.formulario.tempo.disabled = true;

    document.formulario.nome.value = "";
    document.formulario.tempo.value = "";

    document.getElementById("botaoCadastrar").disabled = true;
    document.getElementById("botaoRecomecar").disabled = false;

    const tabela = document.getElementById("tabelaResultado");
    const body = tabela.getElementsByTagName("tbody")[0];

    //Algoritmo de ordenação adaptado de: https://www.w3schools.com/howto/howto_js_sort_table.asp
    var linhas, desordenado, i, linhaAuxiliar1, linhaAuxiliar2, foraDeOrdem;

    desordenado = true;

    while (desordenado) {
        desordenado = false;
        linhas = body.rows;

        for (i = 0; i < (linhas.length - 1); i++) {
            foraDeOrdem = false;

            linhaAuxiliar1 = linhas[i].cells[3];
            linhaAuxiliar2 = linhas[i + 1].cells[3];

            if (parseInt(linhaAuxiliar1.innerHTML) > parseInt(linhaAuxiliar2.innerHTML)) {
                foraDeOrdem = true;
                break;
            }
        }
        
        if (foraDeOrdem) {
            linhas[i].parentNode.insertBefore(linhas[i + 1], linhas[i]);
            desordenado = true;
        }
    }

    body.rows[0].cells[0].innerHTML = 1;
    body.rows[0].cells[4].innerHTML = "Vencedor(a)!";
    body.rows[0].className = "table-success";

    for (let i = 1; i < body.rows.length; i++) {
        if(parseInt(body.rows[i].cells[3].innerHTML) == parseInt(body.rows[i-1].cells[3].innerHTML)){
            body.rows[i].cells[0].innerHTML = body.rows[i-1].cells[0].innerHTML;

            if(parseInt(body.rows[i].cells[3].innerHTML) == parseInt(body.rows[0].cells[3].innerHTML)){
                body.rows[i].cells[4].innerHTML = "Vencedor(a)!";
                body.rows[i].className = "table-success";
            }

        } else {
            body.rows[i].cells[0].innerHTML = i + 1;
        }
    }
}

function recomecar(){
    const nome = document.formulario.nome.disabled = false;
    const tempo = document.formulario.tempo.disabled = false;

    document.getElementById("botaoCadastrar").disabled = false;
    document.getElementById("botaoRecomecar").disabled = true;

    const tabela = document.getElementById("tabelaResultado");
    const body = tabela.getElementsByTagName("tbody")[0];

    while(body.rows.length > 0){
        body.deleteRow(0);
    }

    const contador = document.getElementById("contador");
    contador.innerHTML = 0;
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