
const condition = document.querySelector("#condition");
const solution = document.querySelector("div.solution");
console.dir(condition.firstChild);
console.log(solution);
const inputs1 = solution.querySelector(".solution-list-step1").querySelectorAll("input")
console.log(inputs1)
const check1 = solution.querySelector("#step1-check");
console.log(check1);

const data = [
    {
        a: 2,
        b: -9,
        c: 10,
    }
]

const { a, b, c } = data[0];
let signA = "";
let signB = "";
let signC = "";
let part1 = "";
let part2 = "";
let part3 = "";
if (a !== 0){
    part1 = a > 0 ? `${a}x<span class="sup">2</span>` : `${-1 * a}x<span class="sup">2</span>`;
    signA = a > 0 ? "" :  " - ";
}
if (b !== 0) {
    part2 = b > 0 ? `${b}x` : `${-1 * b}x`;
    signB = b > 0 ? a === 0 ? "" : " + " : " - ";
    
}
if (c !== 0) {
    part3 = c > 0 ? `${c}` : `${-1 * c}`;
    signC = c > 0 ? b===0? "" : " + " : " - ";
};

const conditionContent = signA + part1 + signB + part2 + signC + part3;

condition.innerHTML = `<span class="formula"><i>${conditionContent} = 0</i>`;

// check1.addEventListener("click", step1);

function step1(){
    const abc = [...inputs1].map(input => +input.value);
    console.log(abc);
    console.log(data)

}

const title = document.querySelector(".article .title");
title.innerHTML = 'New and <span class="accent">improved</span> title';






