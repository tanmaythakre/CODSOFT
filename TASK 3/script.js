const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.hasAttribute('data-num')) {
      handleNumber(button.getAttribute('data-num'));
    } else if (button.hasAttribute('data-op')) {
      handleOperator(button.getAttribute('data-op'));
    } else if (button.id === 'equals') {
      calculate();
    } else if (button.id === 'clear') {
      clear();
    }
  });
});

function handleNumber(num) {
  currentInput += num;
  updateDisplay(currentInput);
}

function handleOperator(op) {
  if (currentInput === '') return;
  if (previousInput !== '') {
    calculate();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = '';
  updateDisplay(`${previousInput} ${operator}`);
}

function calculate() {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = prev / current;
      break;
    default:
      return;
  }

  currentInput = result;
  operator = '';
  previousInput = '';
  updateDisplay(currentInput);
}

function clear() {
  currentInput = '';
  previousInput = '';
  operator = '';
  updateDisplay('0');
}

function updateDisplay(value) {
  display.textContent = value;
}
