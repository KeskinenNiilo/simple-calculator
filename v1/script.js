

let inputArray = new Array();


const update = function(inputArray) {
    const input = document.querySelector(".numberInput");
    if ( inputArray.length > 0) input.textContent = inputArray.join("");
}

const valid = function() {
    return (inputArray.length > 0 &&
        !isNaN(inputArray[inputArray.length - 1]) &&
        inputArray.length < 31
    );
};

const lengthCheck = function() {
    return (inputArray.length < 32);
};

const c = function() {
    inputArray = [];
    const input = document.querySelector(".numberInput");
    input.textContent = "input";
    let result = document.querySelector('.result');
    result.textContent = "result";
};


const plus = function() {
    if (valid() && lengthCheck()) inputArray.push("+");
    update(inputArray);
};

const minus = function() {
    if (inputArray[inputArray.length - 1] != "-" &&
        inputArray.length < 31) inputArray.push("-");
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
};


const inputToResult = function() {

    let resultArray = new Array();

    let stringHelper = "";

    for (let i = 0; i < inputArray.length; i++) {
        
        if (inputArray[i] == "*" ||
            inputArray[i] == "/" ||
            inputArray[i] == "+" ) {
                
                resultArray.push(inputArray[i]);

        } else {

            if (inputArray[i] == "-" && !isNaN(inputArray[i - 1])) resultArray.push("+");

            stringHelper += inputArray[i];

            if (isNaN(inputArray[i + 1]) || i === inputArray.length - 1) {
                        
                resultArray.push(Number(stringHelper))
                stringHelper = "";

            };
        };

    };

    return resultArray;
};

const equals = function() {

    let array = inputToResult();
    let result = document.querySelector('.result');
    let r = 0;
    let max = 0;

    
    for (let i = 0; i < array.length; i++) {
        if (String(array[i]).length > max) max = String(array[i]).length;
        if (array[i] === "*") {
            array.splice(i - 1, 3, array[i - 1] * array[i + 1]);
            i--;
        } else if (array[i] === "/") {
            if (array[i + 1] === 0) {
                result.textContent = "Syntax Error, division by 0 not allowed";
                return 0;
            };
            array.splice(i - 1, 3, array[i - 1] / array[i + 1]);
            i--
        };
    }
    for (let j = 0; j < array.length; j++) {
        if (!isNaN(array[j])) r += array[j];
    }
    result.textContent = parseFloat(Number(r).toFixed(max));
    inputArray = [];
}
