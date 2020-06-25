$(document).ready(function(){


var container = $(".container");
var searchForm = $(".form-inline");
var formControl = $(".form-control")
var mainCard = $("#maincard")
var searchBtn = $(".btn")
var location =[];
var card1 = $("#card1");
var card2 = $("#card2");
var card3 = $("#card3");
var card4 = $("#card4");
var card5 = $("#card5");
var cardArray= [card1, card2, card3, card4, card5];

var increment = ["1", "2", "3", "4", "5"]

var day1=[];
var day2=[];
var day3=[];
var day4=[];
var day5=[];

var dayArray=[day1, day2, day3, day4, day5];

var hasGeneratedCards = false;



searchButton();

function searchButton(){
$(searchBtn).on("click", function(e){
    alert("The paragraph was clicked.");
    event.preventDefault();
    var input = $(this).siblings(formControl).val();

if(input != null){
        
    location.push(input);       
//    console.log($(this).siblings(formControl).val());
//    console.log(location);
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

        var iconcodemain= response.weather[0].icon; 
        var iconurlmain = "https://openweathermap.org/img/wn/" + iconcodemain + ".png";
        var img = $("<img>");
        //  console.log(img);
        img.attr("src", iconurlmain)
        //    console.log(response);

        var date= (moment().format("dddd, MMM Do YYYY"))
        
        $(".city").text(response.name).append(img, date);
        $(".temp").text("Temperature (K) " + response.main.temp)
        $(".windspeed").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".uv").text("UV: " + response.clouds.all);     
    })
}
$(mainCard).prepend('<h1 class="city" id="mainicon"></h1>');
$(mainCard).prepend('<div id="mainicon"></div>');
$(mainCard).append('<p class= "temp"></p>');
$(mainCard).append('<p class = "humidity"></p>');
$(mainCard).append('<p class ="windspeed"></p>');
$(mainCard).append('<p class ="uv"></p>');
///////current weather//////////////////////////////////////////////////////////////////////////////////////////////////////





/////////////////////////////5day///////////////////


function fiveDay(){

    var actualHour = moment().format("HH");
    console.log(actualHour);
    var adjustedHour=Math.floor(actualHour/3);
    // console.log(adjustedHour);

    for(i=0;i<6;i++){
    $('#weatherIcon').remove();
    }
    
    
 var APIKey = "be6a5afd637e52c8345f9d5c594e2f10";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" + "q=" +location+ ",us" +"&appid="  + APIKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

     
        //  console.log(response);

        for(i=0; i<5; i++){
            dayArray[i] = [];
        }

         var j=0;
        for(i=0; i<response.list.length; i++){ 
                dayArray[j].push(response.list[i]);
                if(dayArray[j].length===8){
                    j++;
                }
                if(i==response.list.length-1){
                    j=0;
                }
            }
            

        
            // console.log("loggin" + response.list.length);
         
            for(i=0; i<dayArray.length; i++){

                if(hasGeneratedCards!=true){
                    $(cardArray[i]).prepend('<h6 class="carddate"></h6>');
                    $(cardArray[i]).append('<div class="cardicon"><div>');
                    $(cardArray[i]).append('<p class="cardtemp"></p>');
                    $(cardArray[i]).append('<p class="cardhumid"></p>');
                }


                $(cardArray[i]).children(".carddate").text((dayArray[i])[adjustedHour].dt_txt);
                $(cardArray[i]).children(".cardtemp").text((dayArray[i])[adjustedHour].main.temp);
                $(cardArray[i]).children(".cardhumid").text((dayArray[i])[adjustedHour].main.humidity);

                

                var iconcode = (dayArray[i])[adjustedHour].weather[0].icon;
                var iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
                var img = $('<img id="weatherIcon">');

                // console.log("iconcode = " +iconcode+ ", iconurl = " + iconurl)

                   img.attr("src", iconurl)
                   
                //    if(hasGeneratedCards===true) {
                //          $('#weatherIcon').remove();
                //          $(cardArray[i]).children('.cardicon').append(img);
                //          console.log($(cardArray[i]).children('#weatherIcon'))
                //      } else {
                //         $(cardArray[i]).children('.cardicon').append(img);
                //      }

                $(cardArray[i]).children('.cardicon').append(img);




            }

            hasGeneratedCards = true;




    })
}


function uvIndex(){
    var APIKey = "be6a5afd637e52c8345f9d5c594e2f10";

    // Here we are building the URL we need to query the database
    var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid="+ APIKey + "&lat={lat}&lon={lon}"

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

     
         console.log(response);

}


});


//finish uv index