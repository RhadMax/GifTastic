//declare needed variables
var searchItem = "";
var queryUrl = "";
var limit = 25;
//write function for button creation
function makeButton() {
    //create jQuery button element attached to a variable

    //get value of text entry field and save in a variable

    //assign a class to new button element

    //check for total number of buttons on screen

    //remove oldest button
}
//write function for making requests to API
function apiCall() {
    searchItem = $("#input-field").val();
    limit = $("limit-field").val() || 25;
    // queryURL = "https://api.giphy.com/v1/gifs/search?api_key=HymDtSMDP3XMnzv3jHIaujnzNnqgYTbT&q=" + searchItem + "&limit=" + limit + "&offset=0&lang=en"
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=HymDtSMDP3XMnzv3jHIaujnzNnqgYTbT&q=randy marsh&limit=25&offset=0&rating=G&lang=en"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var data = response.data;
        //write for loop that goes through response data
        for (var i = 0; i < limit; i++) {
            //create dynamic jQuery elements
            var gif = $("<img>");
            //assign classes to new elements:
            gif.addClass("gif-styling");
            //src and url from API response
            var source = data[i].images.original.url;
            gif.attr("src", source);
            //append new elements to page
            $(".dropBox").append(gif);
        }
    });
}
apiCall(); // testing apiCall
//write on click block targeting document and buttons by class

    //update variable with search input to name from button clicked

    //update queryUrl so it contains current name

    //run api call function

//write on click block for button creation button (lol)

    //run button creation function

    //clear text input field
