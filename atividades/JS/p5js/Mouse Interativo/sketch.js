// let nome = prompt("Introduza o seu nome:");
let nome = "Vagner";
let tamanhoFonte = 30;

function setup() {
  createCanvas(400, 400);
  background(38); // Fundo estático no setup cria o efeito de rastro continuo
}

function draw() {
  fill(mouseX / 2, 100, 100, 150);
  noStroke(); // Remove o contorno do elemento

  // DESENHO DA ELIPSE INTERATIVA
  ellipse(mouseX, mouseY, 100, 100);

  // EXIBIÇÃO DO TEXTO
  textSize(tamanhoFonte);
  text(nome, 100, 100);

  console.log(nome);
}