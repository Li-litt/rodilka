import { changeSearch } from "./functions.js"
import { renderCows } from "./functions.js"

const ear = document.querySelector('.ear-btn')
const collar = document.querySelector('.collar-btn')
const allSectionBtn = document.querySelector('.all-btn')

ear.addEventListener('click', event => changeSearch(),)
collar.addEventListener('click', event => changeSearch(),)
allSectionBtn.addEventListener('click', event => renderCows(),)