    document.addEventListener("DOMContentLoaded", function() {
    const resizeBtn = document.getElementById("resize-btn");
    const grid = document.getElementById("grid");
    const colourPicker = document.getElementById("colour");
    let chosenColour = colourPicker.value;
    const buttons = document.querySelectorAll("button");
    const colourBtn = document.getElementById("colour-btn");
    const randomBtn = document.getElementById("random-btn");
    const darkenBtn = document.getElementById("darken-btn");
    const eraserBtn = document.getElementById("eraser-btn");
    const gridBtn = document.getElementById("grid-btn");
    const clearBtn = document.getElementById("clear-btn");

    let gridLines = true;

    const DEFAULT_COLOUR = "#DBDBDB";

    let gridSize = 16;
    generateGrid(gridSize);

    function generateGrid(gridSize) {
        random = false;
        darken = false;
        grid.textContent = "";

        for (let i = 0; i < gridSize; i++) {
            const row = document.createElement("div");
            row.className = "row";
            grid.appendChild(row);

            for (let j = 0; j < gridSize; j++) {
                const container = document.createElement("div");
                container.classList.add("square-container");
                container.classList.add("grid-lines");

                const darkenSquare = document.createElement("div");
                darkenSquare.classList.add("square");
                darkenSquare.classList.add("darken-square");
                darkenSquare.style.backgroundColor = "rgba(0,0,0,0)";
                darkenSquare.dataset.alpha = "0";

                const colourSquare = document.createElement("div");
                colourSquare.classList.add("square");
                colourSquare.classList.add("colour-square");
                colourSquare.style.backgroundColor = DEFAULT_COLOUR;
                colourSquare.addEventListener("mouseenter", () => {
                    if (randomBtn.disabled) {
                        darkenSquare.style.backgroundColor = "rgba(0,0,0,0)";
                        colourSquare.style.backgroundColor = `rgb(${randomColour()})`
                    } else if (darkenBtn.disabled) {
                        darkenSquare.style.backgroundColor = `rgba(0,0,0,${darkenColour(darkenSquare)})`;
                    } else if (eraserBtn.disabled) {
                        darkenSquare.style.backgroundColor = "rgba(0,0,0,0)";
                        colourSquare.style.backgroundColor = DEFAULT_COLOUR;
                    } else {
                        darkenSquare.style.backgroundColor = "rgba(0,0,0,0)";
                        colourSquare.style.backgroundColor = chosenColour;
                    }
                });

                container.appendChild(colourSquare);
                container.appendChild(darkenSquare);
                row.appendChild(container);
            }
        }
    };

    function randomColour() {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        
        return `${red},${green},${blue}`;
    };

    function darkenColour(square) {
        let alpha = parseFloat(square.dataset.alpha);
        alpha = Math.round((alpha + 0.1) * 10) / 10;
        alpha = Math.min(alpha, 1);
        square.dataset.alpha = alpha;
        
        return alpha;
    }

    function disableButtons(clickedBtn) {
        clickedBtn.disabled = true;

        buttons.forEach(button => {
            if (button.id !== clickedBtn.id) {
                button.disabled = false;
            }
        });
    };

    resizeBtn.addEventListener("click", () => {
        let input = 0;

        do {
            input = prompt("Please enter grid size (maximum 100)");

            if (input === null) {
                break;
            }

            input = parseInt(input)

            colourPicker.value = "#000000";
            chosenColour = colourPicker.value;

            grid.classList.add("grid-lines");
            gridLines = true;

            disableButtons(colourBtn);
            generateGrid(input);

        } while (input < 1 || input > 100 || isNaN(input))
    });

    colourPicker.addEventListener("change", () => {
        chosenColour = colourPicker.value;
        disableButtons(colourBtn);
    });

    colourPicker.addEventListener("click", () => {
        chosenColour = colourPicker.value;
        disableButtons(colourBtn);
    });

    colourBtn.addEventListener("click", () => {
        chosenColour = colourPicker.value;
        disableButtons(colourBtn);
    });

    randomBtn.addEventListener("click", () => {
        disableButtons(randomBtn);
    });

    darkenBtn.addEventListener("click", () => {
        disableButtons(darkenBtn);
    })
;
    eraserBtn.addEventListener("click", () => {
        disableButtons(eraserBtn);
    });

    gridBtn.addEventListener("click", () => {
        if (gridLines) {
            const squares = document.querySelectorAll(".square-container");
            squares.forEach(square => {
                square.classList.remove("grid-lines");
            });

            grid.classList.remove("grid-lines");

            gridLines = false;
        } else {
            const squares = document.querySelectorAll(".square-container");
            squares.forEach(square => {
                square.classList.add("grid-lines");
            });

            grid.classList.add("grid-lines");

            gridLines = true;
        }
    });

    clearBtn.addEventListener("click", () => {
        const squares = document.querySelectorAll(".square");
        squares.forEach(square => {
            square.style.backgroundColor = DEFAULT_COLOUR;
        });
    });
});