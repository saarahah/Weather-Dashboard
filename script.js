$(document).ready(function () {

    var addHistory = $("#addHistory");
    var container = $(".container");
    var searchForm = $(".form-inline");
    var formControl = $(".form-control")
    var mainCard = $("#maincard")
    var searchBtn = $(".btn")
    //variable for location inputs
    var location = [];

    //variables for 5 day cards
    var card1 = $("#card1");
    var card2 = $("#card2");
    var card3 = $("#card3");
    var card4 = $("#card4");
    var card5 = $("#card5");
    var cardArray = [card1, card2, card3, card4, card5];

    var searchListArray = [];
    var listLength = 30;

    //arrays for 5 day daily times
    var day1 = [];
    var day2 = [];
    var day3 = [];
    var day4 = [];
    var day5 = [];

    //an array to hold the 5 day arrays
    var dayArray = [day1, day2, day3, day4, day5];

    //variable to check whether the 5 day cards were generated
    var hasGeneratedCards = false;

    //array to hold searched cities
    var searchHistory = [];

    //initializing the UV number
    var uvNumber = 0;


    //parse out local storage data cities
    var storedHistory = JSON.parse(localStorage.getItem("searchHistory"));
    console.log(storedHistory);

    

    // If items were retrieved from localStorage, update array
    if (storedHistory !== null) {
        searchHistory = storedHistory;
    }


    //for loop to create list elements that are links to stored data

    for (i = 0; i < listLength; i++) {
    //creates list items so each has own id
        var listID = "listItem" + i;
    //creates list element
        var li = document.createElement("li");
    //creates link
        var a = document.createElement("a");
    //makes link clickable
        a.setAttribute('href', "#");
    //add ID to link
        a.id = "link";
    //add ID to list item
        li.id = listID;
    //makes so when you click it takes text from link then pushes to location
        $('a').click(function () {
            console.log("running the click function");
            location.push($(this).text());
    //generates one and five day info
            oneDay();
            fiveDay();
    //clear location array
            location = [];
        });
    //append link to list item
        li.appendChild(a);
    //append list item to existing UL
        addHistory.append(li);
    }

// Render search history to the DOM
    renderSearchHistory();

//call the search button function to search for weather/city
    searchButton();

//function on click search button to link input to button click
    function searchButton() {
        $(searchBtn).on("click", function (e) {
//prevent form submission
            event.preventDefault();
//set the input to the the form text
            var input = $(this).siblings(formControl).val();
//push the input into a search history array
            searchHistory.push(input);
//call the functions store history and render search history            
            storeHistory();
            renderSearchHistory();
            
            if (input != null) {
                location.push(input);
            }
//call functions that populate one and 5 day sections
            oneDay();
            fiveDay();

            location = [];
        });

    }

////////////////DAY 1/////////////////////////////////////////////////////////
//function to populate the current day card
    function oneDay() {

        var APIKey = "be6a5afd637e52c8345f9d5c594e2f10";
// Here we are building the URL we need to query the database
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
            "q=" + location + "&appid=" + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        })
// We store all of the retrieved data inside of an object called "response"
            .then(function (response) {

 //creating a link for the weather icon
                var iconcodemain = response.weather[0].icon;
                var iconurlmain = "https://openweathermap.org/img/wn/" + iconcodemain + ".png";
                var img = $("<img>");
                img.attr("src", iconurlmain)


                uvIndex(response.coord.lat, response.coord.lon);


 //creating a variable to display date
                var date = (moment().format("dddd, MMM Do YYYY"))

//attaching the text and queried results for current day weather
                $(".city").text(response.name).append(img, date);
                $(".temp").text("Temperature (K) " + response.main.temp)
                $(".windspeed").text("Wind Speed: " + response.wind.speed);
                $(".humidity").text("Humidity: " + response.main.humidity);
            })
    }

//setting up the main card
    $(mainCard).prepend('<h1 class="city" id="mainicon"></h1>');
    $(mainCard).prepend('<div id="mainicon"></div>');
    $(mainCard).append('<p class= "temp"></p>');
    $(mainCard).append('<p class = "humidity"></p>');
    $(mainCard).append('<p class ="windspeed"></p>');
    $(mainCard).append('<p class ="uv"></p>');


//function which changes font color based on UV index number
    function uvIndexColor() {
        console.log("uv index is " + uvNumber);
        if (uvNumber < 3) {
            $('.uv').addClass('low')
            console.log("uV UNDER 10")

        } else if (uvNumber > 2 && uvNumber < 6) {
            $('.uv').addClass('medium')

        } else if (uvNumber > 5 && uvNumber < 11) {
            $('.uv').addClass('high')

        } else if (uvNumber > 10) {
            $('.uv').addClass('veryhigh')
        }
    }

 /////////////////////////////5day////////////////////////////////////

//function for populating 5 day forecast cards
    function fiveDay() {

//used to estimate the hour and display 5 day forecast data similar to the current time
        var actualHour = moment().format("HH");
        console.log(actualHour);
        var adjustedHour = Math.floor(actualHour / 3);
        console.log("this is the adjusted hour " + adjustedHour);

//AJAX call  
        var APIKey = "be6a5afd637e52c8345f9d5c594e2f10";

 // Here we are building the URL we need to query the database
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" + "q=" + location + ",us" + "&appid=" + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        })
// We store all of the retrieved data inside of an object called "response"
            .then(function (response) {

                console.log(response);


//for loops and arrays to gather data for 5 day forecast 

//goes through day array and makes each object = blank
//clears so does not push more hours into each day
                for (i = 0; i < 5; i++) {
                    dayArray[i] = [];
                }
//push 8 of the hour objects from response into each day
                var j = 0;
                for (i = 0; i < response.list.length; i++) {
                    dayArray[j].push(response.list[i]);
                    if (dayArray[j].length === 8) {
//once gets to 8 increments j to change days
                        j++;
                    }
//resets j so can do again later
                    if (i == response.list.length - 1) {
                        j = 0;
                    }
                }
//creates the cards
                for (i = 0; i < dayArray.length; i++) {
//creates sections of cards
                    if (hasGeneratedCards != true) {
                        $(cardArray[i]).prepend('<h6 class="carddate"></h6>');
                        $(cardArray[i]).append('<div class="cardicon"><div>');
                        $(cardArray[i]).append('<p class="cardtemp"></p>');
                        $(cardArray[i]).append('<p class="cardhumid"></p>');
                    }

//populates the sections with info
                    $(cardArray[i]).children(".carddate").text("date: " + (dayArray[i])[adjustedHour].dt_txt);
                    $(cardArray[i]).children(".cardtemp").text("temp (K): " + (dayArray[i])[adjustedHour].main.temp);
                    $(cardArray[i]).children(".cardhumid").text("humidity: " + (dayArray[i])[adjustedHour].main.humidity);
//empties icon so it does not repeat
                    $(cardArray[i]).children(".cardicon").empty();
//creates the icon
                    var iconcode = (dayArray[i])[adjustedHour].weather[0].icon;
                    var iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
                    var img = $('<img id="weatherIcon">');
                    img.attr("src", iconurl)
                    $(cardArray[i]).children('.cardicon').append(img);
                }
//sets has gen cards to true so dont repeat creating sections
                hasGeneratedCards = true;
            })
    }


//pass in values to get UV index
    function uvIndex(latitude, longitude) {
        var APIKey = "be6a5afd637e52c8345f9d5c594e2f10";

 //// Here we are building the URL we need to query the database
        var queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + latitude + "&lon=" + longitude;

        $.ajax({
            url: queryURL,
            method: "GET"
        })

// We store all of the retrieved data inside of an object called "response"
            .then(function (response) {
                console.log(response.value);
                $(".uv").text("UV: " + response.value);
                console.log("uv number is " + uvNumber);
                uvNumber = response.value;
                console.log("now uv number is " + uvNumber);

                uvIndexColor();
            })
    }

//store the search history items
    function storeHistory() {
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        console.log(localStorage.getItem("searchHistory"));

    }

//create list elements with text for search history list    
    function renderSearchHistory() {
        if (storedHistory != null) {
//keep adding searched items until the number reaches 30            
            for (var i = 0; i < storedHistory.length; i++) {
                var listID = "listItem" + i;
                $('#' + listID + '').children('#link').text(storedHistory[i]);
                console.log($('#' + listID + '').children('#link'));
            }
        }
    }

});

