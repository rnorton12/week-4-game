// the following variables are used to elevate the characters role.
// all characters begin the game as generic and then are elevated
// to the other roles as the user makes choices
var genericCharacter = 1;
var yourCharacter = 2;
var enemyCharacter = 3;
var defenderCharacter = 4;

// keep track if games is over and user has to restart game
var isGameOver = false;

// contains the properties for each character.
// each character begins as a generic character
var characterObject = {
    character_one: {
        characterType: genericCharacter,
        id: "button-1",
        class: "character-button btn btn-light border border-dark",
        type: "button",
        name: "Bugs Bunny",
        sound: new Audio("./assets/sounds/1942 - Bugs Bunny says What's up doc.mp3"), // buffers automatically when created
        powers: {
            health_points: 175,
            attack_power: 9,
            counter_attack_power: 16
        },
        image: {
            id: "image-1",
            source: "./assets/images/ico-bugs-bunny.jpg",
            class: "img-thumbnail",
            alt: "bugs bunny",
            width: "75px",
            height: "75px"
        }
    },

    character_two: {
        characterType: genericCharacter,
        id: "button-2",
        class: "character-button btn btn-light border border-dark",
        type: "button",
        name: "Daffy Duck",
        sound: new Audio("./assets/sounds/Daffy duck laughing sound effect looney tunes.mp3"), // buffers automatically when created
        powers: {
            health_points: 100,
            attack_power: 3,
            counter_attack_power: 7
        },
        image: {
            id: "image-2",
            source: "./assets/images/ico-daffy-duck.jpg",
            class: "img-thumbnail",
            alt: "daffy duck",
            width: "75px",
            height: "75px"
        }
    },

    character_three: {
        characterType: genericCharacter,
        id: "button-3",
        class: "character-button btn btn-light border border-dark",
        type: "button",
        name: "Tweety Bird",
        sound: new Audio("./assets/sounds/I Tawt I Taw a Puddy Tat.mp3"), // buffers automatically when created
        powers: {
            health_points: 200,
            attack_power: 10,
            counter_attack_power: 18
        },
        image: {
            id: "image-3",
            source: "./assets/images/ico-tweety-bird.jpg",
            class: "img-thumbnail",
            alt: "tweety bird",
            width: "75px",
            height: "75px"
        }
    },

    character_four: {
        characterType: genericCharacter,
        id: "button-4",
        class: "character-button btn btn-light border border-dark",
        type: "button",
        name: "Sylvestor",
        sound: new Audio("./assets/sounds/Sylvester - Sufferin Succotash.mp3"), // buffers automatically when created
        powers: {
            health_points: 150,
            attack_power: 4,
            counter_attack_power: 10
        },
        image: {
            id: "image-4",
            source: "./assets/images/ico-sylvester.jpg",
            class: "img-thumbnail",
            alt: "sylvester",
            width: "75px",
            height: "75px"
        }
    }
} // end var characterObject

// an array containing properties for each character
var characterItems = [
    characterObject.character_one,
    characterObject.character_two,
    characterObject.character_three,
    characterObject.character_four
];

// keeps track of the number of enemies left to fight
var enemiesLeft = 0;

// contains properties for the user's character, the attacker
var attackerObject = {
    id: "",
    health_points: 0,
    health_points_id: "", // id of the character's bottom caption of the figure. used to update health points
    start_attack_power: 0, // attackers initial attack power
    next_attack_power: 0 // attackers progressive attack power
}

// contains properties for the current defender character
var defenderObject = {
    id: "",
    health_points: 0,
    health_points_id: "", // id of the character's bottom caption of the figure. used to update health points
    counter_attack_power: 0
}

$(document).ready(function () {

    // generate the web page content for the character objects.
    // this occurs only once at the start of each new game
    function generateCharacters() {
        for (var i = 0; i < characterItems.length; i++) {
            // Create a new button element
            var elementBtn = $("<button>"); //Equivalent: $(document.createElement('button'))
            elementBtn.attr("id", characterItems[i].id); // set the button id
            elementBtn.addClass(characterItems[i].class + " bg-light"); // set the class
            elementBtn.attr("type", characterItems[i].type); // set the bootstrap "type" attribute

            // add a figure to the button element.
            // the figure will contain the character's image
            var figure = $("<figure>");
            figure.attr("id", "figure-" + characterItems[i].id);
            figure.addClass("figure");

            // add a caption to the top of the character image.
            // the top caption will contain the name of the character
            var figCaptionTop = $("<figcaption>");
            figCaptionTop.addClass("figure-caption"); // set the class
            figCaptionTop.html(characterItems[i].name);

            // add a caption to the bottom of the character image.
            // the bottom caption will contain the characters starting health points
            var figCaptionBottom = $("<figcaption>");
            figCaptionBottom.attr("id", "bottom-caption-figure" + characterItems[i].id); // set an id for the caption so it can be referenced later
            figCaptionBottom.addClass("figure-caption");
            figCaptionBottom.html(characterItems[i].powers.health_points);

            // Add and image to the button element
            var image = $("<img>"); //Equivalent: $(document.createElement('img'))
            image.attr("id", characterItems[i].image.id); // set the image id
            image.addClass(characterItems[i].image.class); // set the class  
            image.attr("src", characterItems[i].image.source); // set the "src" attribute 
            image.attr("alt", characterItems[i].image.alt); // set the "alt" attribute

            // had to define the width and height attributes this way because .animate()
            // would change them into an inline block
            var tempStr = "display: inline-block; width: " +
                characterItems[i].image.width + "; height: " +
                characterItems[i].image.height + ";"
            image.attr("style", tempStr); // set the style attribute

            // append the button to the "#characters-area" div
            $("#characters-area").append(elementBtn);

            // append the figure to the button 
            $("#" + characterItems[i].id).append(figure);

            // append the figure top caption to the figure
            $("#" + "figure-" + characterItems[i].id).append(figCaptionTop);

            // append the image to the figure
            $("#" + "figure-" + characterItems[i].id).append(image);

            // append the figure bottom caption to the figure
            $("#" + "figure-" + characterItems[i].id).append(figCaptionBottom);

            // set the heading for the html area where the character images will be shown
            $("#characters-available").html("Available Characters");

        }
    } // end function generateCharacters()

    // When user selects their character (the attacker) it will be removed from the
    // available characters area and place into the "your character area".  All other
    // characters will be removed from the available characters area and placed into the
    // enemy area.  The user will then need to select a character from the enemy area to become
    // the defender.  That selected character will be removed from the enemy area and placed
    // into the defender area.
    function updateCharacterType(selectedCharacter) {
        var tempObj = null; // temporary jQuery object

        if (selectedCharacter.characterType === genericCharacter) {

            // change character types
            for (var i = 0; i < characterItems.length; i++) {
                if (selectedCharacter === characterItems[i]) {

                    // change selected character type to your character
                    // this will be the attacker
                    characterItems[i].characterType = yourCharacter;

                    // move the selected character to the "#your-character" div
                    tempObj = $("#" + characterItems[i].id).detach();
                    tempObj.appendTo("#selected-character-area");

                    // set html text
                    $("#selected-character").html("Your Character");
                    $("#characters-available").html("");

                    // copy the selected characters id, health_points and attack power to the attacker object
                    attackerObject.id = selectedCharacter.id;
                    attackerObject.health_points = selectedCharacter.powers.health_points;
                    attackerObject.health_points_id = "bottom-caption-figure" + selectedCharacter.id;
                    attackerObject.start_attack_power = selectedCharacter.powers.attack_power;
                    attackerObject.next_attack_power = 0;

                } else {
                    // change character type to enemy
                    // these characters will become available defenders to choose from
                    characterItems[i].characterType = enemyCharacter;

                    // note: The .detach() method is the same as .remove(), except that
                    // .detach() keeps all jQuery data associated with the removed elements.
                    // This method is useful when removed elements are to be reinserted into the DOM at a later time.
                    // .detach() returns a jQuery object that contains a collection of Document Object Model (DOM) 
                    // elements that have been created from an HTML string or selected from a document.
                    // move the characters to the "#enemies-area" div
                    tempObj = $("#" + characterItems[i].id).detach();
                    tempObj.appendTo("#enemies-area");

                    // set html text
                    $("#enemies-available").html("Enemies Available to Attack");

                    // increment enemies left by 1
                    enemiesLeft++;
                }

            }
        } else if (selectedCharacter.characterType === enemyCharacter) {
            // the user selected one of the enemy characters to become the defender
            // check if a defender has already been selected
            if (defenderObject.id.length === 0) {
                // defender space available
                for (var i = 0; i < characterItems.length; i++) {
                    if (selectedCharacter === characterItems[i]) {
                        // change selected character type to defender
                        characterItems[i].characterType = defenderCharacter;

                        // note: The .detach() method is the same as .remove(), except that
                        // .detach() keeps all jQuery data associated with the removed elements.
                        // This method is useful when removed elements are to be reinserted into the DOM at a later time.
                        // .detach() returns a jQuery object that contains a collection of Document Object Model (DOM) 
                        // elements that have been created from an HTML string or selected from a document.
                        // move the selected character to the "#defender-area" div
                        tempObj = $("#" + characterItems[i].id).detach();
                        tempObj.appendTo("#defender-area");

                        // set html text
                        $("#defender").html("Defender");

                        // copy the selected characters id, health_points and counter_attack power to the defender object
                        defenderObject.id = selectedCharacter.id;
                        defenderObject.health_points = selectedCharacter.powers.health_points;
                        defenderObject.health_points_id = "bottom-caption-figure" + selectedCharacter.id;
                        defenderObject.counter_attack_power = selectedCharacter.powers.counter_attack_power;

                        // decrement enemies left by 1
                        enemiesLeft--;

                        if (enemiesLeft <= 0) {
                            $("#enemies-available").html(""); // blank out heading
                        }
                    }
                }
            }

        }
    } // end function updateCharacterType(selectedCharacter)

    // this functions will execute first time page is loaded
    generateCharacters();

    // button handlers
    // on click handler for character one
    $("#" + characterItems[0].id).on("click", function () {
        characterItems[0].sound.play();
        updateCharacterType(characterItems[0]);
    });

    // on click handler for character two
    $("#" + characterItems[1].id).on("click", function () {
        characterItems[1].sound.play();
        updateCharacterType(characterItems[1]);
    });

    // on click handler for character three
    $("#" + characterItems[2].id).on("click", function () {
        characterItems[2].sound.play();
        updateCharacterType(characterItems[2]);

    });

    // on click handler for character four
    $("#" + characterItems[3].id).on("click", function () {
        characterItems[3].sound.play();
        updateCharacterType(characterItems[3]);
    });

    // on click handler for the attack button
    $(".attack").on("click", function () {

        $("multi-purpose-text").html("");

        if (isGameOver) {
            $("#multi-purpose-text").html("You need to restart the game");
        } else {
            if ((attackerObject.id.length) && (defenderObject.id.length)) {
                // update display with current stats
                $("#attacker-health").html(attackerObject.health_points);
                $("#defender-health").html(defenderObject.health_points);

                // attack the defender
                // attackers attack power will start with initial attack power and then progressively increase after each attack
                attackerObject.next_attack_power += attackerObject.start_attack_power;

                // subtract attacker's attack power from the defenders health points
                defenderObject.health_points -= attackerObject.next_attack_power;

                // update attacker damage to defender
                $("#attacker-damage-to-defender").html("The attacker did " + attackerObject.next_attack_power + " points of damage");
                // defender counter attacks
                attackerObject.health_points -= defenderObject.counter_attack_power;

                // update defender damage to attacker
                // update attacker damage to defender
                $("#defender-damage-to-attacker").html("The defender did " + defenderObject.counter_attack_power + " points of damage");

                // update display with current stats
                $("#" + attackerObject.health_points_id).html(attackerObject.health_points);
                $("#" + defenderObject.health_points_id).html(defenderObject.health_points);

                // check to see if we have a winner
                if ((attackerObject.health_points <= 0) && (defenderObject.health_points <= 0)) {
                    // have a tie
                    $("#multi-purpose-text").html("YOU TIED!");

                    // set game over to true
                    isGameOver = true;

                    // clear defender object
                    defenderObject.id = "";

                    // clear the attacker object
                    attackerObject.id = "";

                } else if (defenderObject.health_points <= 0) {
                    // you won
                    $("#multi-purpose-text").html("YOU WON!");

                    // remove the defender
                    // i am using .remove() here instead of .detach()
                    // because I don't plan to use the character again
                    $("#" + defenderObject.id).remove();

                    // clear the defender object
                    defenderObject.id = "";

                    if (enemiesLeft <= 0) {
                        // set game over to true
                        isGameOver = true;

                        // clear html text
                        $("#defender").html("");
                    }
                } else if (attackerObject.health_points <= 0) {
                    // you lost
                    $("#multi-purpose-text").html("YOU LOST!");

                    // remove the attacker
                    // i am using .remove() here instead of .detach()
                    // because I don't plan to use the character again
                    $("#" + attackerObject.id).remove();

                    // clear the attacker object
                    attackerObject.id = "";

                    // clear the defender object because game is over
                    defenderObject.id == "";

                    // set game over to true
                    isGameOver = true;

                    // clear html text
                    $("#selected-character").html("");
                } else {
                    // keep playing
                }
            } else if (attackerObject.id.length) {
                // display select a defender
                $("#multi-purpose-text").html("select defender");
            } else {
                // display select an attacker
                $("#multi-purpose-text").html("select attacker");
            } // end if ((attackerObject.id.length) && (defenderObject.id.length))
        } // end  if (isGameOver)
    }); // $(".attack").on("click", function ()

    // on click handler for the restart button
    $(".restart").on("click", function () {
        location.reload();
    });
});