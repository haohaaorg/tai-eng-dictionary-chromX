var apiKey = "NO8p3FC4qMrTzx1RUjRXNXWrqlLa8DkDjmRgt7s9rDE=";

// Add bubble to the top of the page.
var bubble = document.createElement("div");
bubble.setAttribute("class", "bubble");
document.body.appendChild(bubble);

var bubbleContent = document.createElement("div");
bubbleContent.setAttribute("class", "bubbleContent");
bubble.appendChild(bubbleContent);

// Add icon to the top of the page.
var taiEngicon = document.createElement("div");
taiEngicon.setAttribute("class", "taiEngIconContainer");
taiEngicon.onmousedown = onIconClick;
document.body.appendChild(taiEngicon);

var loading = false;
var languageEndpoint = "/eng/";

// Lets listen to mouseup DOM events.
document.addEventListener(
  "mouseup",
  function (e) {
    var selection = window.getSelection().toString();
    if (selection.length > 0 && selection.length < 20 && !loading) {
      renderIcon(e.clientX - 20, e.clientY + 10);
    } else {
      taiEngicon.style.visibility = "hidden";
    }
  },
  false
);

window.onclick = function (event) {
  if (event.target.matches(".bubble")) {
    bubble.style.visibility = "hidden";
    bubble.style.display = "none";
    loading = false;
  }
};

function renderIcon(mouseX, mouseY) {
  taiEngicon.innerHTML =
    "<img class='taiEngicon' src='https://user-images.githubusercontent.com/9565672/145232095-a2ee28c3-bb6b-45b6-a742-ed027aa028d3.png'/>";
  taiEngicon.style.top = mouseY + "px";
  taiEngicon.style.left = mouseX + "px";
  taiEngicon.style.visibility = "visible";
}

function onIconClick(e) {
  loading = true;
  taiEngicon.style.visibility = "hidden";
  var selection = window.getSelection().toString();
  if (selection.length > 0) {
    translateText(e.clientX - 20, e.clientY + 10, selection);
  }
}

function translateText(mouseX, mouseY, selection) {
  taiEngicon.style.visibility = "hidden";

  var url =
    "https://tai-eng-dictionaryapi.herokuapp.com/api/v1/api_key=" +
    apiKey +
    languageEndpoint +
    selection.toLowerCase();
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
      if (!res.data) {
        renderBubble(mouseX, mouseY, selection, "Translation not found.");
      } else {
        renderBubble(mouseX, mouseY, selection, res.data[0].shan);
      }
    })
    .catch(function (err) {
      console.error("An error ocurred", err);
    });
}

function onCloseBubble(e) {
  loading = false;
  bubble.style.display = "none";
  bubble.style.visibility = "hidden";
}

// Move that bubble to the appropriate location.
function renderBubble(mouseX, mouseY, englishText, translation) {
  taiEngicon.style.visibility = "hidden";
  bubbleContent.innerHTML =
    "<div><span onclick='onCloseBubble()' class='close'>&times;</span><p class='langText'>English:</p><p class='translatedText'> " +
    englishText +
    "</p><p class='langText'>Shan:</p><p class='translatedText'>" +
    translation +
    "</p><div><a class='websiteLink' href='https://taidictionary.noernova.com' target='_blank' rel='noopener '>MORE >></a></div></div>";
  bubbleContent.style.top = mouseY + "px";
  bubbleContent.style.left = mouseX + "px";
  bubble.style.visibility = "visible";
  bubble.style.display = "block";
}
