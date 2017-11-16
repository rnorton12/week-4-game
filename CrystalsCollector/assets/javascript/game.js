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

var targetNumRange = [19, 120];
var crystalNumRange = [1, 12];
var targetNum = 0;
var numCrystals = 4;
var crystalNums = []; // random number for each crystal
var totalScore = 0;
var wins = 0;
var losses = 0;
var buttonClicks = 0;

var crystalObjects = {
    crystalOne: {
        id: "button1",
        class: "crystal-button btn btn-light",
        type: "button",
        value: 0,
        image: {
            id: "crystal-1",
            source: "./assets/images/crystal1.png",
            class: "img-fluid",
            alt: "crystal 1",
            width: "75px",
            height: "75px"
        }
    },
    crystalTwo: {
        id: "button2",
        class: "crystal-button btn btn-light",
        type: "button",
        value: 0,
        image: {
            id: "crystal-2",
            source: "./assets/images/crystal2.png",
            class: "img-fluid",
            alt: "crystal 2",
            width: "75px",
            height: "75px"
        }
    },
    crystalThree: {
        id: "button3",
        class: "crystal-button btn btn-light",
        type: "button",
        value: 0,
        image: {
            id: "crystal-3",
            source: "./assets/images/crystal3.png",
            class: "img-fluid",
            alt: "crystal 3",
            width: "75px",
            height: "75px"
        }
    },
    crystalFour: {
        id: "button4",
        class: "crystal-button btn btn-light",
        type: "button",
        value: 0,
        image: {
            id: "crystal-4",
            source: "./assets/images/crystal4.png",
            class: "img-fluid",
            alt: "crystal 4",
            width: "75px",
            height: "75px"
        }
    }
}

crystalItems = [
    crystalObjects.crystalOne,
    crystalObjects.crystalTwo,
    crystalObjects.crystalThree,
    crystalObjects.crystalFour
];

$(document).ready(function () {

    // To generate random numbers from a given range, follow the steps below:
    // 1) Get number between 0.0 and 1.0 from random() method.
    // 2) Multiply it with the difference of upper value and one less than the lower value of the range.
    // 3) Use floor() to convert it into an integer
    // 4) Add the lower value of the range
    function getRandomNumber(start, finish) {
        return (Math.floor((finish - (start - 1)) * Math.random()) + start);
    }

    // generate a random number between targetNumRange.
    // display the random number to the user at the start of the game
    function generateNumberToGuess() {
        targetNum = getRandomNumber(targetNumRange[0], targetNumRange[1]);
        console.log("targetNum = " + targetNum);
        $("#number-to-match").text(targetNum);
    }

    // generate a random value for the crystal object
    function generateCrystalValue() {
        return (getRandomNumber(crystalNumRange[0], crystalNumRange[1]));
    }

    function updateCrystalValues() {
        for (var i = 0; i < crystalItems.length; i++) {
            crystalItems[i].value = generateCrystalValue();
            $("#" + crystalItems[i].id).attr("value", crystalItems[i].value);

            console.log("Crystal " + (i + 1) + " has the value: " + crystalItems[i].value);
        }
    }

    function generateCrystals() {
        for (var i = 0; i < crystalItems.length; i++) {
            // Create a new button element
            var crystalBtn = $("<button>"); //Equivalent: $(document.createElement('button'))
            crystalBtn.attr("id", crystalItems[i].id);
            crystalBtn.addClass(crystalItems[i].class + " bg-light"); // set the class
            crystalBtn.attr("type", crystalItems[i].type); // set the bootstrap "type" attribute


            // generate a random value for the crystal object
            crystalItems[i].value = generateCrystalValue();
            crystalBtn.attr("value", crystalItems[i].value) // set the "value" attribute
            console.log("Crystal " + (i + 1) + " has the value: " + crystalItems[i].value);

            // Add and image to the button element
            var image = $("<img>"); //Equivalent: $(document.createElement('img'))
            image.attr("id", crystalItems[i].image.id);
            image.addClass(crystalItems[i].image.class); // set the class  
            image.attr("src", crystalItems[i].image.source); // set the "src" attribute 
            image.attr("alt", crystalItems[i].image.alt); // set the "alt" attribute

            // had define the width and height attributes this way because .animate()
            // would change them into an inline block
            var tempStr = "display: inline-block; width: " +
                crystalItems[i].image.width + "; height: " +
                crystalItems[i].image.height + ";"
            image.attr("style", tempStr); // set the style attribute

            // append the crystal button to the "#crystals" div
            $("#crystals").append(crystalBtn);

            // append the image to the crystal button
            $("#" + crystalItems[i].id).append(image);
        }
    }

    function updateStatistics() {
        // update the total score
        $("#total-score").text(totalScore);
        console.log("totalScore = " + totalScore);

        // update the wins
        $("#wins").text(wins);
        console.log("wins = " + wins);

        // update the the losses
        $("#losses").text(losses);
        console.log("losses = " + losses);
    }

    // start new Game
    function startNewGame() {
        totalScore = 0;
        buttonClicks = 0;
        generateNumberToGuess();
        updateCrystalValues();
        updateStatistics();
    }

    // expand crystal image size (width and height) using
    // Jquery .animate()
    function expandCrystalImage(crystalImage) {
        // get the current width and height the crystal image
        var cWidth = parseFloat(crystalImage.width);
        var cHeight = parseFloat(crystalImage.height);

        // set new height and width a percentage larger
        var nWidth = cWidth + (cWidth * 0.15);
        var nHeight = cHeight + (cHeight * 0.15);

        // update the html
        $("#" + crystalImage.id).animate({
            width: nWidth.toString(),
            height: nHeight.toString()
        });
    }

    // returns the crystal image to its original size (width and height)
    // using Jquery .animate()
    function restoreCrystalImage(crystalImage) {
        // update the html
        $("#" + crystalImage.id).animate({
            width: crystalImage.width,
            height: crystalImage.height
        });
    }

    // these function will execute first time page loaded
    generateNumberToGuess();
    generateCrystals();
    updateStatistics();

    // The click event applies to each crystal on the page. Not just one.
    $(".crystal-button").on("click", function () {

        buttonClicks++; // increment button clicks by 1

        // Determining the crystal's value requires us to extract the value from the value attribute.
        // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
        // Using the .attr("value") allows us to grab the attribute value.
        // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter

        var crystalValue = ($(this).attr("value"));
        crystalValue = parseInt(crystalValue);
        console.log("crystalValue = " + crystalValue);

        // Add the crystalValue to the total score.
        totalScore += crystalValue;

        if (totalScore === targetNum) {
            // you win - increment wins by 1
            wins++;
            startNewGame();
        } else if (totalScore >= targetNum) {
            // you lose - increment losses by 1
            losses++;
            startNewGame();
        }

        updateStatistics();
    });

    // define a mouse enter event for crystal 1
    $("#" + crystalItems[0].id).mouseenter(function () {
        expandCrystalImage(crystalItems[0].image);
    });

    // define a mouse leave event for crystal 1
    $("#" + crystalItems[0].id).mouseleave(function () {
        restoreCrystalImage(crystalItems[0].image);
    });

     // define a mouse enter event for crystal 2
     $("#" + crystalItems[1].id).mouseenter(function () {
        expandCrystalImage(crystalItems[1].image);
    });

    // define a mouse leave event for crystal 2
    $("#" + crystalItems[1].id).mouseleave(function () {
        restoreCrystalImage(crystalItems[1].image);
    });

     // define a mouse enter event for crystal 3
     $("#" + crystalItems[2].id).mouseenter(function () {
        expandCrystalImage(crystalItems[2].image);
    });

    // define a mouse leave event for crystal 3
    $("#" + crystalItems[2].id).mouseleave(function () {
        restoreCrystalImage(crystalItems[2].image);
    });

     // define a mouse enter event for crystal 4
     $("#" + crystalItems[3].id).mouseenter(function () {
        expandCrystalImage(crystalItems[3].image);
    });

    // define a mouse leave event for crystal 4
    $("#" + crystalItems[3].id).mouseleave(function () {
        restoreCrystalImage(crystalItems[3].image);
    });
}); // $(document).ready(function()