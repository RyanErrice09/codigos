let nota = 7 
if (nota >= 7){
    console.log ("Aprovado")
} else if (nota >6.9&&nota<5){
    console.log ("Recuperação")
} else{
    console.log("Reprovado")
}

function validarNota (nota){
if(nota >= 7 && nota <=10) {
return "Aprovado";
}else if(nota >= 5 && nota < 7){
return "Recuperação";
}else if(nota >= 0 && nota < 5){
return "Reprovado";
}else{
return "Nota invalida!";
}
I
}
console.log(validarNota (8));
console.log(validarNota(5));
console.log(validarNota(2));