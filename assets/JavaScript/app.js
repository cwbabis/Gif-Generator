
// Initial array of games
var games = ["OVERWATCH", "LEAGUE OF LEGENDS", "OCARINA OF TIME"];

// displayGameInfo function re-renders the HTML to display the appropriate content
function displayGameInfo() {

  var game = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=qVDtxJLwGoVq02sQupqDY3FyhqAFyn8N&limit=10";

  // Creating an AJAX call for the specific game button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(queryURL)
    console.log(response)
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      if (results[i].rating !== "r" /* && results[i].rating !== "pg-13" */) {
        var gifDiv = $("<div>");
        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);
        var gameImage = $("<img>");

        gameImage.attr("src", results[i].images.fixed_height_still.url); gifDiv.append(p);
        gameImage.attr("data-state", "still");
        gameImage.attr("data-still", results[i].images.fixed_height_still.url);
        gameImage.attr("data-animate", results[i].images.fixed_height.url);

        gameImage.addClass("gif");

        gifDiv.append(gameImage);

        $("#games-view").prepend(gifDiv);
      }
    }
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
  });
}
function renderButtons() {
  $("#buttons-view").empty();
  for (var i = 0; i < games.length; i++) {
    var a = $("<button style='color:white' type='button' class='btn btn-warning'>Primary</button>");
    a.addClass("game-btn");
    a.attr("data-name", games[i]);
    a.text(games[i]);
    $("#buttons-view").append(a);
  }
}
$("#add-game").on("click", function (event) {
  event.preventDefault();
  var game = $("#game-input").val().trim().toUpperCase();
  console.log(game)

  games.push(game);
  renderButtons();
});
$(document).on("click", ".game-btn", displayGameInfo);
renderButtons();