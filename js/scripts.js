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
    // checar se  o valor atual esta vazio
    if(this.currentOperationText.innerText === "" && operation !== "C") {
      
      // mudança de operaçao
      if(this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    // pegando valores anteriores e atuais
    let operationValue
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;
    
    switch(operation) {
      case "+":
          operationValue = previous + current
          this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
          operationValue = previous - current
          this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
          operationValue = previous * current
          this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
          operationValue = previous / current
          this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
          this.processDelOperator();
        break;
      case "CE":
          this.processClearCurrentOperator();
        break;
      case "C":
          this.processClearOperator();
        break;
      case "=":
          this.processEqualOperator();
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

  // mudar operaçao matematica
  changeOperation(operation) {
    const mathOperations = ["*", "/", "+", "-"]

    if(!mathOperations.includes(operation)) {
      return
    }
    this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  // deletar ultimo digito
  processDelOperator() {
    this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
  }

  // limpar os valores em uso
  processClearCurrentOperator() {
    this.currentOperationText.innerText = "";
  }

  // limpar todas as operacoes
  processClearOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";    
  }

  processEqualOperator() {

    const operation = previousOperationText.innerText.split(" ")[1];
    this.processOperation(operation)

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