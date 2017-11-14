var genericCharacter = 1;
var yourCharacter = 2;
var enemyCharacter = 3;
var defenderCharacter = 4;
var isGameOver = false;

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
}

characterItems = [
    characterObject.character_one,
    characterObject.character_two,
    characterObject.character_three,
    characterObject.character_four
];

var enemiesLeft = 0;

var attackerObject = {
    id: "",
    health_points: 0,
    health_points_id: "", // id the of the character's bottom caption of the figure
    start_attack_power: 0, // attackers initial attack power
    next_attack_power: 0 // attackers progressive attack power
}

var defenderObject = {
    id: "",
    health_points: 0,
    health_points_id: "", // id the of the character's bottom caption of the figure
    counter_attack_power: 0
}

$(document).ready(function () {

    function generateCharacters() {
        for (var i = 0; i < characterItems.length; i++) {
            // Create a new button element
            var elementBtn = $("<button>"); //Equivalent: $(document.createElement('button'))
            elementBtn.attr("id", characterItems[i].id);
            elementBtn.addClass(characterItems[i].class + " bg-light"); // set the class
            elementBtn.attr("type", characterItems[i].type); // set the bootstrap "type" attribute

            // add a figure to the button element
            var figure = $("<figure>");
            figure.attr("id", "figure-" + characterItems[i].id );
            figure.addClass("figure");

            
            var figCaptionTop = $("<figcaption>");
            figCaptionTop.addClass("figure-caption");
            figCaptionTop.html(characterItems[i].name);

            var figCaptionBottom = $("<figcaption>");
            figCaptionBottom.attr("id", "bottom-caption-figure" + characterItems[i].id);
            figCaptionBottom.addClass("figure-caption");
            figCaptionBottom.html(characterItems[i].powers.health_points);
            
            // Add and image to the button element
            var image = $("<img>"); //Equivalent: $(document.createElement('img'))
            image.attr("id", characterItems[i].image.id);
            image.addClass(characterItems[i].image.class); // set the class  
            image.attr("src", characterItems[i].image.source); // set the "src" attribute 
            image.attr("alt", characterItems[i].image.alt); // set the "alt" attribute

            // had to define the width and height attributes this way because .animate()
            // would change them into an inline block
            var tempStr = "display: inline-block; width: " +
                characterItems[i].image.width + "; height: " +
                characterItems[i].image.height + ";"
            image.attr("style", tempStr); // set the style attribute

            // append the button to the "#characters" div
            $("#characters-area").append(elementBtn);

            // append the figure to the button 
            $("#" + characterItems[i].id).append(figure);

             // append the figure caption to the figure
             $("#" + "figure-" + characterItems[i].id).append(figCaptionTop);

            // append the image to the figure
            $("#" + "figure-" + characterItems[i].id).append(image);

             // append the figure caption to the figure
             $("#" + "figure-" + characterItems[i].id).append(figCaptionBottom);

             // set the html text
             $("#characters-available").html("Available Characters");
           
        }
    }

    function updateCharacterType(selectedCharacter) {
        var temp1 = null;
        console.log("updateCharacterType");
        if (selectedCharacter.characterType === genericCharacter) {

            // change character types
            for (var i = 0; i < characterItems.length; i++) {
                if (selectedCharacter === characterItems[i]) {

                    // change selected character type to your character
                    // this will be the attacker
                    characterItems[i].characterType = yourCharacter;

                    // move the selected character to the "#your-character" div
                    temp1 = $("#" + characterItems[i].id).detach();
                    temp1.appendTo("#selected-character-area");

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
                    // these will become available defenders to choose from
                    characterItems[i].characterType = enemyCharacter;

                    // move the characters to the "#enemies" div
                    temp1 = $("#" + characterItems[i].id).detach();
                    temp1.appendTo("#enemies-area");

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
                // defneder space available
                for (var i = 0; i < characterItems.length; i++) {
                    if (selectedCharacter === characterItems[i]) {
                        // change selected character type to defender
                        characterItems[i].characterType = defenderCharacter;

                        // move the selected character to the "#defender" div
                        temp1 = $("#" + characterItems[i].id).detach();
                        temp1.appendTo("#defender-area");

                         // set html text
                        $("#defender").html("Defender");

                        // copy the selected characters id, health_points and counter_attack power to the defender object
                        defenderObject.id = selectedCharacter.id;
                        defenderObject.health_points = selectedCharacter.powers.health_points;
                        defenderObject.health_points_id = "bottom-caption-figure" + selectedCharacter.id;
                        defenderObject.counter_attack_power = selectedCharacter.powers.counter_attack_power;

                        // decrement enemies left by 1
                        enemiesLeft--;
                    }
                }
            }

        }
    }

    generateCharacters();

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

                // substract attacker's attack power from the defenders health points
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
                    isGameOver = true;
                } else if (defenderObject.health_points <= 0) {
                    // you won
                    $("#multi-purpose-text").html("YOU WON!");
                    // remove the defender
                    $("#" + defenderObject.id).remove();
                    // clear the defender object
                    defenderObject.id = "";
                    // decrement enemiesLeft by 1
                    //enemiesLeft--;
                    if (enemiesLeft < 0) {
                        isGameOver = true;
                    }
                } else if (attackerObject.health_points <= 0) {
                    // you lost
                    $("#multi-purpose-text").html("YOU LOST!");
                    isGameOver = true;
                } else {
                    // keep playing
                }
            } else if (attackerObject.id.length) {
                // display select a defender
                $("#multi-purpose-text").html("select defender");
            } else {
                // display select an attacker
                $("#multi-purpose-text").html("select attacker");
            }
        }
    });

    // on click handler for the restart button
    $(".restart").on("click", function () {
        location.reload();
    });

　
　
});
