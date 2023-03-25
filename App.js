import { catsData } from "./data.js";

const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const emotionRadios = document.getElementById("emotion-radios");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModal = document.getElementById("meme-modal");
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn");

emotionRadios.addEventListener("change", highlightSelectedRadio);

memeModalCloseBtn.addEventListener("click", () => {
  memeModal.style.display = "none";
});

getImageBtn.addEventListener("click", renderCat);

function highlightSelectedRadio(e) {
  //new array for removing class highlight
  const radioArray = document.getElementsByClassName("radio");
  for (let radio of radioArray) {
    radio.classList.remove("highlight");
  }
  //then add highlight class to selected radio
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

// order of functions:getImageBtn==>renderCat==>getSingleCatObject==>getMatchingArray
function renderCat() {
  const catObject = getSingleCatObject();
  if (catObject) {
    memeModalInner.innerHTML = `<img 
            class="cat-img" 
            src="./images/${catObject.image}"
            alt="${catObject.alt}"
            >`;
  } else {
    memeModalInner.innerHTML = `<h1>There is no cat in that category</h1>`;
  }
  memeModal.style.display = "flex";
}

function getSingleCatObject() {
  const catsArray = getMatchingCatsArray();
  if (catsArray.length === 1) {
    return catsArray[0];
  } else {
    let randomCat = catsArray[Math.floor(Math.random() * catsArray.length)];
    return randomCat;
  }
}

function getMatchingCatsArray() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const selectedEmotion = document.querySelector(
      'input[type="radio"]:checked'
    ).value;
    const isGif = gifsOnlyOption.checked;

    const matchingCatsArray = catsData.filter(function (cat) {
      return isGif
        ? cat.emotionTags.includes(selectedEmotion) && cat.isGif
        : cat.emotionTags.includes(selectedEmotion);
    });
    return matchingCatsArray;
  }
}

function getEmotionsArray(cats) {
  let emotionsArray = [];
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      //if array not includes emotion then push. includes prevents from repeating elements
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
    }
  }
  return emotionsArray;
}

//gets radios labeled emotions
function renderEmotionRadios(cats) {
  const emotions = getEmotionsArray(cats);
  for (let emotion of emotions) {
    emotionRadios.innerHTML += `<div class="radio">
    
    <label for="${emotion}">${emotion}</label>
    <input type="radio" id="${emotion}" value="${emotion}" name="emotions-radio"/>
    </div>`;
  }
}
renderEmotionRadios(catsData);
