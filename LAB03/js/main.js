/**********************************************************************
 ***   Main JavaScipt file for  Control Structures and Arrays       ***
 ***   @author: Andrew Pomerleau                                    ***
 ***   @date:   02/09/2014                                          ***
 **********************************************************************/
const CONSOLE = 0,
  USER_RAW = 1,
  USER_PARSED = 2,
  ACTION = 3,
  INTRODUCTION = 0,
  CONTINUE_INTRODUCTION = 1,
  START_BATTLE = 2,
  LOST_BATTLE = 3,
  WON_BATTLE = 4,
  SPIDER = 0,
  GARGOYLE = 1,
  LYCANTHROPE = 2,
  VAMPIRE = 3,
  HYDRA = 4;
let gameStep = INTRODUCTION,
  monNames = ["Giant Spider", "Gargoyle", "Lycanthrope", "Vampire", "Hydra"],
  creature = {
    "name": "",
    "is_fast": false,
    "is_smart": false,
    "is_strong": false
  },
  player = JSON.parse(JSON.stringify(creature)),
  monsters = new Array(monNames.length),
  fighting = false,
  running = false,
  witting = false,
  lastStep, monster;

/**
 * Writes text to prompt the user for their next decision.
 *
 * @param text String to display in #input_prompt
 *
 */
function promptUser(text) {
  document.getElementById("input_prompt").innerHTML = text;
}

/**
 * Removes all text in the output div to start a new instance of
 * the game.
 */
function clearOutput() {
  document.getElementById("output").innerHTML = "";
}

/**
 * Displays all game output to the #output div.
 *
 * @param text String to display
 * @param code Integer referenced to USER_*, ACTION, CONSOLE
 *
 */
function sendOuput(text, code) {
  let output_div = document.getElementById("output");

  switch (code) {
    case USER_RAW:
      text = "<span class=\"user\">&gt;&nbsp;&nbsp;" + text + "</span>";
      break;
    case USER_PARSED:
      text = "<span class=\"command\">&gt;&nbsp;&nbsp;" + text + "</span>";
      break;
    case CONSOLE:
      text = "<span class=\"console\">" + text + "</span>";
      break;
    case ACTION:
      text = "<span class=\"action\">" + text + "</span>";
      break;
    default:
      text = "<span class=\"error\">I'm not sure how you got here. '" + text + "'</span>";
  }

  output_div.innerHTML = output_div.innerHTML + "<br/>" + text;
  output_div.scrollTop = output_div.scrollHeight;
}

/**
 * Chooses a random creature from the monsters array
 *
 * @return Object creature
 *
 */
function getMonster() {
  let index = Math.round(Math.random() * monsters.length, 0);
  if (index >= monsters.length) { index = monsters.length - 1; }

  return monsters[index];
}

/**
 * Randomly populates the monsters array based on names in the
 * monNames array.
 */
function prepareMonsters() {
  for (let i = 0; i < monsters.length; i++) {
    monsters[i] = JSON.parse(JSON.stringify(creature));

    monsters[i].name = monNames[i];

    switch (i) {
      case SPIDER:
        monsters[i].is_strong = false;
        monsters[i].is_fast = true;
        monsters[i].is_smart = false;
        break;
      case GARGOYLE:
        monsters[i].is_strong = true;
        monsters[i].is_fast = false;
        monsters[i].is_smart = true;
        break;
      case LYCANTHROPE:
        monsters[i].is_strong = true;
        monsters[i].is_fast = true;
        monsters[i].is_smart = false;
        break;
      case VAMPIRE:
        monsters[i].is_strong = true;
        monsters[i].is_fast = true;
        monsters[i].is_smart = true;
        break;
      case HYDRA:
        monsters[i].is_strong = true;
        monsters[i].is_fast = false;
        monsters[i].is_smart = false;
        break;
      default:
        monsters[i].is_strong = false;
        monsters[i].is_fast = false;
        monsters[i].is_smart = false;
    }
  }
}

/**
 * Prepares the player creature before allowing the player to customize.
 */
function preparePlayer() {
  player.is_smart = true;
  player.is_fast = true;
  player.is_strong = true;
}

/**
 * Prepares player and monster creatures to start the game loop.
 */
function initGame() {
  prepareMonsters();
  preparePlayer();
}

/**
 * Prints the message welcoming the player to the game and the
 * first action messages of the game.
 */
function printIntro() {
  let message;

  if (player.name !== "") {
    monster = getMonster();
    message = "The aspiring hero <strong class=\"command\">" +
      player.name + "</strong> is wandering through the forest," +
      " when a noise comes from behind a tree. From behind the tree" +
      " leaps a <strong class=\"console\">" + monster.name +
      "</strong>.";

    sendOuput(message, ACTION);
  } else {
    message = [];
    message[0] = "*********************************";
    message[1] = "* WELCOME TO <strong>LAB</strong>YRINTHINE <strong>3</strong> *";
    message[2] = "* &nbsp;&nbsp;&nbsp;&nbsp;By: Andrew Pomerleau &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*";
    message[3] = message[0];

    sendOuput(message[0], CONSOLE);
    sendOuput(message[1], ACTION);
    sendOuput(message[2], ACTION);
    sendOuput(message[3], CONSOLE);
  }
}

/**
 * Main game loop, handles logic depending on the current 'step' or
 * stage in the game.
 */
function mainLoop(step) {
  let inputError = (lastStep === step);
  lastStep = step;

  switch (step) {
    case INTRODUCTION:
      clearOutput();
      initGame();
      printIntro();

      if (inputError) sendOuput("[!] I did not understand your last input.", CONSOLE);
      promptUser("What's your name?");
      break;
    case CONTINUE_INTRODUCTION:
      printIntro();
      if (inputError) sendOuput("[!] I did not understand your last input.", CONSOLE);
      promptUser("What will you do? (<strong>FIGHT</strong>, <strong>OUTWIT</strong>, or <strong>RUN</strong>)");
      break;
    case START_BATTLE:
      let outDoes = Math.random();
      if (running) {
        if (!monster.is_fast || outDoes > 0.5) {
          sendOuput("<strong class=\"command\">" + player.name + "</strong> runs off before the creature knows what's going on, and lives to fight another day.", ACTION);
          gameStep = WON_BATTLE;
        } else {
          sendOuput("<strong class=\"command\">" + player.name + "</strong> turns to run, but is tripped by a wayward tree root. <strong class=\"console\">" + monster.name + "</strong> easily snatches the hero up and drags them back to its den to feed its friends and family.", ACTION);
          gameStep = LOST_BATTLE;
        }
      } else if (witting) {
        if (!monster.is_smart || outDoes > 0.5) {
          sendOuput("<strong class=\"command\">" + player.name + "</strong> points behind the monster, shouting \"Look over there!\" The <strong class=\"console\">" + monster.name + "</strong> turns to look and reveals a weak spot that <strong class=\"command\">" + player.name + "</strong> eagerly takes advantage of, dispatching the creature with one swift strike.", ACTION);
          gameStep = WON_BATTLE;
        } else {
          sendOuput("<strong class=\"command\">" + player.name + "</strong> points behind the monster, shouting \"Look over there!\" Unfortunately, the <strong class=\"console\">" + monster.name + "</strong> has heard that one before, and instead, eats <strong class=\"command\">" + player.name + "</strong> for lunch.", ACTION);
          gameStep = LOST_BATTLE;
        }
      } else if (fighting) {
        if (!monster.is_strong || outDoes > 0.5) {
          sendOuput("<strong class=\"console\">" + monster.name + "</strong> is no match for the hero's heroic strength. <strong class=\"command\">" + player.name + "</strong> skewers the beast on a sword and continues on their merry way.", ACTION);
          gameStep = WON_BATTLE;
        } else {
          sendOuput("<strong class=\"command\">" + player.name + "</strong> challenges the creature to hand-to-hand combat. However, the hero is no match for the strength of a <strong class=\"console\">" + monster.name + "</strong> in its prime.", ACTION);
          gameStep = LOST_BATTLE;
        }
      }
      mainLoop(gameStep);
      break;
    case LOST_BATTLE:
      sendOuput("<strong class=\"command\">" + player.name + "</strong> was felled by a <strong class=\"console\">" + monster.name + "</strong>", ACTION);
      sendOuput("GAME OVER: YOU LOSE", CONSOLE);
      document.getElementById('submit_button').value = "try again";
      break;
    case WON_BATTLE:
      sendOuput("<strong class=\"command\">" + player.name + "</strong> survived an encounter with a <strong class=\"console\">" + monster.name + "</strong>", ACTION);
      sendOuput("GAME OVER: YOU WIN", CONSOLE);
      document.getElementById('submit_button').value = "play again";
      break;
  }
}

/**
 * Handles all user input through the onclick event of the submit button.
 */
function submitInput() {
  if (document.getElementById("submit_button").value == "submit") {
    let userInput = document.getElementById("user_input").value;
    sendOuput(userInput, USER_RAW);

    switch (gameStep) {
      case INTRODUCTION:
        if (userInput !== "") {
          player.name = userInput;
          gameStep++;
        }
        break;
      case CONTINUE_INTRODUCTION:
        if (userInput.toUpperCase() === "FIGHT") {
          fighting = true;
        } else if (userInput.toUpperCase() === "RUN") {
          running = true;
        } else if (userInput.toUpperCase() === "OUTWIT") {
          witting = true;
        }

        if (running || witting || fighting) gameStep++;
        break;
    }
  } else {
    gameStep = INTRODUCTION;
    lastStep = null;
    player.name = "";
    running = false;
    fighting = false;
    witting = false;

    document.getElementById("submit_button").value = "submit";
  }

  document.getElementById("user_input").value = "";
  mainLoop(gameStep);
}
