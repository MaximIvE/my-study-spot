"use strict";
const body = document.querySelector('body');
const header = document.querySelector('header');
const headerPadding = document.querySelector(".header-padding");
headerPadding.style.height = `${header.offsetHeight}px`;
const content = document.querySelector("main");
content.style.height = `${body.offsetHeight - header.offsetHeight}px`;
// # sourceMappingURL=elementSizes.js.map