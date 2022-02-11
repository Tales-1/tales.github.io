import {words} from "./library.js";




let play = true;

setInterval(timeLeft,1000);
timeLeft()




let month = new Date().getMonth();
let today = new Date().getDate();
let current = new Date(2022,month,today,0,0).getTime();
const firstTry = document.querySelectorAll(".first");
const secondTry = document.querySelectorAll(".second");
const thirdTry = document.querySelectorAll(".third");
const fourthTry = document.querySelectorAll(".fourth");
const fifthTry = document.querySelectorAll(".fifth");
const sixthTry = document.querySelectorAll(".sixth")
const youWin = document.querySelector(".result-container")
let text = document.getElementById("result")
const keys = document.querySelectorAll(".key");
const container = document.querySelector(".container");
const enter = document.querySelector(".enter");
const backspace = document.querySelector(".return");
let timeContainer = document.getElementById("time-el");
const gridContainer = document.querySelector(".grid-container");
const closeBtn = document.querySelector(".closebtn");
const rows = Array.from(gridContainer.children);
const shareBtn = document.getElementById("share-btn");
const alert = document.querySelector(".alert")
const cog = document.querySelector(".show-result");
let counter = 0;
let targetWord;
let displayArray = [firstTry,secondTry,thirdTry,fourthTry,fifthTry,sixthTry];




// generate ID and select word of the day
generateIds(words);
selectWord(words);

//EVENT LISTENERS
window.addEventListener("DOMContentLoaded",()=>{
    play = true;
    let items = getLocalStorage();
    if(items.length>0){
        refreshDisplay(items);
        
    }
    
})



container.addEventListener("click", e=>{
  if(!e.target.closest("span")) return;

  if(e.target.closest("span") && play){
  const targetLetter = e.target.innerHTML;
 inputLetters(targetLetter)

    }

});

backspace.addEventListener("click",()=>{
    turn[counter-1].innerHTML = "";
    counter--
})

enter.addEventListener("click",()=>{
    let copy = [...targetWord];
    let answer=[];
    if(play){
    turn.forEach((letter,index)=>{
        answer.push(letter.innerHTML);
        for(let i = 0; i<targetWord.length;i++){
            if(letter.innerHTML === targetWord[i] && index === i){
            setTimeout(changeGreen,250*index,letter)
            targetWord[i] = "."
            return;
           }

           else if(letter.innerHTML === targetWord[i] && index !== i){
           setTimeout(changeOrange,250*index,letter)
           return;
           }

        }
        if(!letter.classList.contains("green") && !letter.classList.contains("orange")){
            setTimeout(changeGrey,250*index,letter);
        }

    })
    targetWord = copy;
    addToLocalStorage(answer);
    let checker = 0;
    for(let i=0; i<targetWord.length;i++){
        if(answer[i]===targetWord[i]){
            checker++
        }
    }
 
    if(checker ===5 || turn ===sixthTry){
        setTimeout(result,3300);
        play = false;
        
    }
    
    turnNo++
    counter = 0;
}
    
})

closeBtn.addEventListener("click", ()=>{
    youWin.classList.remove("show")
})

shareBtn.addEventListener("click",()=>{
    updateClipboard(`
    I got ${turnNo}/6, try Wordl!`
    );
    showAlert()
})

cog.addEventListener("click",()=>{
    result()

})








// FUNCTIONS
let turnNo = 0;
let turn;

function turnSelector(turnNo){
    switch(turnNo){
        case 0:
        turn = firstTry;
        break;

        case 1:
        turn = secondTry;
        break;

        case 2:
        turn = thirdTry;
        break;

        case 3:
        turn = fourthTry;
        break;

        case 4:
        turn = fifthTry;
        break;

        case 5:
        turn = sixthTry;
        break;

    }
}

function inputLetters(targetLetter){
    turnSelector(turnNo);
    switch(counter){
    case 0:
      turn[counter].innerHTML = targetLetter;
      counter++;
      break;
    case 1:
      turn[counter].innerHTML = targetLetter;
      counter++;
      break;
    case 2:
      turn[counter].innerHTML = targetLetter;
      counter++;
      break;
    case 3:
      turn[counter].innerHTML = targetLetter;
      counter++;
      break;
    case 4:
      turn[counter].innerHTML = targetLetter;
      counter++;
      break;
    }
}


function changeGreen(letter){
    letter.classList.add("green");
    letter.style.transform = "rotateX(360deg)"

}
function changeOrange(letter){
    letter.classList.add("orange");
    letter.style.transform = "rotateX(360deg)"
}
function changeGrey(letter){
    letter.classList.add("wrong");
    letter.style.transform = "rotateX(360deg)";
    keys.forEach((key)=>{
        if(key.innerHTML===letter.innerHTML){
            key.style.background = "rgba(0,0,0,0.3)"
        }
    })

}

function showAlert(){
    alert.classList.add("show");
    setTimeout(function(){alert.classList.remove("show")}, 1000)
}


function result(){
    youWin.classList.add("show");
    text.innerHTML = 
    `Result:
    ${turnNo}/6
    `;

}

function updateClipboard(newClip) {
    navigator.clipboard.writeText(newClip).then(function() {
      /* clipboard successfully set */
    }, function() {
      /* clipboard write failed */
    });
  }
  



// Local storage


function getLocalStorage(){
    return localStorage.getItem("list") ? //check if localStorage,getItem("list") exists 
    JSON.parse(localStorage.getItem("list")) : // items = list which is an array 
    [];
}

function addToLocalStorage(row){
    const obj = {row}; //shorthand {id,value} as parameters match object property
    // check if item exists in the list
    let items = getLocalStorage();
    items.push(obj);
    localStorage.setItem("list", JSON.stringify(items));
}

function removeFromLocalStorage(){
    let items = getLocalStorage();
    items = []
    localStorage.setItem("list",JSON.stringify(items))
}

// DISPLAY PREVIOUS RESULT

function displayAnswers(){
    let items = getLocalStorage();
    let checker=0;
    if(items.length > 0){
         items.forEach((item,index)=>{
              for(let i = 0;i<rows.length-1;i++){
                 rows[index].children[i].innerHTML= item.row[i];
              }
              console.log(checker)
         })
     }
     
}



 function displayColor(array){

    array.forEach((letter,index)=>{
        for(let i = 0; i<targetWord.length;i++){
            if(letter.innerHTML === targetWord[i] && index === i){
            setTimeout(changeGreen,250*index,letter)
            return;
           }

           else if(letter.innerHTML === targetWord[i] && index !== i){
           setTimeout(changeOrange,250*index,letter)
           return;
           }

        }
        if(!letter.classList.contains("green") && !letter.classList.contains("orange")){
            setTimeout(changeGrey,250*index,letter);
        }

    })
 }

  function timeLeft(){
    
    const timeContainer = document.getElementById("time-el");
    let metrics = Array.from(timeContainer.children);
    let tomorrow = new Date().getDate()+1;
    let nextMinute = new Date().getMinutes()+1;
    let thisMonth = new Date().getMonth();
    let deadline = new Date(2022, thisMonth, tomorrow,0,0).getTime();
    let currentTime = new Date().getTime();
    let remainder = deadline - currentTime;
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;
    if(remainder < 1000){
         removeFromLocalStorage()
         play = true;
     }

     let hours = Math.floor((remainder % oneDay) / oneHour);
     let minutes = Math.floor((remainder % oneHour ) / oneMinute);
     let seconds = Math.floor((remainder % oneMinute) / 1000);

     const addZero = (i)=>{
         if(i < 10){
             return `0${i}`
         }
         return i
     }

     let remaining = [hours,minutes,seconds];
     metrics.forEach((metric,index)=>{
         metric.innerHTML = addZero(remaining[index]);
     })
    
 }

 function refreshDisplay(items){
    displayAnswers()
    displayArray.forEach((element,index)=>{
        if(index < items.length){
            displayColor(element);
        }

        if(index===items.length-1){
            play = false;
        }
    })}

function generateIds(arr){
    arr.forEach((item,index)=>{
        arr[index].id = new Date(2022,month,today+index,0,0).getTime();
    })
    console.log(arr[0].id);
}

function selectWord(arr){

    arr.forEach((item,index)=>{
        if(arr[index].id===current){
            targetWord = arr[index].word;
    }
})

}