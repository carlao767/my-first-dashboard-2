const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTpNRk9Dxt0RWIrKypiJ5GMXDXPPyJI53bwkz6T8CsT3FdP5mKMdLFY-RTgtVEfxlPG-gpFdwzBQw6-/pub?output=csv";

fetch(url)
.then(res => res.text())
.then(data => {

const linhas = data.split("\n").map(l => l.split(","));

const cabecalho = linhas[0];
const dados = linhas.slice(1);

const cabecalhoHTML = document.getElementById("cabecalho");

cabecalho.forEach(coluna => {

let th = document.createElement("th");
th.textContent = coluna;
cabecalhoHTML.appendChild(th);

});

const corpo = document.getElementById("corpo");

dados.forEach(linha => {

let tr = document.createElement("tr");

linha.forEach(valor => {

let td = document.createElement("td");
td.textContent = valor;
tr.appendChild(td);

});

corpo.appendChild(tr);

});

document.getElementById("total").textContent = dados.length;

if(dados.length > 0){
document.getElementById("ultimo").textContent = dados[dados.length-1][0];
}

criarGrafico(dados);

});

function criarGrafico(dados){

let labels = [];
let valores = [];

dados.forEach((linha,i)=>{

labels.push("Linha "+(i+1));
valores.push(i+1);

});

const ctx = document.getElementById('grafico');

new Chart(ctx, {

type:'line',

data:{
labels:labels,
datasets:[{
label:'Registros',
data:valores
}]
}

});

}

document.getElementById("busca").addEventListener("keyup", function(){

let filtro = this.value.toLowerCase();
let linhas = document.querySelectorAll("#corpo tr");

linhas.forEach(linha =>{

let texto = linha.innerText.toLowerCase();

linha.style.display = texto.includes(filtro) ? "" : "none";

});

});