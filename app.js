let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");

let turnO = true; // O's turn first

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

// Click on each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const showWinner = (winner, pattern) => {
    msgContainer.innerText = `🎉 Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");

    //  Highlight winning boxes
    pattern.forEach(index => {
        boxes[index].classList.add("highlight");
    });

    disableAllBoxes();
};

const disableAllBoxes = () => {
    boxes.forEach((box) => box.disabled = true);
};

const enableAllBoxes = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
        box.classList.remove("highlight"); // ✅ Remove highlight
    });
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val, pattern);
                return;
            }
        }
    }
};

//  New Game button logic
newGameBtn.addEventListener("click", () => {
    turnO = true; 
    enableAllBoxes();
    msgContainer.classList.add("hide");
});

// Reset button logic
resetBtn.addEventListener("click", () => {
    turnO = true;
    enableAllBoxes();
    msgContainer.classList.add("hide");
});
