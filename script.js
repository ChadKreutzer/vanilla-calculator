const display = document.getElementById("display");
const buttons = document.getElementById("wrapper");

let firstNumber;
let currentOperation;
let secondNumber;

const operator = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "/": (a, b) => (b ? a / b : "ERROR"),
  "*": (a, b) => a * b
};

document.addEventListener("keyup", e => getkeys(e.key));

buttons.addEventListener("click", function(e) {
  if (e.path[0].localName === "button") {
    getkeys(e.path[0].innerText);
  }
});

initializeCalculator();

function getkeys(key) {

  if (Number(key) || key === "0" || key === ".") {
    addDigits(key);
  }
  else if (Object.keys(operator).includes(key)) {
    applyOperator(key);
  }
  else {
    switch (key) {
      case "Backspace":
      case "AC":
        deleteDigit();
        break;
      case "Delete":
      case "C":
        clearAll();
        break;
      case "Enter":
      case "=":
        doMath(currentOperation);
        initializeCalculator();
    }
  }
}

function addDigits(digit) {
  console.log(digit);
  if (display.innerText === "0" || secondNumber) {
    display.innerText = digit;
  }
  else if (digit === ".") {
    if (/\./.test(display.innerText) === false) display.innerText += digit;
  }
  else {
    display.innerText += digit;
  }
  secondNumber = false;
}

function applyOperator(operand) {
  currentOperation && doMath(currentOperation);
  firstNumber = Number(display.innerText);
  currentOperation = operand;
  secondNumber = true;
}

function doMath(operand) {
  if (firstNumber !== null && secondNumber === false) {
    display.innerText = operator[operand](firstNumber, Number(display.innerText));
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
  if (display.innerText !== "ERROR") {
    display.innerText =
      display.innerText.length > 1 && display.innerText !== "0" ?
      display.innerText.slice(0, -1) :
      "0";
  }
}
