
// Event listener for our buttons
$("button").on("click", function () {

    var game = $(this).attr("data-game");
    // Storing our giphy API URL for a random trending overwatch image
    //also limiting the amount of gifs to 10 per page
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        game + "&api_key=qVDtxJLwGoVq02sQupqDY3FyhqAFyn8N&limit=10";
    // Perfoming an AJAX GET request to our queryURL
    
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // after the ajax call we take the data that we want.
        .then(function (response) {
            console.log(queryURL);
            console.log(response)
            var results = response.data;
            //loop to cycle through search results
            for (var i = 0; i < results.length; i++) {
                //only displaying them if they have an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    //creates a new gif div
                    var gifDiv = $("<div>");
                    //storing array of results in rating  
                    var rating = results[i].rating;
                    //storing rating in a p tag
                    var p = $("<p>").text("Rating: " + rating);
                    //storing the game in a new image
                    var gameImage = $("<img>");
                    //appending the array of strings
                    gameImage.attr("src", results[i].images.fixed_height_still.url); gifDiv.append(p);
                    //append p tag
                    gifDiv.append(gameImage);
                    //prepend gif image to p tag
                    $("#where-gifs-appear").prepend(gifDiv);
                }
            }
        });

    /* $(".gif").on("click", function () {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }); */
});