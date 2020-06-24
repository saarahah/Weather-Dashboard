$(document).ready(function(){


var container = $(".container");
var searchForm = $(".form-inline");
var formControl = $(".form-control")
var mainCard = $("#maincard")
var searchBtn = $(".btn")
var location =[];
var card1 = $("#card1");


searchButton();

function searchButton(){
$(searchBtn).on("click", function(e){
    alert("The paragraph was clicked.");
    event.preventDefault();
    var input = $(this).siblings(formControl).val();

if(input != null){
        
    location.push(input);       
   console.log($(this).siblings(formControl).val());
   console.log(location);
    }
    oneDay();
    fiveDay();
    
    location=[];
  });
 
}

function oneDay(){

var APIKey = "be6a5afd637e52c8345f9d5c594e2f10";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" + location +"&appid="  + APIKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

 
        $(".city").text(response.name);
        $(".temp").text("Temperature (K) " + response.main.temp)
        $(".windspeed").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".uv").text("UV: " + response.clouds.all);

        
    })
}

$(mainCard).prepend('<h1 class="city"></h1>');
$(mainCard).append('<p class= "temp"></p>');
$(mainCard).append('<p class = "humidity"></p>');
$(mainCard).append('<p class ="windspeed"></p>');
$(mainCard).append('<p class ="uv"></p>');
///////current weather////////////

/////////////////////////////5day///////////////////


function fiveDay(){
 var APIKey = "be6a5afd637e52c8345f9d5c594e2f10";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" + "q=London,us" +"&appid="  + APIKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        // console.log(response);
        console.log(response.list[8]);
        console.log(response.list[14]);
        console.log(response.list[22]);
        console.log(response.list[29]);
        // console.log(temp.day);

        $(".date").text(response.list[8].dt_txt);
        $(".icon").text(response.list[8].weather[0].icon);
        // console.log("this is the date" + response.list[8].dt_txt);
        console.log(response.list[8].weather[0].icon);

    })
}

    $(card1).append('<h6 class="date"></h6>');
    $(card1).append('<h1 class="icon"></h1>');







});
