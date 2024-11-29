// index.js
// By: Aidan
// Date: 28/11/2024

const figlet = require('figlet');  // library for doing 3d ascii text

/*
    multi line comment
*/
/*
figlet('JS Basics', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
});
*/

// Programming Building blocks
// #1 - Comment


// #2 - Variables
let value = 99;
/*
var x = 21; // integer

x = "twenty one";   // string

console.log(x);
*/
const message = "Hello";


//message = "Goodbye";

console.log(value);

// some things about strings

s = "this is a string";
s = 'this is also a string';
s = `this is also a string`;

console.log(s.length);

let name = "Aidan";

console.log("Welcome " + name);
console.log(`Welcome ${ name }`);   

let x = 10;
let y = 20;



console.log(`${ x } + ${ y } = ${ x + y }`);

// Building block #3 - expressions

let answer = (((x + y) * 10) / 20) - 30;


// Building Block #4 - conditions
let rv = Math.random();

if (rv < 0.5) {
    console.log(`${ rv } is small`);
} else {
    console.log(`${ rv } is large`);
}

// {} - indicate a block of code

// Building Block #5 - loop
let count = 1;

while (count < 10) {

    console.log(`counting ${ count }`);
    count = count + 1;
}

console.log("finished");

// building block #6 - array (list)
let numbers = [1, 3, 5, 2, 4, 10, 7, 6];
let names = ["Alice", "Bob", "Carol", "Dan"];

console.log(numbers[1]);
console.log(names[1]);

// array index starts at 0
console.log(numbers[0]);
console.log(names[0]);

// for loop
console.log("=============================");
for(let i = 0; i < names.length; i++) {
    console.log(names[i]);
}

// Building block #6 functions
console.log()

function greet(name) {
    console.log(`Hello ${ name }`);
}

greet("Aidan");
greet("Mary");
greet("Aisling");


console.log(names);

// in js its normal to pass a function to another function
names.forEach(greet);

// it's quite normal in js to just create the function as you need it
names.forEach(function(n) {
    console.log(`Hi ${ n }`);
});

// there is a shorthand for creating a function 
// it uses the arrow function syntax:   =>
names.forEach((n) => {
    console.log(`hiya ${ n }`);
});

// Building Block #8
// objects
// object has properties and functions together in a single
// reusable object


