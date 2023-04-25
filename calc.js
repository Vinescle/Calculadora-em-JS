let d = document;
let resultado = "";
let regexSinais = /[\+\-\*\/]/;
let ultimoBotao = null;

function insert(num) {
	let ultimoCaractere = resultado.slice(-1);
	let valorDigitadoEhOperador = regexSinais.test(num);

	if(ultimoBotao == "=") {
		clean();
		ultimoBotao = null;
	}

	if (ultimoCaractere === "" && valorDigitadoEhOperador) {
		// Ignora o operador se o resultado estiver vazio
		return;
	} else if (valorDigitadoEhOperador && regexSinais.test(ultimoCaractere)) {
		// Substitui o último operador por um novo operador
		resultado = resultado.slice(0, -1);
	} else if (ultimoCaractere === "=" && !valorDigitadoEhOperador) {
		// Limpa o resultado se um número for digitado após o resultado
		resultado = "";
	}

	// Concatena o novo caractere ao resultado
	resultado += num;
	d.getElementById("resultado").innerHTML = resultado;
}

function clean() {
	resultado = "";
	d.getElementById("resultado").innerHTML = "";
}

function back() {
	let ultimoCaractere = resultado.slice(-1);
	resultado = resultado.slice(0, -1);
	d.getElementById("resultado").innerHTML = resultado;
}

function calcular() {
	let ultimoCaractere = resultado.slice(-1);
	let regexSinais = /[\+\-\*\/]/;
	let ultimoOperador = null;

	ultimoBotao = '=';

	if (resultado) {
		let valorAtual = eval(resultado);
		resultado = valorAtual.toString();
		d.getElementById("resultado").innerHTML = resultado;

		// Verifica se o último operador foi um sinal matemático
		if (regexSinais.test(ultimoCaractere)) {
			ultimoOperador = valorAtual;
		}
	} else {
		d.getElementById("resultado").innerHTML = "Nada...";
	}

	// Adicione alguns logs para depurar o código
	console.log("Resultado:", resultado);
	console.log("Último operador:", ultimoOperador);
}

if (d.getElementById("btnCalcular")) {
	d.getElementById("btnCalcular").addEventListener("click", calcular);
}