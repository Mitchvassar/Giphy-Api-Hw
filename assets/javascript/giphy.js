$( document ).ready(function() {

  $("#addGif").on("click", function(noReload) {
      noReload.preventDefault() //Prevents screen from reloading
      //variables
      var themeArray = [];
      var gif = $(this).attr("gif-data");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          gif + "&api_key=dc6zaTOxFJmzC&limit=10";

          //AJAX call to get api data
      $.ajax({
              url: queryURL,
              method: "GET"
          }).done(function(response) {
              var results = response.data;
              console.log(results)

              //for loop to iterate through array and add images and classes/attributes to them
              for (var i = 0; i < results.length; i++) {
                  if (results[i].rating) {

                      var gifDiv = $("<div class='item'>");
                      var rating = results[i].rating;
                      var p = $("<p>").text("Rating: " + rating);
                      var gifImg = $("<img>");

                      gifImg.addClass("giphy")
                      gifImg.addClass("playing")
                      gifImg.attr("src", results[i].images.fixed_height.url);
                      gifDiv.append(p);
                      gifDiv.append(gifImg);
                      $("#gifs").prepend(gifDiv);
                  }
              }
          });
  });
  //stops/starts gifs(doesn't work :( )
  $(".giphy").on("click", function() {
      var src = $(this).attr("src");
    if($(this).hasClass("playing")){
       //stop
       $(this).attr("src", src.replace(/\.gif/i, "_s.gif"))
       $(this).removeClass("playing");
    } else {
      //play
      $(this).addClass("playing");
      $(this).attr("src", src.replace(/\_s.gif/i, ".gif"))
    }
  });
});