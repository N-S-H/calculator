import "./styles.css";

document.getElementById("app").innerHTML = ``;

document.querySelectorAll("#calc-btn").forEach((calcBtn) => {
  calcBtn.addEventListener("click", evaluateButtonClick);
});

var op1;
var op2;
var displayText;
var operand;
var decimalClick = false;

function evaluateButtonClick(e) {
  let value = e.target.getAttribute("data-value");

  displayText = "";
  if (value === "clear") {
    op1 = undefined;
    op2 = undefined;
    operand = undefined;
    decimalClick = false;
  } else if (
    value === "+" ||
    value === "-" ||
    value === "*" ||
    value === "/" ||
    value === "%"
  ) {
    if (op1 !== undefined && op2 === undefined) {
      displayText = value;
      operand = value;
      decimalClick = false;
    }
  } else if (value === "=") {
    if (op1 !== undefined && op2 !== undefined) {
      op1 = eval(op1 + " " + operand + " " + op2);
      if(op1.toString().indexOf('.')!=-1) {
        op1=op1.toFixed(2);
      }
      op2 = undefined;
      operand = undefined;
    }
  } else if (value === ".") {
    if (decimalClick === false) {
      decimalClick = true;
      if (op1 !== undefined && operand === undefined)
        displayText = op1.toString() + value;
      else if (op1 !== undefined && operand !== undefined)
        displayText = op2.toString() + value;
      else if (op1 === undefined && op2 === undefined) {
        op1 = 0;
        displayText = op1.toString() + value;
      }
    }
  } else if (value === "sign") {
    if (operand === undefined) op1 = op1 * -1;
    else op2 = op2 * -1;
  } else {
    let enteredValue = parseFloat(value);
    if (operand === undefined) {
      if (op1) {
        let factor = computeDecimalFactor(op1.toString());
        if (factor === 1) {
          op1 = op1 * 10 + enteredValue;
        } else {
          op1 = op1 + enteredValue * factor;
        }
      } else op1 = enteredValue;
    } else {
      if (op2) {
        let factor = computeDecimalFactor(op2.toString());
        if (factor === 1) {
          op2 = op2 * 10 + enteredValue;
        } else {
          op2 = op2 + enteredValue * factor;
        }
      } else op2 = enteredValue;
    }
  }

  if (displayText.length === 0) {
    if (op1 !== undefined && operand === undefined)
      displayText = op1.toString();
    else if (op1 !== undefined && operand !== undefined)
      displayText = op2.toString();
  }

  if (displayText === "Infinity") {
    displayText = "Error";
    op1 = undefined;
    op2 = undefined;
    operand = undefined;
    decimalClick = false;
  } else if (displayText.length > 14) {
    displayText = "Limit Exceeded";
    op1 = undefined;
    op2 = undefined;
    operand = undefined;
    decimalClick = false;
  }

  document.getElementById("calc-display-text").innerHTML = displayText;
}

function computeDecimalFactor(numericString) {
  let decimalFactor = 1;
  if (decimalClick) {
    let index = numericString.indexOf(".");
    if (index === -1) return 0.1;
    let remainingLength = numericString.length - index;
    for (let i = 0; i < remainingLength; i++)
      decimalFactor = decimalFactor * 0.1;

    decimalFactor = decimalFactor.toFixed(remainingLength + 1);
  }
  return decimalFactor;
}
