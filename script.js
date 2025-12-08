    document.addEventListener("DOMContentLoaded", function() {
    const resizeBtn = document.querySelector(".resize-btn");
    const grid = document.getElementById("grid");
    const colourPicker = document.getElementById("colour");
    let colour = colourPicker.value;
    const randomBtn = document.getElementById("random");
    const darkenBtn = document.getElementById("darken");
    let random = false;
    let darken = false;

    const defaultColour = "#FFFFFF";

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
                container.className = "square-container";

                const darkenSquare = document.createElement("div");
                darkenSquare.className = "darken-square";
                darkenSquare.style.backgroundColor = "rgba(0,0,0,0)";
                darkenSquare.dataset.alpha = "0";

                const square = document.createElement("div");
                square.className = "square";
                square.style.backgroundColor = defaultColour;
                square.addEventListener("mouseenter", () => {
                    if (random) {
                        darkenSquare.style.backgroundColor = "rgba(0,0,0,0)";
                        square.style.backgroundColor = `rgb(${randomColour()})`
                    } else if (darken) {
                        darkenSquare.style.backgroundColor = `rgba(0,0,0,${darkenColour(darkenSquare)})`;
                    } else {
                        darkenSquare.style.backgroundColor = "rgba(0,0,0,0)";
                        square.style.backgroundColor = colour;
                    }
                });

                container.appendChild(square);
                container.appendChild(darkenSquare);
                row.appendChild(container);
            }
        }
    };

    function randomColour() {
        const red = Math.floor(Math.random() * 255);
        const green = Math.floor(Math.random() * 255);
        const blue = Math.floor(Math.random() * 255);
        
        return `${red},${green},${blue}`;
    };

    function darkenColour(square) {
        let alpha = parseFloat(square.dataset.alpha) || 0;
        alpha = Math.round((alpha + 0.1) * 10) / 10;
        alpha = Math.min(alpha, 1);
        square.dataset.alpha = alpha;
        
        return alpha;
    }

    resizeBtn.addEventListener("click", () => {
        let input = 0;

        do {
            input = prompt("Please enter grid size (up to 100)");

            if (input === null) {
                break;
            }

            input = parseInt(input)

            generateGrid(input);

        } while (input < 1 || input > 100 || isNaN(input))
    });

    colourPicker.addEventListener("change", () => {
        colour = colourPicker.value;
        random = false;
        darken = false;
    });

    randomBtn.addEventListener("click", () => {
        random = !random;
        darken = false;
    });

    darkenBtn.addEventListener("click", () => {
        darken = !darken;
        random = false;
    })
});

// add colour button
// add eraser button
// add clear button