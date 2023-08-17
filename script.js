const input = document.getElementById("input");
const buttons = document.querySelectorAll(".buttons button");
const historyList = document.getElementById("history-list");

let history = [];
let shouldClearInput = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (shouldClearInput) {
            input.value = '';
            shouldClearInput = false;
        }

        if (button.textContent === 'C') {
            input.value = '';
        } else if (button.textContent === '=') {
            try {
                const result = eval(input.value);
                history.push(input.value + " = " + result);
                updateHistory(); // Actualiza el historial después de agregar una nueva operación
                input.value = result;
                shouldClearInput = true;
            } catch (error) {
                input.value = 'Error';
                shouldClearInput = true;
            }
        } else {
            input.value += button.textContent;
        }
    });
});

const MAX_HISTORY_LENGTH = 7; // Define el máximo de elementos en el historial

// ... (código anterior)

function updateHistory() {
    historyList.innerHTML = "";
    const startIndex = Math.max(history.length - MAX_HISTORY_LENGTH, 0); // Encuentra el índice de inicio para mostrar los últimos elementos
    for (let i = startIndex; i < history.length; i++) {
        const historyItem = document.createElement("li");
        historyItem.textContent = history[i];
        historyList.appendChild(historyItem);
    }
}
updateHistory();