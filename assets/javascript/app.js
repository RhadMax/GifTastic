var searchItem = "Randy Marsh";
var queryUrl;
var limit = 10;
var rating = "G";
var startingMotion = "still";
var inputs = ["Randy Marsh", "Butters Scotch", "Kyle Broflovski", "Eric Cartman", "Stan Marsh", "Kenny McCormick", "Mysterion", "Mr. Garrison", "Mr. Hanky"]
var toggleDisplay = false;
function makeButton() {
    $(".dropBar").empty();
    for (var i = 0; i < inputs.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("btn btn-outline-success inputter");
        newButton.text(inputs[i]);
        newButton.attr("data-name", inputs[i])
        $(".dropBar").append(newButton);
    }
}
makeButton();
function apiCall() {
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=HymDtSMDP3XMnzv3jHIaujnzNnqgYTbT&q=" + searchItem + "&limit=" + limit + "&rating=" + rating + "&offset=0&lang=en"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var data = response.data;
        for (var i = 0; i < limit; i++) {
            var gifBox = $("<div>");
            var gif = $("<img>");
            var gifTitle = $("<div>");
            var gifRating = $("<div>");
            gifTitle.addClass("card-header");
            gifRating.addClass("card-footer text-muted");
            gifBox.addClass("card text-center");
            gif.addClass("gifs");
            var ratingText = data[i].rating;
            var titleText = data[i].title;
            gifRating.text("Rated: " + ratingText.toUpperCase());
            gifTitle.text(titleText);
            var bigGif = data[i].images.original.url;
            var still = data[i].images.fixed_width_still.url;
            var animated = data[i].images.fixed_width.url;
            gif.attr("data-big", bigGif);
            gif.attr("data-still", still);
            gif.attr("data-animate", animated);
            if (startingMotion === "still") {
                gif.attr("src", still);
                gif.attr("data-state", "still");
            } else {
                gif.attr("src", animated);
                gif.attr("data-state", "animate");
            }
            gifBox.append(gifTitle, gif, gifRating);
            $(".dropBox").append(gifBox);
        }
    });
}
$(document).on("click", ".inputter", function () {
    $(".dropBox").empty();
    limit = $("#limit-select").val();
    rating = $("#rating-select").val();
    startingMotion = $("#motion-select").val();
    searchItem = $(this).attr("data-name");
    apiCall();
})
$("#adder").on("click", function () {
    if (inputs.length > 13) {
        inputs.shift();
    }
    inputs.push($("#input-field").val());
    makeButton();
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