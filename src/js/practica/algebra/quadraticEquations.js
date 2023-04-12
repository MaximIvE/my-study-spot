const mainElement = document.querySelector("main");
const titleitleElement = mainElement.querySelector(".page-title");
const conditionElement = document.querySelector("div.condition");
const solutionElement = document.querySelector("div.solution");

// Створюємо заголовок
titleitleElement.innerHTML = `Прості квадратні рівняння <span class="formula">ax<span class="sup">2</span> + bx + c = 0</span>`
// const inputs = solution.querySelector(".solution-list-step1").querySelectorAll("input")
// const check1 = solution.querySelector("#step1-check");

const data = [[2, -9, 10],];
const markUp = {
    condition: `<h4 class="condition-title">Умова: </h4>
                    <div class="condition-content" id="condition">
                        <i><span class="formula"></span></i>
                    </div>`,
    step1: `<p class="solution-text">1. Знайди і запиши a, b, c</p>
                        <ul class="solution-list-step1">
                            <li>a=
                                <input type="number" class="input-solution">
                            </li>
                            <li>b=
                                <input type="number" class="input-solution">
                            </li>
                            <li>c=
                                <input type="number" class="input-solution">
                            </li>
                        </ul>`,
    step2: `<p class="solution-text">2. Обчисли дискримінант D</p>
                            <div>D= <input type="number" class="input-solution"></div>
                            <p class="note"></p>`,
    step3_1: `<p class="solution-text">3. Рівняння немає розв'язків</p>
                            <p class="note">Дискримінант D &lt; 0. </p>`,
    step3_2: `<p class="solution-text">3. Обчисли <i>x</i></p>
                            <p class="note">Дискримінант D = 0.</p>
                                <ul class="solution-list-step1">
                                    <li><i>x</i> = 
                                        <input type="number" class="input-solution" id="0">
                                    </li>
                                </ul>`,
    step3_3: `<p class="solution-text">3. Обчисли <i>x<span class="sub">1</span></i> та <i>x<span class="sub">2</span></i></p>
                            <p class="note">Дискримінант D &gt; 0.</p>
                            <div class="solution-answer">
                                <ul class="solution-list-step1">
                                    <li><i>x<span class="sub">1</span></i> = 
                                        <input type="number" class="input-solution" id="0">
                                    </li>
                                    <li><i>x<span class="sub">2</span></i> = 
                                        <input type="number" class="input-solution" id="1">
                                    </li>
                                </ul>
                            </div>`,
    step4: `<p class="solution-text">Все вірно!!!</p>`
}

let n = 0;
const number = data[n];
let d;

// Створюємо блок умови та публікуємо її
function createMarkUp(element, markup) {
    element.innerHTML = markup;
}

function createElement(type, className) {
    const element = document.createElement(type);
    element.className = className;
    solutionElement.append(element);
    return element;
}

let countCheck = 0;
function blur(e) {
    const input = e.target;
    const value = input.value.trim();
    if(value !=="" && countCheck < 3) countCheck++
    if (value === "") {
        input.className = "input-solution";
        if (countCheck > 1) countCheck = countCheck - 1;
    }
    if (countCheck === 3) check(input.parentNode.parentNode);
}

function blur2(e) {
    // console.log("Запустився blur2")
    const input = e.target;
    const value = input.value.trim();
    const [a, b, c] = number;
    d = b ** 2 - 4 * a * c;
    const styles = value === "" ? "input-solution" : +value === d ? "input-solution value-success" : "input-solution value-error"
    input.className = `${styles}`;
    if (+value === d) {
        input.setAttribute("disabled", "true");
        step3()
    };
}

let result = [null, null];
function blur32(e) {
    const input = e.target;
    const { id } = input;
    const value = input.value.trim();
    if (value !== "") result[id] = +value;
    if (value === "") {
        input.className = "input-solution";
        result[id] = null
    }
    if (result[0] !== null && result[1] !== null ) check32();
}

function check(parrent) {
    const inputs = parrent.querySelectorAll("input");
    
    let count = 0;
    const audit = number;
    for (let i = 0; i < 3; i++) {
        const { value } = inputs[i]
        if (+value === audit[i]) {
            inputs[i].className = "input-solution value-success";
            inputs[i].setAttribute("disabled", "true");
            count++;
        } else {
            inputs[i].className = "input-solution value-error";
            
        }
    }
    if(count === 3) step2()
}

function check32() {
    const inputs = document.querySelectorAll("input");
    if(inputs[5].disabled && result[0] === result[1]) return
    let count = 0;
    const [a, b] = data[0];
    const x1 = (-1 * b + Math.sqrt(d)) / (2 * a);
    const x2 = (-1 * b - Math.sqrt(d)) / (2 * a);
    
    if (x1 === +inputs[4].value) {
        inputs[4].className = "input-solution value-success";
        inputs[4].setAttribute("disabled", "true");
        count++;
        if (x2 === +inputs[5].value) {
            inputs[5].className = "input-solution value-success";
            inputs[5].setAttribute("disabled", "true");
            count++;
        } else {
            inputs[5].className = "input-solution value-error";
        }
    } else if (x2 === +inputs[4].value) {
        inputs[4].className = "input-solution value-success";
        inputs[4].setAttribute("disabled", "true");
        count++;
        if (x1 === +inputs[5].value) {
            inputs[5].className = "input-solution value-success";
            inputs[5].setAttribute("disabled", "true");
            count++;
        } else {
            inputs[5].className = "input-solution value-error";
        }
    } else {
        inputs[4].className = "input-solution value-error";
        if (x1 === +inputs[5].value || x2 === +inputs[5].value) {
            inputs[5].className = "input-solution value-success";
            inputs[5].setAttribute("disabled", "true");
            count++;
        } else {
            inputs[5].className = "input-solution value-error";
        }
    }

    if(count === 2) step4()
}

// ----- Розділ хелперсів -----
// Формує умову квадратного рівняння
function getCondition() {
    let result = "";
    for (let i = 0; i < 3; i++){
        const n = number[i];
        let tail = "";
        if(i === 0) tail = n ? 'x<span class="sup">2</span> ' : "";
        if (i === 1) tail = n ? 'x ': "";

        const sign = n > 0 ? "+ " : n === 0 ? "" : "- ";
        const part = n === 0 || n === 1 ? "" : Math.abs(n);
        result = result + sign + part + tail;
    }
    if(result[0] === "+") result = result.slice(2, result.length)
    return result + " = 0.";
};

// ----- Step1 -----
function step1() {
    const section = createElement("div", "solution-steps");
    createMarkUp(section, markUp.step1);

    const inputs = section.querySelectorAll("input");
    [...inputs].forEach(n => n.addEventListener("blur", blur))
}

// ----- Step2 -----
function step2() {
    const section = createElement("div", "solution-steps");
    createMarkUp(section, markUp.step2);

    const inputs = section.querySelectorAll("input");
    [...inputs].forEach(n => n.addEventListener("blur", blur2))

}

// ----- Step3 -----
function step3() {
    const section = createElement("div", "solution-steps");
    const markupKey = d < 0 ? "step3_1" : d === 0 ? "step3_2" : "step3_3";
    createMarkUp(section, markUp[markupKey]);
    if (d < 0) step4();

    const inputs = section.querySelectorAll("input");
    [...inputs].forEach(n => n.addEventListener("blur", blur32))

};

function step4() {
    const section = createElement("div", "solution-steps");
    createMarkUp(section, markUp.step4);
};

// Реалізували створення умови завдання
createMarkUp(conditionElement, markUp.condition);
const element = conditionElement.querySelector(".formula");
const condition = getCondition(0);
createMarkUp(element, condition);


// Запускаємо перший крок розв'язку
step1()