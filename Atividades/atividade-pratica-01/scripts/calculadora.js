let primeiroNumero = "";
let operacao = "";
let ultimaOperacao = "";
let ultimoNumero = "";

function adicionarNumero(opcao){
    const display = document.getElementById("display");

    if((display.value == 0 && display.value.length == 1) || display.value == ""){
        display.value = opcao;
    } else {
        display.value += opcao;
    }
}

function adicionarPonto(){
    const display = document.getElementById("display");
    if(!display.value.includes(".")){
        if(display.value == ""){
            display.value += '0.';
        } else {
            display.value += '.';
        }
    }
}

function adicionarOperacao(opcao){
    const display = document.getElementById("display");
    const displayTotal = document.getElementById("displayTotal");

    if(operacao == ""){
        //Nenhuma operação foi adicionada ainda

        primeiroNumero = display.value;
        display.value = "";
    } else if(display.value != ""){
        //Já foi adicionada uma operação e foi adicionado outro número

        calcular();
        display.value = "";
    }   
    
    operacao = opcao;
    displayTotal.value = `${primeiroNumero} ${operacao}`;
}

function calcular(){
    if(operacao != ""){
        const display = document.getElementById("display");
        const displayTotal = document.getElementById("displayTotal");

        let resultado = eval(primeiroNumero + operacao + display.value);

        ultimaOperacao = operacao;
        ultimoNumero = display.value;

        displayTotal.value = `${primeiroNumero} ${operacao} ${display.value} = ${resultado}`;
        display.value = resultado;
        
        operacao = "";
        primeiroNumero = display.value;
    } else if(ultimaOperacao != ""){
        const display = document.getElementById("display");
        const displayTotal = document.getElementById("displayTotal");

        let resultado = eval(display.value + ultimaOperacao + ultimoNumero);

        displayTotal.value = `${display.value} ${ultimaOperacao} ${ultimoNumero} = ${resultado}`;
        display.value = resultado;

        primeiroNumero = display.value;
    }
}

function resetar(){
    const display = document.getElementById("display");
    const displayTotal = document.getElementById("displayTotal");

    display.value = 0;
    displayTotal.value = 0;

    operacao = "";
    primeiroNumero = "";
}

function deletarUltimoDigito(){
    const display = document.getElementById("display");

    if(display.value != 0 && display.value != ""){
        if(display.value.length == 1){
            display.value = 0;
        } else {
            display.value = display.value.slice(0, -1);
        }
    }
}