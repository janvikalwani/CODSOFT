// Select the display and buttons
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

// Initialize variables to keep track of the entire input
let currentInput = "";
let operation = "";
let operatorPressed = false;

// Add event listeners to buttons
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const key = button.getAttribute("data-key");
        handleInput(key);
    });
});

function handleInput(key) {
    if (!isNaN(key) || key === ".") {
        // If it's a number or decimal point, append to the current input
        if (operatorPressed) {
            currentInput = "";
            operatorPressed = false; // Reset after input
        }
        currentInput += key;
        operation += key;
        display.textContent = operation;
    } else if (key === "C") {
        // Clear the display and reset all variables
        clearCalculator();
    } else if (key === "=") {
        // Perform the calculation when equal sign is pressed
        calculateResult();
    } else {
        // Handle operators (+, -, *, /) and show them immediately on the screen
        if (currentInput === "" && operation === "") return; // Prevent operator input if no number
        if (operatorPressed) return; // Prevent double operator inputs
        operatorPressed = true;
        operation += " " + key + " "; // Add operator with spaces for readability
        display.textContent = operation; // Immediately display the operator
    }
}

function calculateResult() {
    try {
        // Evaluate the operation string and show the result
        const result = eval(operation.replace("÷", "/").replace("×", "*"));
        display.textContent = result;
        operation = result.toString(); // Set result as new operation to allow further calculations
        currentInput = "";
    } catch (error) {
        display.textContent = "Error";
        operation = "";
    }
}

function clearCalculator() {
    currentInput = "";
    operation = "";
    operatorPressed = false;
    display.textContent = "0";
}
