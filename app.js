'use strict';
let leftImageElement = document.getElementById('left-image');
let middleImageElemnt = document.getElementById('midlle-image');
let rightImageElement = document.getElementById('right-image');
// If we wanna to select the section itself
let section1 = document.getElementById('sec-one');
// creating Array for names
let arrayOfNames = [];
// creating varible to the nuber of attemps
let maxAttempts = 25;
// creating Array tu the number of votes
let numberOfvotes = [];
// creating Array to number of shown
let numberOfShown = [];
// max = counter stop the event !
let counter = 0;
// creating an array to chick the previous shown
let previousShown = [];
// constructor to declear the name and the path  # of votes the time shown
function Proudect(name, source) {
  this.name = name;
  this.source = source;
  this.votes = 0;
  this.shown = 0;
  Proudect.globArr.push(this);
  arrayOfNames.push(name);

}
Proudect.globArr = [];
new Proudect('pen', 'img/pen.jpg');
new Proudect('pet-sweep', 'img/pet-sweep.jpg');
new Proudect('scissors', 'img/scissors.jpg');
new Proudect('shark', 'img/shark.jpg');
new Proudect('sweep', 'img/sweep.png');
new Proudect('ttt', 'img/ttt.jpg');
new Proudect('unicorn', 'img/unicorn.jpg');
new Proudect('water-can', 'img/water-can.jpg');
new Proudect('bag', 'img/bag.jpg');
new Proudect('banana', 'img/banana.jpg');
new Proudect('bathroom', 'img/bathroom.jpg');
new Proudect('boots', 'img/boots.jpg');
new Proudect('breakfast', 'img/breakfast.jpg');
new Proudect('bubblegum', 'img/bubblegum.jpg');
new Proudect('chair', 'img/chair.jpg');
new Proudect('cthulhu', 'img/cthulhu.jpg');
new Proudect('dog-duck', 'img/dog-duck.jpg');
new Proudect('dragon', 'img/dragon.jpg');
new Proudect('wine-glass', 'img/wine-glass.jpg');

console.log(Proudect.globArr);

// indexies of the imagies

let leftIndex = null;
let middleIndex = null;
let rightIndex = null;
function renderImages() {
  leftIndex = generateRandomIndex();
  middleIndex = generateRandomIndex();
  rightIndex = generateRandomIndex();

  while (leftIndex === rightIndex || leftIndex === middleIndex || middleIndex === rightIndex || previousShown.includes(leftIndex) || previousShown.includes(rightIndex) || previousShown.includes(middleIndex)) {
    leftIndex = generateRandomIndex();
    middleIndex = generateRandomIndex();
    rightIndex = generateRandomIndex();
  }




  leftImageElement.src = Proudect.globArr[leftIndex].source;
  console.log(leftIndex);
  // console.log('leftIndex   =>',Proudect.globArr[leftIndex].source);

  Proudect.globArr[leftIndex].shown++;


  middleImageElemnt.src = Proudect.globArr[middleIndex].source;
  // console.log('middleIndex   =>', Proudect.globArr[middleIndex].source);
  Proudect.globArr[middleIndex].shown++;


  rightImageElement.src = Proudect.globArr[rightIndex].source;
  // console.log('rightIndex   =>', Proudect.globArr[rightIndex].source);
  Proudect.globArr[rightIndex].shown++;


  previousShown = [leftIndex, middleIndex, rightIndex];


}
renderImages();

// adding event listner to the imeges seperatlly

// leftImageElement.addEventListener('click', handleClick);
// middleImageElemnt.addEventListener('click', handleClick);
// rightImageElement.addEventListener('click', handleClick);

section1.addEventListener('click', handleClick);



function handleClick(event) {
  counter++;

  if (maxAttempts >= counter) {
    if (event.target.id === 'left-image') {
      Proudect.globArr[leftIndex].votes++;

    } else if (event.target.id === 'right-image') {
      Proudect.globArr[rightIndex].votes++;


    }
    else if (event.target.id === 'midlle-image') {
      Proudect.globArr[middleIndex].votes++;

    }
    renderImages();

    

  }

  else {

    const btnElm = document.getElementById('btn');
    btnElm.addEventListener('click', btnClicing);

    section1.removeEventListener('click', handleClick);

  }
  savetoLs();
}




function btnClicing() {
  const btnElm = document.getElementById('btn');
  btnElm.removeEventListener('click', handleClick);
  renderList();


}

function renderList() {
  const ul = document.getElementById('unList');
  let li;
  for (let i = 0; i < Proudect.globArr.length; i++) {
    li = document.createElement('li');
    ul.appendChild(li);
    li.textContent = `${Proudect.globArr[i].name} has this number of votes ${Proudect.globArr[i].votes} and has this number of shown ${Proudect.globArr[i].shown}`;
    // modifying the votes and shown Arrays
    numberOfvotes.push(Proudect.globArr[i].votes);
    numberOfShown.push(Proudect.globArr[i].shown);
  }
  renderChart();
  leftImageElement.removeEventListener('click', handleClick);
  middleImageElemnt.removeEventListener('click', handleClick);
  rightImageElement.removeEventListener('click', handleClick);
}

function generateRandomIndex() {
  return Math.floor(Math.random() * Proudect.globArr.length - 1);

}
function savetoLs() {
  const convertedArr = JSON.stringify(Proudect.globArr);
  localStorage.setItem('click', convertedArr);
}

function getFromLs() {
  const data = localStorage.getItem('click');

  const parsedOrder = JSON.parse(data);

  if (parsedOrder) {

    Proudect.globArr = parsedOrder;
    // [] = null
    renderImages();
  }
}
getFromLs();

function renderChart() {

  let ctx = document.getElementById('myChart');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: arrayOfNames,
      datasets: [{
        label: arrayOfNames,

        data: numberOfvotes,

        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',

        ],
        borderWidth: 1

      }, {


        label: numberOfShown,
        backgroundColor: [
          'rgba(160, 99, 132, 0.2)',

        ],
        borderColor: [
          'rgba(180, 99, 132, 1)',

        ]



      }]

    },
  });
}

