import { cows } from "./cows.js"
const sectionCount = document.querySelector('.section-count')
const collarSearch = document.querySelector('.search-collar-btn')
const earSearch = document.querySelector('.ear-search')
const searchCollarBtn = document.querySelector('.search-collar-btn')
const searchEarBtn = document.querySelector('.search-ear-btn')
const ear = document.querySelector('.ear-btn')
const collar = document.querySelector('.collar-btn')
const earInput = document.querySelector('.ear-input')
const collarInput = document.querySelector('.collar-input')
const section = document.querySelector('.section')
const ketons = document.querySelector('.ketons')
const fieldSeven = document.querySelector('.field-seven')
const fieldFourteen = document.querySelector('.field-fourteen')
const totalSection = document.querySelector('.total-section')

export function changeSearch() {
    ear.classList.toggle('off');
    collar.classList.toggle('on');
    earInput.classList.toggle('on');
    collarInput.classList.toggle('off');
    searchCollarBtn.classList.toggle('off');
    searchEarBtn.classList.toggle('on')
}

function closeSection() {
    sectionCount.innerHTML = ''
    section.innerHTML = ''
}

function sortingCows(cows, typeOfSort) {

    let sortedCows = []
    cows.map(cow => cow.enable ? sortedCows.push(cow) : null)

    switch (typeOfSort) {
        case "lact":
            sortedCows.sort((a, b) => new Date(b.childbirth) - new Date(a.childbirth));
            break;
        case "collar":
            sortedCows.sort((a, b) => {
                const aCollar = a.collar
                const bCollar = b.collar
                return aCollar - bCollar;
            });
            break;
        case "ear":
            sortedCows.sort((a, b) => {
                const aEar = a.ear
                const bEar = b.ear
                return aEar - bEar;
            });
            break;
        default:
            break;
    }
    return sortedCows;
};

const sortedByLact = sortingCows(cows, 'lact')
const sortedByCollar = sortingCows(cows, 'collar')
let singleCow

export function renderCows() {
    sectionCount.innerHTML = `
        <h3>Всего: ${sortedByLact.length} голов</h3>`
    section.classList.toggle('on')
    section.innerHTML = `
    <button class='switch-btn'>&#47;</button>
    <button class='close-btn'>&#10007;</button>
    <section class= 'table-lact'>
        <div class='table-header'>
            <h3 class= "collar" >Ошейник</h3>
            <h3 class= "ear" >Ушная бирка</h3>
            <h3 class= "lact, lact-lact" >День лактации</h3>
        </div>
    ${sortedByLact.map((cow) =>
        `<div class='cow'>
                <h3 class='cow-collar'>${cow.collar}</h3> 
                <h3>${cow.ear}</h3>
                <h3>${dayOfLactation(cow.childbirth)}</h3> 
                ${cow.endometritis ? `<p class= 'alarm'>!</p>` : ''} 
                ${cow.test ? `<p class= 'passed'>+</p>` : ''}         
        </div>`).join('')}
        </section>
        <section class= 'table-collar'>
            <div class='table-header'>
                <h3 class= "collar, collar-collar" >Ошейник</h3>
                <h3 class= "ear" >Ушная бирка</h3>
                <h3 class= "lact" >День лактации</h3>
            </div>
    ${sortedByCollar.map(cow =>
            `<div class='cow'>
                <h3 class='cow-collar'>${cow.collar}</h3> 
                <h3>${cow.ear}</h3>
                <h3>${dayOfLactation(cow.childbirth)}</h3> 
                ${cow.endometritis ? `<p class= 'alarm'>!</p>` : ''}     
                ${cow.test ? `<p class= 'passed'>+</p>` : ''}       
            </div>`).join('')}
        </section>
       `
    const closeBtn = document.querySelector('.close-btn')
    const switchBtn = document.querySelector('.switch-btn')
    const tableLact = document.querySelector('.table-lact')
    const tableCollar = document.querySelector('.table-collar')
    const lactActive = document.querySelector('.lact-lact')
    const collarActive = document.querySelector('.collar-collar')
    const cowCollars = document.querySelectorAll('.cow-collar')
    closeBtn.addEventListener('click', event => closeSection())
    switchBtn.addEventListener('click', event => changeToCollar())
    lactActive.classList.toggle('is-active')
    cowCollars.forEach(cowCollar => cowCollar.addEventListener('click', e => {
        singleCow = e.target.innerText
        renderCowCard(singleCow)
    }))

    function changeToCollar() {
        tableLact.classList.toggle('off');
        collarActive.classList.toggle('is-active')
        tableCollar.classList.toggle('on');
    }
}

function dayOfLactation(a) {
    const b = new Date()
    let diffDays = Math.floor((b - a) / (1000 * 60 * 60 * 24))
    return diffDays
}

function renderKetonsSeven() {
    fieldSeven.innerHTML = `
    ${cows.map((cow) =>
        dayOfLactation(cow.childbirth) >= 6 && dayOfLactation(cow.childbirth) <= 8
            ?
            `<div class='cow-keton'>
                <h3>${cow.collar}</h3> 
                <h3>${dayOfLactation(cow.childbirth)} день</h3>            
            </div>`
            : null
    ).join('')}`

}

function renderKetonsFourteen() {
    fieldFourteen.innerHTML = `
        ${cows.map((cow) =>
        dayOfLactation(cow.childbirth) >= 13 && dayOfLactation(cow.childbirth) <= 15
            ?
            `<div class='cow-keton'>
                    <h3>${cow.collar}</h3> 
                    <h3>${dayOfLactation(cow.childbirth)} день</h3>           
                </div>`
            : null
    ).join('')}`
}

function renderCowCard(number) {
    singleCow = sortedByLact.find((cow) => cow.collar === number)
    totalSection.innerHTML = `
        <div class= 'cow-card'>
        <div class= 'cow-card-header'>
         <button class = 'back-btn'>&#8592;</button>
            <h2 class="single-collar">${singleCow.collar}</h2>
        </div>
            <div class='cow-info-wrapper'>
                <h2>Ухо: ${singleCow.ear}</h2>
                <h2>День лактации: ${dayOfLactation(singleCow.childbirth)}</h2>
                <h2>Дата отела: ${singleCow.childbirth.toLocaleDateString()}</h2>
            </div>
        </div>
    `
    ketons.innerHTML = ""
    console.log(singleCow)

    const backBtn = document.querySelector('.back-btn')
    backBtn.addEventListener('click', e => {
        location.reload()
        // renderCows()
    }
    )
}

// collarSearch.addEventListener('click', e => {
//     e.preventDefault();
//     const collar = collarInput.value
//     renderCowCard(collar);
// });

// earSearch.onsubmit = (e) => {
//     e.preventDefault();
//     const ear = earInput.value
//     renderCowCard(ear);
// }

renderKetonsSeven()
renderKetonsFourteen()
