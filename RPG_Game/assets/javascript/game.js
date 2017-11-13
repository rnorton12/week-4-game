var genericCharacter = 1;
var yourCharacter = 2;
var enemyCharacter = 3;
var defenderCharacter = 4;
var attacker = null;
var defender = null;
var attackPower = 0;

var characterObject = {
    character_one: {
        characterType: genericCharacter,
        id: "button-1",
        class: "character-button btn btn-light",
        type: "button",
        name: "char 1",
        locationDiv: "characters",
        powers: {
            health_points: 125,
            attack_power: 5,
            counter_attack_power: 6
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
            attack_power: 5,
            counter_attack_power: 6
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
            attack_power: 5,
            counter_attack_power: 6
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
            attack_power: 5,
            counter_attack_power: 6
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
                    characterItems[i].characterType = yourCharacter;
                    temp1 = $("#" + characterItems[i].id).detach();
                    temp1.appendTo("#your-character");
                    attacker = selectedCharacter;
                } else {
                    // change character type to enemy
                    characterItems[i].characterType = enemyCharacter;
                    temp1 = $("#" + characterItems[i].id).detach();
                    temp1.appendTo("#enemies");
                }

            }
            // remove all the characters
            //detachedElements = $( ".character-button" ).detach();
            // generate characters at new location divs
            //  generateCharacters();
        } else if (selectedCharacter.characterType === enemyCharacter) {
            var isDefender = false;
            // check to see if we already have a defender
            for (var i = 0; i < characterItems.length; i++) {
                if (characterItems[i].characterType === defenderCharacter) {
                    // already have a defender
                    isDefender = true;
                    break;
                }
            }
            if (isDefender === false) {
                for (var i = 0; i < characterItems.length; i++) {
                    if (selectedCharacter === characterItems[i]) {
                        // change selected character type to defender
                        characterItems[i].characterType = defenderCharacter;
                        temp1 = $("#" + characterItems[i].id).detach();
                        temp1.appendTo("#defender");
                        defender = selectedCharacter;
                    }
                }
            }

            // remove all the characters
            // detachedElements = $( ".character-button" ).detach();
            // generate characters at new location divs
            //     generateCharacters();
        }
    }

    generateCharacters();

    $("#" + characterItems[0].id).on("click", function () {
        console.log("char 1");
        updateCharacterType(characterItems[0]);
    });

    $("#" + characterItems[1].id).on("click", function () {
        console.log("char 2");
        updateCharacterType(characterItems[1]);
    });

    $("#" + characterItems[2].id).on("click", function () {
        console.log("char 3");
        updateCharacterType(characterItems[2]);

    });

    $("#" + characterItems[3].id).on("click", function () {
        console.log("char 4");
        updateCharacterType(characterItems[3]);
    });


    $(".attack").on("click", function () {
        console.log("attack");
   
        attackPower += attacker.powers.attack_power;
        // attack
        defender.powers.health_points -= attackPower;
        $("#attack-power").html("attack power: " + attackPower);

        $("#" + defender.id).html(defender.powers.health_points);

        // counter attack
        attacker.powers.health_points -= defender.powers.counter_attack_power;
        $("#counter-attack-power").html("counter attack power: " + defender.powers.attack_power);
        $("#" + attacker.id).html(attacker.powers.health_points);
    });



});