var endpoints = ["shells", "baseLayers", "mixins", "condiments", "seasonings"];

// Preliminary arrays to store JSON data
var shells = [];
var baseLayers = [];
var mixins = [];
var condiments = [];
var seasonings = [];

// Arrays to store taco data
var currentTaco = [];
var tacoList = [];


// Immediately fetch JSON data from endpoints and add to each ingredient array
endpoints.forEach(ingredient => {
  var request = new XMLHttpRequest();
  request.open("GET", "https://tacos-ocecwkpxeq.now.sh/" + ingredient, false);
  request.onload = function(){
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      data.forEach(object => {
        window[ingredient].push(object.name);
      });
    } else {
      console.log("Error: Bad HTTP Request");
    }
  }
  request.send();
})


// Function to build and insert a table of ingredients for each category
function buildTable(id, array){
  var reference = document.getElementById(id);
  var table = document.createElement("table");
  for(i = 0; i < array.length; i++){
    var newRow = table.insertRow(table.rows.length);
    var newCell = newRow.insertCell(0);
    var newEntry = document.createTextNode(array[i]);
    var button = document.createElement("button");
    button.id = array[i];
    button.name = "button";
    button.appendChild(newEntry);
    newCell.appendChild(button);
  }
  reference.appendChild(table);
}


buildTable("shells", shells);
buildTable("baseLayers", baseLayers);
buildTable("mixins", mixins);
buildTable("condiments", condiments);
buildTable("seasonings", seasonings);


// Initializing event listener to get option clicks
var tableListener = document.querySelector("#tablerow");
tableListener.addEventListener("click", buildTaco);

// Functionality to alternate between table views
var view = 0;

// On-click function to add ingredients to currentTaco and swap table views
function buildTaco(e){
  if(e.target.name == "button"){
    document.getElementById(endpoints[view % endpoints.length]).style.display = "none";
    view += 1;
    document.getElementById(endpoints[view % endpoints.length]).style.display = "block";
    currentTaco.push(e.target.id);
    displayTaco();
  }
  e.stopPropagation();
}


// Function to display well-formatted sentence after taco creation
function displayTaco(){
  document.getElementById("tacoheader").innerHTML = "";
  document.getElementById("tacoSentence").innerHTML = "";
  document.getElementById("makeagain").innerHTML = "";
  if (currentTaco.length == 5){
    document.getElementById("tacoheader").innerHTML = "You've just made a taco with:";
    var sentence = "Homemade " + currentTaco[0] + ", juicy " + currentTaco[1]
      + ", fresh " + currentTaco[2] + ", popping " + currentTaco[3]
      + ", and superb " + currentTaco[4] + "!";
    document.getElementById("tacoSentence").innerHTML = sentence;
    document.getElementById("makeagain").innerHTML = "Click on a shell to make another!";
    tacoList.push(currentTaco);
    currentTaco = [];
    displayList();
  }
}

// Function to add to and display list of all tacos made
function displayList(){
  var list = document.createElement("ul");
  tacoList.forEach(taco => {
    var item = document.createElement("li");
    var tacoAsString = taco.join(', ');
    item.appendChild(document.createTextNode(tacoAsString));
    list.appendChild(item);
  })
  document.getElementById("listheader").innerHTML = "Here's a list of your yummy creations:";
  document.getElementById("tacoList").innerHTML = "";
  document.getElementById("tacoList").appendChild(list);

}

// Hide all tables but the first upon page load
window.onload = function(){
  for (i = 1; i < endpoints.length; i++){
    var id = document.getElementById(endpoints[i]);
    id.style.display = "none";
  }
}

