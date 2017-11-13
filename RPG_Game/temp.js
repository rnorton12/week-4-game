var genericCharacter = 1;
var yourCharacter = 2;
var enemyCharacter = 3;
var defenderCharacter = 4;
var isGameOver = false;

var characterObject = {
    character_one: {
        characterType: genericCharacter,
        id: "button-1",
        class: "character-button btn btn-light",
        type: "button",
        name: "char 1",
        locationDiv: "characters",
        powers: {
            health_points: 175,
            attack_power: 7,
            counter_attack_power: 14
        },
        image: {
            id: "image-1",
            source: "./assets/images/crystal1.png",
            class: "img-fluid",
            alt: "character 1",
            width: "75px",
            height: "75px"
        }
    },

    character_two: {
        characterType: genericCharacter,
        id: "button-2",
        class: "character-button btn btn-light",
        type: "button",
        name: "char 2",
        locationDiv: "characters",
        powers: {
            health_points: 100,
            attack_power: 3,
            counter_attack_power: 12
        },
        image: {
            id: "image-2",
            source: "./assets/images/crystal1.png",
            class: "img-fluid",
            alt: "character 2",
            width: "75px",
            height: "75px"
        }
    },

    character_three: {
        characterType: genericCharacter,
        id: "button-3",
        class: "character-button btn btn-light",
        type: "button",
        name: "char 3",
        locationDiv: "characters",
        powers: {
            health_points: 200,
            attack_power: 3,
            counter_attack_power: 25
        },
        image: {
            id: "image-3",
            source: "./assets/images/crystal1.png",
            class: "img-fluid",
            alt: "character 3",
            width: "75px",
            height: "75px"
        }
    },

    character_four: {
        characterType: genericCharacter,
        id: "button-4",
        class: "character-button btn btn-light",
        type: "button",
        name: "char 1",
        locationDiv: "characters",
        powers: {
            health_points: 150,
            attack_power: 8,
            counter_attack_power: 20
        },
        image: {
            id: "image-4",
            source: "./assets/images/crystal1.png",
            class: "img-fluid",
            alt: "character 4",
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
    health_point: 0,
    start_attack_power: 0, // attackers initial attack power
    next_attack_power: 0 // attackers progressive attack power
}

var defenderObject = {
    id: "",
    health_points: 0,
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
            elementBtn.html(characterItems[i].powers.health_points);
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

            // append the crystal button to the "#crystals" div
            var divId = "";
            if (characterItems[i].characterType === yourCharacter) {
                divId = "your-character";
            } else if (characterItems[i].characterType === enemyCharacter) {
                divId = "enemies";
            } else if (characterItems[i].characterType === defenderCharacter) {
                divId = "defender";
            } else {
                divId = "characters";
            }
            $("#" + divId).append(elementBtn);

            // append the image to the crystal button
            $("#" + characterItems[i].id).append(image);
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
                    temp1.appendTo("#your-character");

                    // copy the selected characters id, health_points and attack power to the attacker object
                    attackerObject.id = selectedCharacter.id;
                    attackerObject.health_points = selectedCharacter.powers.health_points;
                    attackerObject.start_attack_power = selectedCharacter.powers.attack_power;
                    attackerObject.next_attack_power = 0;

                } else {
                    // change character type to enemy
                    // these will become available defenders to choose from
                    characterItems[i].characterType = enemyCharacter;

                    // move the characters to the "#enemies" div
                    temp1 = $("#" + characterItems[i].id).detach();
                    temp1.appendTo("#enemies");

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
                        temp1.appendTo("#defender");

                        // copy the selected characters id, health_points and counter_attack power to the defender object
                        defenderObject.id = selectedCharacter.id;
                        defenderObject.health_points = selectedCharacter.powers.health_points;
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
        console.log("char 1");
        updateCharacterType(characterItems[0]);
    });

    // on click handler for character two
    $("#" + characterItems[1].id).on("click", function () {
        console.log("char 2");
        updateCharacterType(characterItems[1]);
    });

    // on click handler for character three
    $("#" + characterItems[2].id).on("click", function () {
        console.log("char 3");
        updateCharacterType(characterItems[2]);

    });

    // on click handler for character four
    $("#" + characterItems[3].id).on("click", function () {
        console.log("char 4");
        updateCharacterType(characterItems[3]);
    });

    // on click handler for the attack button
    $(".attack").on("click", function () {

        $("#select-attacker").html("");
        $("#select-defender").html("");
        $("#restart-game").html("");
        $("#results").html("");

        if (isGameOver) {
            $("#restart-game").html("need to restart the game");
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

                // update defender dame to attacker
                // update attacker damage to defender
                $("#defender-damage-to-attacker").html("The defender did " + defenderObject.counter_attack_power + " points of damage");

                // update display with current stats
                $("#attacker-health").html(attackerObject.health_points);
                $("#defender-health").html(defenderObject.health_points);

                // check to see if we have a winner
                if ((attackerObject.health_points <= 0) && (defenderObject.health_points <= 0)) {
                    // have a tie
                    $("#results").html("YOU TIED!");
                    isGameOver = true;
                } else if (defenderObject.health_points <= 0) {
                    // you won
                    $("#results").html("YOU WIN!");
                    // remove the defender
                    $("#" + defenderObject.id).remove();
                    // clear the defender object
                    defenderObject.id = "";
                    // decrement enemiesLeft by 1
                    enemiesLeft--;
                    if (enemiesLeft < 0) {
                        isGameOver = true;
                    }
                } else if (attackerObject.health_points <= 0) {
                    // you lost
                    $("#results").html("YOU LOST!");
                    isGameOver = true;
                } else {
                    // keep playing
                }
            } else if (attackerObject.id.length) {
                // display select a defender
                $("#select-defender").html("select defender");
            } else {
                // display select an attacker
                $("#select-attacker").html("select attacker");
            }
        }
    });

    // on click handler for the restart button
    $(".restart").on("click", function () {
        location.reload();
    });

　
　
});
