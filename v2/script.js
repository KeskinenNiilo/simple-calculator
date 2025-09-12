const inputField = document.getElementById('inputField');

const addNumber = function(number) {

    inputField.value = inputField.value + number;

};

const backSpace = function() {

    inputField.value = inputField.value.slice(0, -1);

};

const reset = function() {

    inputField.value = '';
    document.getElementById('results').value = '';

};

const addParanthesis = function() {

    let open = (inputField.value.split('(').length <= inputField.value.split(')').length) ? '(' : ')';
    inputField.value = inputField.value + open;

};

const addSymbol = function(symbol) {

    inputField.value = inputField.value + symbol;

};

const arrToNumbers = function(array) {

    let returnArray = new Array();
    let stringHelper = "";

    for (let i = 0; i < array.length; i++) {

        const char = array[i];

        if (char == '+' || char == '*' || char == '/' || char == '^' || char == '(' || char == ')') {

            if (stringHelper != "") {
                returnArray.push(Number(stringHelper));
                stringHelper = "";
            };

            returnArray.push(char);

        } else if (char == '-') {

            if (i === 0 || array[i - 1] == '+' || array[i - 1] == '*' || array[i - 1] == '/' || array[i - 1] == '^' || array[i - 1] == '(') {
                stringHelper = stringHelper + char;
            } else {
                if (stringHelper != "") {
                    returnArray.push(Number(stringHelper));
                    stringHelper = "";
                };
                returnArray.push('+');
            };

        } else if (char == '.') {

            stringHelper = stringHelper + char;

        } else {

            stringHelper = stringHelper + char;

        };

        if (i === array.length - 1 || array[i + 1] == '+' || array[i + 1] == '*' || array[i + 1] == '/' || array[i + 1] == '^' || array[i + 1] == '(' || array[i + 1] == ')') {

            if (stringHelper != "") {
                returnArray.push(Number(stringHelper));
                stringHelper = "";
            };

        };

    };

    return returnArray;

};

const calculate = function(array) {

    const pemdas = [ ['^'], ['*', '/'], ['+'] ];

    const operations = {
        '^' : (a, b) => Math.pow(a, b),
        '*' : (a, b) => a * b,
        '/' : (a, b) => a / b,
        '+' : (a, b) => a + b
    };

    for (let x of pemdas) {

        let i = 0;

        while (i < array.length) {

            if (x.includes(array[i])) {
                array.splice(i - 1, 3, operations[array[i]](array[i - 1], array[i + 1]));
                i--;
            } else {
                i++;
            };

        };

    };

    return array[0];

};

const betweenParanthesis = function(array) {

    while (array.includes('(')) {

        let left = array.lastIndexOf('(');
        let right = array.indexOf(')', left);

        if (right === -1) throw new Error();

        let result = calculate(array.slice(left + 1, right));

        array.splice(left, right - left + 1, result);

    };

    return array;

};

const equals = function() {

    try {

        let inputString = inputField.value.replace(/\s+/g, '');
        let array = inputString.split('');

        if (array.length === 1) {
            document.getElementById('results').value = array[0];
            return;
        };

        array = arrToNumbers(array);
        array = betweenParanthesis(array);
        let r = calculate(array);

        if (isNaN(r)) throw new Error();

        document.getElementById('results').value = r;

    } catch (error) {

        document.getElementById('results').value = 'SYNTAX ERROR';

    };

};
