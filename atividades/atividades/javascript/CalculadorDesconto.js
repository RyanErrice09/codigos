const calcularDesconto = (preço,desconto)=>{
    let valorDesconto = preço*(desconto/100);
    let precoFinal = preço-valorDesconto;
    return precoFinal ;
}
console.log(calcularDesconto(100,5))