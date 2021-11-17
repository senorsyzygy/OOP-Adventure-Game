window.onload = function() {
    document.getElementById('beginAdventure').style.display = 'none'
    document.getElementById('heroImage').style.display = "none"
    document.getElementById('gameArea').style.display = "none"
    document.getElementById('bossArea').style.display = "none"
    document.getElementById('slimeImg').style.display = "none"
    document.getElementById('needlerImg').style.display = "none"
    document.getElementById('smogImg').style.display = "none"
    document.getElementById('bossButton1').style.display = "none"
    document.getElementById('bossButton2').style.display = "none"
    document.getElementById('needlerFight').style.display = "none"
    document.getElementById('slimeFight').style.display = "none"
    document.getElementById('lostArea').style.display = "none"
    document.getElementById('victoryArea').style.display = "none"
}

class Character {
    constructor(name, description, health, attack, defence){
        this.name = name
        this.description = description
        this.health = health
        this.attack = attack
        this.defence = defence
    }
}

const Slime = new Character(
    "Slime",
    "Shaped like an onion or a rain droplet, known to be very weak",
    1,
    1,
    1
)
const Needler = new Character(
    "Needler",
    "Short humanoid creature with cotton balls on their body and carrys a sharp needle as tall as itself",
    3,
    3,
    3
)
const Hero = new Character(
    "Hero",
    "Young man from the sleepy village of Cobblestone",
    22,
    15,
    15
)
const Smog = new Character(
    "Smog",
    "Formless masses of mist such as you might see on a spring morning. But beware - they've been made into monsters by unpleasant arcane forces.",
    22,
    15,
    15
)

class Room {
    constructor(name, description, contents, linkedRooms){
        this.name = name
        this.description = description
        this.contents = contents
        this.linkedRooms = linkedRooms
    }
    addNeighbor(linkedObject){
        this.linkedRooms = linkedObject
    }
}

const Base = new Room(
    "Base of Cobblestone Tor",
    "The base of the mountain, you see an entrance which will lead you into the mountain itself",
    "",
    {}
)
const Entrance = new Room(
    "Entrance",
    "The bottom level of the mountain, you see a ladder going up and behind you the outside from where you originally entered from",
    "",
    {}
)
const Middle = new Room(
    "Midsection",
    "This is the halfway point of the mountain, you see rooms to your right and left and in front of you a ladder to go up to the top exit. Behind you is the ladder you came from.",
    "",
    {}
)
const MiddleRight = new Room(
    "Right room",
    "The right hand room of the middle section of the mountain",
    "A enemy Needler!",
    {}
)
const MiddleLeft = new Room(
    "Left room",
    "The left hand room of the middle section of the mountain",
    "A enemy Slime!",
    {}
)
const Exit = new Room(
    "Top floor",
    "This is the top of the mountain passage way, behind you are the stairs you just climbed to get here and in front of you is the exit to the peak of the mountain",
    "",
    {}
)
const Peak = new Room(
    "Top of mountain stairs",
    "As you climb the stairs you feel like there is something dangerous lurking beyond the exit, maybe it's best to fully explore the mountains rooms before going forward?",
    "",
    {}
)

Base.addNeighbor({forward : Entrance})
Entrance.addNeighbor({forward: Middle, backward: Base})
Middle.addNeighbor({right: MiddleRight, left: MiddleLeft, forward: Exit, backward: Entrance})
Exit.addNeighbor({forward: Peak, backward: Middle})
Peak.addNeighbor({backward: Exit})
MiddleRight.addNeighbor({left: Middle})
MiddleLeft.addNeighbor({right: Middle})

let current = Base

function bossBattle(){
    if (Slime.health == 0 && Needler.health == 0){
        document.getElementById('bossButton2').style.display = "inline-block"
    } else {
        document.getElementById('bossButton1').style.display = "inline-block"
    }
}

function changeRoom() {
    document.getElementById("activeRoomName").innerHTML = current.name;
    document.getElementById("activeRoomDescription").innerHTML = current.description;
    document.getElementById("activeRoomContents").innerHTML = current.contents;
    if (current.name == "Left room" && Slime.health > 0){
        document.getElementById("activeEnemyName").innerHTML = "Enemy name: " + Slime.name;
        document.getElementById("activeEnemyDescription").innerHTML = Slime.description;
        document.getElementById("activeEnemyHealth").innerHTML = "Health: " + Slime.health;
        document.getElementById('slimeImg').style.display = "inline-block"
        document.getElementById('slimeFight').style.display = "inline-block"
    } else if (current.name == "Right room" && Needler.health > 0){
        document.getElementById("activeEnemyName").innerHTML = "Enemy name: " + Needler.name;
        document.getElementById("activeEnemyDescription").innerHTML = Needler.description;
        document.getElementById("activeEnemyHealth").innerHTML = "Health: " + Needler.health;
        document.getElementById('needlerImg').style.display = "inline-block"
        document.getElementById('needlerFight').style.display = "inline-block"
    } else if (current.name == "Top of mountain stairs"){
        bossBattle()
    } else if (current.name != "Left room", "Right room", "Top of mountain stairs"){
        document.getElementById("activeEnemyName").innerHTML = "";
        document.getElementById("activeEnemyDescription").innerHTML = ""
        document.getElementById("activeEnemyHealth").innerHTML = ""
        document.getElementById('slimeImg').style.display = "none"
        document.getElementById('needlerImg').style.display = "none"
        document.getElementById('bossButton1').style.display = "none"
        document.getElementById('bossButton2').style.display = "none"
        document.getElementById('needlerFight').style.display = "none"
        document.getElementById('slimeFight').style.display = "none"
    }
}

function changeName(){
    userInput = document.getElementById("userInput").value
    if (userInput == ""){
        alert("You must pick a name")
    } else {
        Hero.name = userInput
        document.getElementById('userInput').style.display = "none"
        document.getElementById('button').style.display = "none"
        document.getElementById('introText').style.display = "none"
        document.getElementById('beginAdventure').style.display = "inline-block"
        document.getElementById('heroImage').style.display = "inline-block"
        msg = "Okay now I remember, your name is " + Hero.name + ". Prepare to go on an adventure as you scale Cobblestone Tor and complete the coming of age ceremony.";
    }
    document.getElementById("userName").innerHTML = msg
}

function damageCalculation(monster){
    rand = Math.floor(Math.random() * 5)
    damage = ((Hero.attack / 2) - (monster.defence / 4)) + rand
}
//doesnt seem to want to work so haven't included it
function damageToHero(monster){
    random = Math.floor(Math.random() * 5)
    damage = ((monster.attack / 2) - (Hero.defence / 4)) + rand
}

function fightBattle1(){
    damageCalculation(Slime)
    if (damage >= Slime.health){
        Slime.health = 0
        document.getElementById("activeEnemyHealth").innerHTML = "Health: " + Slime.health;
        alert("You dealt " + damage + " damage. You have defeated the slime, well done!")
        document.getElementById('slimeFight').style.display = "none"
    } else {
        Slime.health = (Slime.health - damage)
        document.getElementById("activeEnemyHealth").innerHTML = "Health: " + Slime.health;
        slimeDamage = damageToHero(Slime)
        Hero.health = (Hero.health - slimeDamage)
        alert("Slime attacks back! It deals" + slimeDamage + " damage to you!")
        document.getElementById("heroHealth").innerHTML = "Health: " + Hero.health;
    }
}

function fightBattle2(){
    damageCalculation(Needler)
    if (damage >= Needler.health){
        Needler.health = 0
        document.getElementById("activeEnemyHealth").innerHTML = "Health: " + Needler.health;
        alert("You dealt " + damage + " damage. You have defeated the Needler, well done!")
        document.getElementById('needlerFight').style.display = "none"
    } else if (damage < Needler.health) {
        alert("You dealt " + damage + " damage.")
        Needler.health = (Needler.health - damage)
        document.getElementById("activeEnemyHealth").innerHTML = "Health: " + Needler.health;
        needlerDamage = damageToHero(Needler)
        Hero.health = (Hero.health - needlerDamage)
        alert("Needler attacks back! It deals " + needlerDamage +" damage to you!")
        document.getElementById("heroHealth").innerHTML = "Health: " + Hero.health;
    }
}

function bossFightBattle(){
    damageCalculation(Smog)
    if (damage >= Smog.health){
        Smog.health = 0
        document.getElementById("activeEnemyHealth2").innerHTML = "Health: " + Smog.health;
        alert("You dealt " + damage + " damage. You have defeated the Smog, well done!")
        document.getElementById('bossArea').style.display = "none"
        document.getElementById('victoryArea').style.display = "inline-block"
        victoryMusic()
    } else if (damage < Smog.health) {
        Smog.health = (Smog.health - damage)
        alert("You dealt " + damage + " damage to the Smog!")
        document.getElementById("activeEnemyHealth2").innerHTML = "Health: " + Smog.health;
        smogRandom = Math.floor(Math.random() * 5)
        smogDamage = ((Smog.attack / 2) - (Hero.defence / 4)) + smogRandom
        Hero.health = (Hero.health - smogDamage)
        alert("Smog attacks back! It deals " + smogDamage +" damage to you!")
        document.getElementById("heroHealth2").innerHTML = "Health: " + Hero.health;
        msg = "Well done " + Hero.name + ". You have successfully passed the coming of age ceremony and managed to clear a nasty enemy off the mountain, congratulations.";
        if (Hero.health == 0){
            document.getElementById('bossArea').style.display = "none"
            document.getElementById('lostArea').style.display = "inline-block"
            defeatMusic()
        }
    }
    document.getElementById("congratsMsg").innerHTML = msg
}

function moveMe(direction){
    if(direction in current.linkedRooms){
      current = current.linkedRooms[direction];
      changeRoom()
    } else {
      alert("No room there!")
    }
}

function submitHandler() {
    movementInput = document.getElementById("movementInput").value
    dict = ["forward", 'backward', 'left', 'right']
    if(dict.includes(movementInput)){
      moveMe(movementInput)
    } else {
      alert("Please type in the direction correctly")
    }
  
}
//Hides intro area and shows game area
function startGame() {
    document.getElementById('introArea').style.display = "none"
    document.getElementById('gameArea').style.display = "inline-block"
    document.getElementById("heroName").innerHTML = "Name: " + Hero.name
    document.getElementById("heroHealth").innerHTML = "Health: " + Hero.health
    startMusic()
}
//Hides game area, changes song to bossTheme and goes onto boss area
function beginBossBattle() {
    document.getElementById('gameArea').style.display = "none"
    document.getElementById('bossArea').style.display = "inline-block"
    document.getElementById("heroName2").innerHTML = "Name: " + Hero.name
    document.getElementById("heroHealth2").innerHTML = "Health: " + Hero.health
    document.getElementById("activeEnemyName2").innerHTML = "Enemy name: " + Smog.name;
    document.getElementById("activeEnemyDescription2").innerHTML = Smog.description;
    document.getElementById("activeEnemyHealth2").innerHTML = "Health: " + Smog.health;
    bossMusic()
}
//Autoplays music but at half volume
function startMusic(){
    let music = document.getElementById('audio')
    music.volume = 0.35
    music.play();  
}
//Stops previous music and plays boss theme
function bossMusic(){
    let music = document.getElementById('audio')
    music.pause()
    music.setAttribute("src","music/bossTheme.mp3")
    music.load();
    music.volume = 0.35
    music.play();
}
//Stops previous music and plays victory theme
function victoryMusic(){
    let music = document.getElementById('audio')
    music.pause()
    music.setAttribute("src","music/victoryTheme.mp3")
    music.load();
    music.volume = 0.35
    music.play();
}
//Stops previous music and plays defeat theme
function defeatMusic(){
    let music = document.getElementById('audio')
    music.pause()
    music.setAttribute("src","music/defeatTheme.mp3")
    music.load();
    music.volume = 0.35
    music.play();
}