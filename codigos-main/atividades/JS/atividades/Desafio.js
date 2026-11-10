var a = 10;
var b = 20;
var c = null;

console.log('--- Antes da troca ---');
console.log('A: ' + a);
console.log('B: ' + b);
console.log('C: ' + c);

// Lógica de troca
c = a;
a = b;
b = c;
c = null;

console.log('--- Depois da troca ---');
console.log('A: ' + a);
console.log('B: ' + b);
console.log('C: ' + c);