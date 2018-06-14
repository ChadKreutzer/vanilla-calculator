const display = document.getElementById("display");
const digits = Array.from(document.getElementsByClassName("digit"));
const operations = Array.from(document.getElementsByClassName("operation"));
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");
const del = document.getElementById("del");

let firstNumber;
let currentOperation;
let secondNumber;

document.addEventListener("keyup", getkeys);
digits.forEach(digit => digit.addEventListener("click", function() {
  addDigits(this.innerText)
}));
operations.forEach(operation => operation.addEventListener("click", function() {
  applyOperator(this.innerText)
}));
equals.addEventListener("click", function() {
  doMath(currentOperation);
  initializeCalculator();
});
clear.addEventListener("click", clearAll);
del.addEventListener("click", deleteDigit);

initializeCalculator();

const operator = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "/": (a, b) => b ? a / b : "You can't divide by zero",
  "*": (a, b) => a * b,
};

function getkeys(event) {
  const digits = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const operations = ["+", "-", "*", "/"];
  const key = event.key;
  
  if (digits.some(digit => digit === key)) addDigits(key);
  if (operations.some(operation => operation === key)) applyOperator(key);  
  if (key === "Backspace") deleteDigit();
  if (key === "Delete") clearAll();
  if (key === "=" || key === "Enter") {
    doMath(currentOperation);
    initializeCalculator();
  }
}

function addDigits(digit) {
  if (display.innerText === "0" || secondNumber) {
    display.innerText = digit;
  } else if (digit === ".") {
    if (/\./.test(display.innerText) === false) display.innerText += digit;
  } else {
    display.innerText += digit;
  }
  secondNumber = false;
}

function applyOperator(operand) {
  currentOperation && doMath(currentOperation);
  firstNumber = +display.innerText;
  currentOperation = operand;
  secondNumber = true;
}

function doMath(operand) {
  if (firstNumber !== null && secondNumber === false) {
    display.innerText = operator[operand](firstNumber, +display.innerText);
  }
}

function clearAll() {
  initializeCalculator();
  display.innerText = "0";
}

function initializeCalculator() {
  firstNumber = null;
  currentOperation = null;
  secondNumber = true;
}

function deleteDigit() {
  display.innerText = (display.innerText.length > 1 && display.innerText !== "0") ?
    display.innerText.slice(0, -1) : "0";
}