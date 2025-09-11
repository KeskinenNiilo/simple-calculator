

let inputArray = new Array();


const update = function(inputArray) {
    const input = document.querySelector(".numberInput");
    if ( inputArray.length > 0) input.textContent = inputArray.join("");
}

const valid = function() {
    return (!isNaN(inputArray[inputArray.length - 1]) && inputArray.length < 59
    );
};

const lengthCheck = function() {
    return (inputArray.length < 60);
};

const c = function() {
    inputArray = [];
    const input = document.querySelector(".numberInput");
    input.textContent = "input";
};

const equals = function() {
    return 0;
};

const plus = function() {
    if (valid() && lengthCheck()) inputArray.push("+");
    update(inputArray);
};

const minus = function() {
    if (valid() && lengthCheck()) inputArray.push("-");
    update(inputArray);
};

const multiply = function() {
    if (valid() && lengthCheck()) inputArray.push("*");
    update(inputArray);
};

const divide = function() {
    if (valid() && lengthCheck()) inputArray.push("/");
    update(inputArray);
};

const passNumber = function(number) {
    if (lengthCheck()) inputArray.push(number);
    update(inputArray);
}