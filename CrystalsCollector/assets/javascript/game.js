// The player will have to guess the answer, just like in Hangman. This time, though, the player will guess with numbers instead of letters. 
// Here's how the app works:

// There will be four crystals displayed as buttons on the page.
// The player will be shown a random number at the start of the game.

// When the player clicks on a crystal, it will add a specific amount of points to the player's total score. 

// Your game will hide this amount until the player clicks a crystal.
// When they do click one, update the player's score counter.

// The player wins if their total score matches the random number from the beginning of the game.
// The player loses if their score goes above the random number.

// The game restarts whenever the player wins or loses.

// When the game begins again, the player should see a new random number. Also, all the crystals will have four new hidden values. Of course, the user's score (and score counter) will reset to zero.

// The app should show the number of games the player wins and loses. To that end, do not refresh the page as a means to restart the game.

// Option 1 Game design notes

// The random number shown at the start of the game should be between 19 - 120.
// Each crystal should have a random hidden value between 1 - 12. 

// =======================================================================================

// psuedo code

var targetNumRange = [19, 120];
var crystalNumRange = [1, 12];
var targetNum = 0;
var numCrystals = 4;
var crystalNums = []; // random number for each crystal
var totalScore = 0;

$(document).ready(function() {
    
    // To generate random numbers from a given range, follow the steps below:
    // 1) Get number between 0.0 and 1.0 from random() method.
    // 2) Multiply it with the difference of upper value and one less than the lower value of the range.
    // 3) Use floor() to convert it into an integer
    // 4) Add the lower value of the range
    function getRandomNumber(start, finish) {
        return (Math.floor((finish - (start - 1))*Math.random()) + start);
    }

    // reset the game
    function resetGame() {

    }
    
    // generate a random number between targetNumRange.
    // display the random number to the user at the start of the game
    var targetNum = getRandomNumber(targetNumRange[0], targetNumRange[1]);
    console.log("targetNum = " + targetNum);
    $("#number-to-match").text(targetNum);

    for (var i = 0; i < numCrystals; i++) {
        // generate a random number for crystal 1 between crystalNumRange
        crystalNums.push(getRandomNumber(crystalNumRange[0], crystalNumRange[1]));
        
        // Create a variable named "crystalBtn" equal to $("<button>");
        var crystalBtn = $("<button>");
         
        // Then give each "crystalBtn" the following classes: "crystal-button".
        crystalBtn.addClass("crystal-button");

        // Each crystal will be given a data attribute to store the crystals
        // random value.
        crystalBtn.attr("data-crystalvalue", crystalNums[i]);

        // Then give each "letterBtns" a text equal to the crystals value".
        crystalBtn.text(crystalNums[i]);

        // Finally, append each "crystalBtn" to the "#crystals" div.
        $("#crystals").append(crystalBtn);
    }

    // The click event applies to each crystal on the page. Not just one.
    $(".crystal-button").on("click", function() {
        
        // Determining the crystal's value requires us to extract the value from the data attribute.
        // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
        // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
        // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter
        
        var crystalValue = ($(this).attr("data-crystalvalue"));
        crystalValue = parseInt(crystalValue);

        // Add the crystalValue to the total score.
        totalScore += crystalValue;

        $("#totalScore").text("Total Score = " + totalScore);
           
        if (totalScore === targetNum) {
        alert("You win!");
        }
    
        else if (totalScore >= targetNum) {
        alert("You lose!!");
        }
        
    });
    
}); // $(document).ready(function()
