const body = document.querySelector('body') as HTMLBodyElement;
const header = document.querySelector('header') as HTMLHeadElement;
const headerPadding = document.querySelector(".header-padding") as HTMLDivElement;

headerPadding.style.height = `${header.offsetHeight}px`;

const content = document.querySelector("main") as HTMLDivElement;
content.style.height = `${body.offsetHeight - header.offsetHeight}px`;