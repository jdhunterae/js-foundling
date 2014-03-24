/**********************************************************************
 ***   Main Javascript file JavaScript Objects Example              ***
 ***   @author: Andrew Pomerleau                                    ***
 ***   @date:   03/19/2014                                          ***
 **********************************************************************/
var ATTRIBS = ["Giant", "Zombie", "Feral", "Ravenous"],
  SPECIES = ["Rat", "Dog", "Ogre", "Dragon"],
  TYPES = ["player", "monster"],
  PLAYER = 0,
  MONSTER = 1,
  MONSTERS_KILLED = 0,
  PLAYER_ATTACKS = 0,
  WINS = 0,
  LOSSES = 0,
  player = null,
  monster = null;

function Creature(cType, cName) {
  var baseHP, baseSTR, baseDEF, baseSPD, baseLVL, baseNM, basePTS;

  switch (cType) {
    case PLAYER:
      baseNM = cName;
      baseHP = 25;
      baseLVL = 1;
      basePTS = 3;
      baseSTR = Math.floor(Math.random() * 5) + 5;
      baseSPD = Math.floor(Math.random() * 5) + 5;
      baseDEF = Math.floor(Math.random() * 5) + 5;
      break;
    case MONSTER:
      baseNM = "";
      basePTS = 0;
      baseNM += ATTRIBS[Math.floor(Math.random() * ATTRIBS.length)];
      baseNM += " " + SPECIES[Math.floor(Math.random() * SPECIES.length)];
      baseLVL = Math.floor(MONSTERS_KILLED / 3) + 1;
      baseSTR = (Math.floor(Math.random() * 5) + 3) + Math.floor(Math.random() * 2 * baseLVL);
      baseSPD = (Math.floor(Math.random() * 5) + 3) + Math.floor(Math.random() * 2 * baseLVL);
      baseDEF = (Math.floor(Math.random() * 5) + 3) + Math.floor(Math.random() * 2 * baseLVL);
      baseHP = (Math.floor(Math.random() * 5) + 5) + Math.floor(baseDEF / baseLVL);
      break;
  }

  return {
    name: baseNM,
    type: cType,
    level: baseLVL,
    health: baseHP,
    maxhealth: baseHP,
    speed: baseSPD,
    strength: baseSTR,
    defense: baseDEF,
    potions: basePTS,
    isdefending: false,
    ishealing: false,

    attack: function(target) {
      var attdam = Math.floor(Math.random() * this.strength * 2);
      var defdam = target.defend(this, attdam);

      var message = this.name.toUpperCase() + " attacks for " + attdam;
      message += " and " + target.name.toUpperCase() + " blocks " + defdam + " of it,";
      message += " taking " + ((attdam - defdam > 0) ? attdam - defdam : 0) + " points of damage.";

      output(message);
    },
    defend: function(attacker, attdam) {
      var defdam = Math.floor(Math.random() * this.defense / 2);
      defdam += (this.isdefending) ? Math.floor(this.defense * 2 / 3) : 0;
      this.health -= (attdam - defdam > 0) ? attdam - defdam : 0;
      this.health = (this.health > 0) ? this.health : 0;
      return defdam;
    },
    display: function() {
      var text = "";

      text += "<h5>" + this.name + " <small>(Level " + this.level + " " + TYPES[this.type] + ")</small>" + "</h5>\n";
      text += "HP: " + this.health + "/" + this.maxhealth + "<br/>\n";
      text += "STR: " + this.strength + "<br/>\n";
      text += "DEF: " + this.defense + "<br/>\n";
      text += "SPD: " + this.speed + "<br/>\n";

      if (this.type === PLAYER) {
        text += "INV:<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Potion (x" + this.potions + ")<br/>\n";
      }

      $("#" + TYPES[this.type] + "-display").html(text);
    },
    heal: function() {
      var bonus = this.maxhealth * 2 / 3;

      if (this.potions > 0) {
        bonus = (this.health + bonus < this.maxhealth) ? bonus : this.maxhealth - this.health;
        this.health += bonus;
        this.potions -= 1;

        output(this.name.toUpperCase() + " drank a potion and regained " + bonus + " points in health");
      } else {
        output(this.name.toUpperCase() + " reaches for a potion, but is all out.");
      }
    }
  };
}

function output(message) {
  var html = $("#output-console").html();
  html += "\n" + message;
  $("#output-console").html(html);

  $("#output-console").scrollTop($("#output-console")[0].scrollHeight);

  if (player !== null) {
    player.display();
  }
  if (monster !== null) {
    monster.display();
  }
}

function newGame() {
  if (!($("#newgame-btn").hasClass('disabled'))) {

    if (player === null || confirm("Continuing will delete your current character.\nTo keep your current character, click Cancel, and then click [Try again!]")) {
      var response = "";

      while (response.length <= 0) {
        response = prompt("Please enter our hero's name.", "Steve");
        $("output-console").html("");
      }

      player = Creature(PLAYER, response);

      monster = Creature(MONSTER);

      player.health = player.maxhealth;
      monster.health = monster.maxhealth;

      output("Let the battle begin!");
      $("#attack-btn").removeClass('disabled');
      $("#defend-btn").removeClass('disabled');
      $("#heal-btn").removeClass('disabled');

      $("#newgame-btn").addClass('secondary');
      $("#newgame-btn").addClass('disabled');

      output("A " + monster.name.toUpperCase() + " approaches...");
    }
  }
}

function attackAction() {
  if (!($("#attack-btn").hasClass('disabled'))) {
    // output("[attack:clicked]");
    actionRound();
  }
}

function defendAction() {
  if (!($("#defend-btn").hasClass('disabled'))) {
    player.isdefending = true;
    // output("[defend:clicked]");
    actionRound();
  }
}

function healAction() {
  if (!($("#heal-btn").hasClass('disabled'))) {
    player.ishealing = true;
    // output("[heal:clicked]");
    actionRound();
  }
}

function actionRound() {
  var combatants = [player, monster],
    message = "",
    i;

  if (player.isdefending || player.ishealing) {
    PLAYER_ATTACKS = 0;
  } else {
    PLAYER_ATTACKS += 1;
  }

  if (Math.random() * 7 < 2 || (PLAYER_ATTACKS > 5 && Math.random() * 10 < 7)) {
    monster.isdefending = true;
  }

  combatants = combatants.sort(function(a, b) {
    return a.speed - b.speed;
  });

  for (i = 0; i < combatants.length; i += 1) {
    if (combatants[i].health <= 0) {
      combatants[i].isdefending = false;
      combatants[i].ishealing = false;
    }
  }

  if (!combatants[0].isdefending && !combatants[0].ishealing && combatants[0].health !== 0) {
    combatants[0].attack(combatants[1]);
  } else if (combatants[0].isdefending) {
    output(combatants[0].name.toUpperCase() + " is bracing to defend.");
  } else if (combatants[0].ishealing) {
    combatants[0].heal();
  }

  if (!combatants[1].isdefending && !combatants[1].ishealing && combatants[1].health !== 0) {
    combatants[1].attack(combatants[0]);
  } else if (combatants[1].isdefending) {
    output(combatants[1].name.toUpperCase() + " is bracing to defend.");
  } else if (combatants[1].ishealing) {
    combatants[1].heal();
  }

  if (combatants[0].isdefending && combatants[1].isdefending) {
    message = combatants[0].name.toUpperCase() + " and " + combatants[1].name.toUpperCase() + " square off, prepared to defend themselves.";
  }

  if (message.length > 0) {
    output(message);
  }

  for (i = 0; i < combatants.length; i += 1) {
    combatants[i].isdefending = false;
    combatants[i].ishealing = false;
  }

  if (player.health === 0) {
    gameOver();
  } else if (monster.health === 0) {
    endFight();
  }
}

function endFight() {
  output(monster.name.toUpperCase() + " was struck down by " + player.name.toUpperCase() + ".\nYou won the battle!");
  MONSTERS_KILLED += 1;

  if (MONSTERS_KILLED % 4 === 0) {
    player.level += 1;

    switch (player.level % 7) {
      case 0:
        player.strength += 2;
        break;
      case 1:
        player.defense += 1;
        break;
      case 2:
        player.speed += 2;
        break;
      case 3:
        player.strength += 1;
        player.defense += 1;
        break;
      case 4:
        player.defense += 1;
        player.speed += 1;
        break;
      case 5:
        player.strength += 1;
        break;
      case 6:
        player.speed += 1;
        break;
    }
    player.maxhealth += Math.floor(Math.random() * player.defense) + player.level;
  }

  $("#attack-btn").addClass('disabled');
  $("#defend-btn").addClass('disabled');
  $("#heal-btn").addClass('disabled');

  $("#newfight-btn").removeClass('disabled');
  $("#newgame-btn").removeClass('disabled');

  output("Click [Battle!] to try to vanquish another foe, or [New Game] to start over from the beginning...");
}

function gameOver() {
  output(player.name.toUpperCase() + " was struck down by the " + monster.name.toUpperCase() + ".\nGame Over.");

  $("#attack-btn").addClass('disabled');
  $("#defend-btn").addClass('disabled');
  $("#heal-btn").addClass('disabled');

  $("#newgame-btn").removeClass('secondary');
  $("#newgame-btn").removeClass('disabled');
  $("#newfight-btn").removeClass("disabled");
  $("#newfight-btn").html("Try again!");


  output("Click [Try again!] to try your luck at vanquishing this foe again, or [New Game] to start over from the beginning...");
}

function testRun() {
  player = Creature(PLAYER, "Steve");
  monster = Creature(MONSTER, "Giant Rat");

  while (WINS + LOSSES < 100) {
    while (player.health > 0 && monster.health > 0) {
      if (player.speed > monster.speed) {
        player.attack(monster);
        monster.attack(player);
      } else {
        monster.attack(player);
        player.attack(monster);
      }
    }
    if (player.health > 0) {
      WINS += 1;
    } else {
      LOSSES += 1;
    }

    player.health = player.maxhealth;
    monster.health = monster.maxhealth;
  }

  output("\nWINS: " + WINS + "     LOSSES: " + LOSSES);
}

function newFight() {
  if (!($("#newfight-btn").hasClass('disabled'))) {

    if ($("#newfight-btn").html() === "Try again!") {
      player.health = player.maxhealth;
      monster.health = monster.maxhealth;

      $("#newfight-btn").html("Battle!");
    } else {
      monster = Creature(MONSTER);
    }
    $("#newfight-btn").addClass('disabled');
    $("#newgame-btn").addClass('disabled');

    output("Let the battle begin!");
    $("#attack-btn").removeClass('disabled');
    $("#defend-btn").removeClass('disabled');
    $("#heal-btn").removeClass('disabled');

    $("#newgame-btn").removeClass('primary');
    $("#newgame-btn").addClass('secondary');

    output("A " + monster.name.toUpperCase() + " approaches...");
  }
}
