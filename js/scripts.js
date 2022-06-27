const previousOperationText = document.querySelector("#previous-operations");
const currentOperationText = document.querySelector("#current-operations");

const buttons = document.querySelectorAll('#buttons-container button');

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }
  
  // adicionando os digitos do usuario
  addDigit(digit) {
    // checar o ponto
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  // processando outras operacoes
  processOperation(operation) {
    // pegando valores anteriores e atuais
    let operationValue
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;
    
    switch(operation) {
      case "+":
          operationValue = previous + current
          this.updateScreen(operationValue, operation, current, previous);
        break;
      default:
        return;
    }
  
  }

  // inserindo os numeros no visor
  updateScreen(
    operationValue = null,
    operation = null, 
    current = null, 
    previous = null
  ) {
    if(operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation
    } else {
      // checando se o valor e zero, se for, adicionar o valor atual
      if(previous === 0) {
        operationValue = current
      }

      // adicionando o valor atual ao valor anterior
      this.previousOperationText.innerText = `${operationValue} ${operation}`
      this.currentOperationText.innerText = "";
    }
  }

}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {

    const value = e.target.innerText;

    if(+value >= 0 || value === ".") {
      calc.addDigit(value);
    } else {
      calc.processOperation(value) 
    }

  })
})