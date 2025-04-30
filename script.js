console.log("======== verifier le type avec typeof =======");
console.log(typeof 42);
console.log(typeof "hello");
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof null);
console.log(typeof {});
console.log(typeof []);
console.log(typeof function(){});


console.log("======== verifier le type avec instanceof ( verfie si objet est une instance type) =======");
console.log([] instanceof Array);
console.log({} instanceof Object);
console.log(new Date() instanceof Date);
console.log(function (){} instanceof Function );


console.log("======== verifier le type avec array.isarray() ( verfie si est un tableau) =======");
console.log(Array.isArray([]));
console.log(Array.isArray({}));
console.log(Array.isArray("hello"));


console.log("======== verifier le type avec Number.isInteger() ( verfie si est un nombre entier) =======");
console.log(Number.isInteger(10));
console.log(Number.isInteger(10.5));
console.log(Number.isInteger("10"));











