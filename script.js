$(document).ready(function(){

// var searchForm = document.querySelector(".form-inline");
// var searchBtn = document.querySelector(".btn");
// var formControl=document.querySelector(".form-control");

var container = $(".container");
var searchForm = $(".form-inline");
var formControl = $(".form-control")
var searchBtn = $(".btn")

var APIKey = "be6a5afd637e52c8345f9d5c594e2f10";

var location = "Orlando"

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" + location +"&appid="  + APIKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);
    })

    // searchBtn.addEventListener("click", function(event) {
    //      event.preventDefault();
    //   console.log("this is form control" + formControl.sibling)
    //    console.log("this is search form" + searchForm.nextSibling);

    // $(document).on("click", searchBtn, function(e) {  
    //      alert("saved!");
    //     event.preventDefault();
    //     var input = $(this).closest(formControl).val();
    //     console.log($(this).closest(formControl).val());


    $(searchBtn).on("click", function(e){
        alert("The paragraph was clicked.");
        event.preventDefault();
        var input = $(this).siblings(formControl).val();
       console.log($(this).siblings(formControl).val());
      });


    //   $(document).on("click", ".saveBtn", function(e) {  
    //     alert("saved!");
    //     var input = $(this).siblings("textarea").val();
        
 

});
