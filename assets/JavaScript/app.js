
var games = ["Terraria", "Fortnite", "League of Legends", "Halo"];
// Perfoming an AJAX GET request to our queryURL

//my ajax call gives each new populated gif a class of gif, a data-still url and a data-animate url, yet onclick still doesn't work
$(".gif").on("click", function () {
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
});

//creating function to render new buttons

// Event listener for our buttons
$("button").on("click", function (displayGifInfo) {

    var game = $(this).attr("data-game");
    // Storing our giphy API URL for a random trending overwatch image
    //also limiting the amount of gifs to 10 per page
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        game + "&api_key=qVDtxJLwGoVq02sQupqDY3FyhqAFyn8N&limit=10";

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
                    gameImage.attr("src", results[i].images.fixed_height.url); gifDiv.append(p);
                    gameImage.attr("data-still", results[i].images.fixed_height_still.url);
                    gameImage.attr("data-animate", results[i].images.fixed_height.url);
                    gameImage.addClass("gif");
                    //append p tag
                    gifDiv.append(gameImage);
                    //prepend gif image to p tag
                    $("#where-gifs-appear").prepend(gifDiv);
                }
            }
        });
        function renderButtons() {
            $("#buttons-div").empty();
            for (var i = 0; i < games.length; i++) {
              var newButton = $("<button>");
              newButton.addClass("game-btn");
              newButton.attr("data-name", games[i]);
              newButton.text(games[i]);
              $("#buttons-div").append(newButton);
            }
          }
          $("#add-game").on("click", function(event) {
              //prevents page refresh
            event.preventDefault();
            
            var game = $("#game-input").val().trim();
            games.push(game);
            renderButtons();
          });
          $(document).on("click", ".game-btn", displayGifInfo);
          renderButtons();
});