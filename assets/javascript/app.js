//declare needed variables
var searchItem = "Randy Marsh";
var queryUrl;
var limit = 10;
var rating = "G";
var startingMotion = "still";
var inputs = ["Randy Marsh", "Butters Scotch", "Kyle Broflovski", "Eric Cartman", "Stan Marsh", "Kenny McCormick", "Mysterion", "Mr. Garrison", "Mr. Hanky"]
var toggleDisplay = false;
//write function for button creation
function makeButton() {
    $(".dropBar").empty();
    for (var i = 0; i < inputs.length; i++) {
        //create jQuery button element attached to a variable
        var newButton = $("<button>");
        //get value of text entry field and save in a variable
        // var inputText = $("#input-field").val();    ---adjusted line after realizing we were meant to use array to make buttons
        //assign a class to new button element
        newButton.addClass("btn btn-outline-success inputter");
        //assign text from input field to new button
        newButton.text(inputs[i]);
        //assign data type attribute to target later
        newButton.attr("data-name", inputs[i])
        //add new button to navbar
        $(".dropBar").append(newButton);
        console.log("ran makeButton");
    }
}
makeButton();
//write function for making requests to API
function apiCall() {
    console.log("searching for: " + searchItem);
    //update queryUrl so it contains current name
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=HymDtSMDP3XMnzv3jHIaujnzNnqgYTbT&q=" + searchItem + "&limit=" + limit + "&rating=" + rating + "&offset=0&lang=en"
    // queryURL = "https://api.giphy.com/v1/gifs/search?api_key=HymDtSMDP3XMnzv3jHIaujnzNnqgYTbT&q=randy marsh&limit=25&offset=0&rating=G&lang=en"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var data = response.data;
        //write for loop that goes through response data
        for (var i = 0; i < limit; i++) {
            //create dynamic jQuery elements
            var gifBox = $("<div>");
            var gif = $("<img>");
            var gifTitle = $("<div>");
            var gifRating = $("<div>");
            //assign classes to new elements:
            gifTitle.addClass("card-header");
            gifRating.addClass("card-footer text-muted");
            gifBox.addClass("card text-center");
            gif.addClass("gifs");
            //collect variables from API for rating and title inputs
            var ratingText = data[i].rating;
            var titleText = data[i].title;
            gifRating.text("Rated: " + ratingText.toUpperCase());
            gifTitle.text(titleText);
            //collect variables from API response for still and animate positions
            var bigGif = data[i].images.original.url;
            var still = data[i].images.fixed_width_still.url;
            var animated = data[i].images.fixed_width.url;
            gif.attr("data-big", bigGif);
            gif.attr("data-still", still);
            gif.attr("data-animate", animated);
            //set conditions for starting state based on select dropdown
            if (startingMotion === "still") {
                gif.attr("src", still);
                gif.attr("data-state", "still");
            } else {
                gif.attr("src", animated);
                gif.attr("data-state", "animate");
            }
            //append new elements to page
            gifBox.append(gifTitle, gif, gifRating);
            $(".dropBox").append(gifBox);
        }
    });
}
// apiCall(); // testing apiCall
//write on click block targeting document and buttons by class
$(document).on("click", ".inputter", function () {
    //empty out old gif's from display
    $(".dropBox").empty();
    limit = $("#limit-select").val();
    console.log(limit);
    rating = $("#rating-select").val();
    console.log(rating);
    startingMotion = $("#motion-select").val();
    //update variable with search input to name from button clicked
    searchItem = $(this).attr("data-name");
    console.log(searchItem);
    //run api call function
    apiCall();
})

//write on click block for button creation button (lol)
$("#adder").on("click", function () {
    //run button creation function
    console.log("clicked adder");
    //check for total number of buttons on screen
    if (inputs.length > 13) {
        //remove oldest button
        inputs.shift();
    }


    inputs.push($("#input-field").val());
    makeButton();
    //clear text input field
    $("#input-field").val("");
});
$(document).on("click", ".bigDisplay", function () {
    if (toggleDisplay) {
        toggledisplay = false;
        $(".bigDisplay").toggle();
    }
});
$(document).on("click", ".gifs", function () {
    var state = $(this).attr("data-state");
    var bigGifDisplay = $(this).attr("data-big");
    var bigGifHolder = $("<img>");
    bigGifHolder.addClass("bigGif")
    bigGifHolder.attr("src", bigGifDisplay);
    toggleDisplay = true;
    $(".bigDisplay").empty();
    $(".bigDisplay").append(bigGifHolder);
    $(".bigDisplay").toggle();
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});


