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



searchButton();

// setInterval(() => {
    // $("p#currentDay").text(moment().format("dddd, MMM Do YYYY"));
//   }, 1000);

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
    console.log(adjustedHour);
    
    
 var APIKey = "be6a5afd637e52c8345f9d5c594e2f10";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" + "q=" +location+ ",us" +"&appid="  + APIKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

     
         console.log(response);


         var j=0;
        for(i=0; i<response.list.length; i++){ 
                dayArray[j].push(response.list[i]);
                if(dayArray[j].length===8){
                    j++;
                }
                if(i===response.list.length){
                    j=0;
                }
            }
            console.log("day 5 has" + day5[0].main.temp);
            

        
            // console.log("loggin" + response.list.length);
         
            for(i=0; i<dayArray.length; i++){

                $(cardArray[i]).prepend('<h6 class="carddate"></h6>');
                $(cardArray[i]).append('<div class="cardicon"><div>');
                $(cardArray[i]).append('<p class="cardtemp"></p>');
                $(cardArray[i]).append('<p class="cardhumid"></p>');


                $(".carddate").text(response.list[8].dt_txt);

                var iconcode1= response.list[8].weather[0].icon;
                var iconurl1 = "https://openweathermap.org/img/wn/" + iconcode1 + ".png";
                var img = $("<img>");
                   img.attr("src", iconurl1)
                     $('#icon1').append(img);
            
                    $("#temp1").text(response.list[8].main.temp);
                    $("#temp1").text(response.list[8].main.humidity);
                    $("#date2").text(response.list[13].dt_txt);
                    $("#temp2").text(response.list[13].main.temp);
                    $("#temp2").text(response.list[13].main.humidity);




            }

    //  $("#date1").text(response.list[8].dt_txt);

    // var iconcode1= response.list[8].weather[0].icon;
    // var iconurl1 = "https://openweathermap.org/img/wn/" + iconcode1 + ".png";
    // var img = $("<img>");
    //    img.attr("src", iconurl1)
    //      $('#icon1').append(img);

    //     $("#temp1").text(response.list[8].main.temp);
    //     $("#temp1").text(response.list[8].main.humidity);
    //     $("#date2").text(response.list[13].dt_txt);
    //     $("#temp2").text(response.list[13].main.temp);
    //     $("#temp2").text(response.list[13].main.humidity);
        // console.log("this is the date" + response.list[8].dt_txt);
        // console.log(response.list[8].weather[0].icon);

        // console.log(response);

    })
}






    $(card1).prepend('<h6 id="date1"></h6>');
    $(card1).append('<div id="icon1"><div>');
    $(card1).append('<p id="temp1"></p>');
    $(card1).append('<p id="humid1"></p>');

});


//finish uv index