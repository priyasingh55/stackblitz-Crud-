// step 1 Get all buttons
const numbers=document.querySelectorAll('.number');
const operators=document.querySelectorAll('.operator');
const equalsBtn=document.querySelector('.equals');
const clearBtn=document.querySelector('.clear');
const deleteBtn=document.querySelector('.delete');
const previousDisplay=document.querySelector('.previous');
const currentDisplay=document.querySelector('.current');
const buttons=document.querySelector('.buttons');

// step 2 define previous state, current state
let currentNumber='0';
let previousNumber='';
let operation=undefined;

// step 3 Add number to the display
function addNumber(number){
  if(currentNumber ==='0'){
    currentNumber=number;
  }
  else{
    currentNumber=currentNumber+number;
  }
}

numbers.forEach((button)=>{
  button.addEventListener('click',()=>{
    addNumber(button.textContent);
    updateDisplay();
  });

});

// step 4 Choose an operation

function chooseOperation(op){
  if(previousNumber !== ''){
    calculate();
  }
  operation=op;
  previousNumber=currentNumber+' '+operation;
  currentNumber='';
}
// // Add event listeners to operator buttons

operators.forEach(button=>{
  button.addEventListener('click',()=>{
    chooseOperation(button.textContent);
    updateDisplay();
  });
});

// step 5 Calculate the result
function calculate() {
  let result=0;
  const prev = parseFloat(previousNumber);
  const current = parseFloat(currentNumber);
 
  switch (operation) {
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
  currentNumber = result;
  previousNumber = '';
}
// Equals button
equalsBtn.addEventListener('click', () => {
  calculate();
  updateDisplay();
});
//step 6 Update the calculator display
function updateDisplay() {
  currentDisplay.textContent = currentNumber;
  previousDisplay.textContent = previousNumber;
}

// Delete the last digit
function deleteDigit() {
  if (currentNumber.length === 1) {
    currentNumber = '0';
  } else {
    currentNumber = currentNumber.slice(0, -1);
  }
}

// Clear everything
function clearAll() {
  currentNumber = '0';
  previousNumber = '';
  operation = undefined;
}

// Clear button
clearBtn.addEventListener('click', () => {
  clearAll();
  updateDisplay();
});

// Delete button
deleteBtn.addEventListener('click', () => {
  deleteDigit();
  updateDisplay();
});