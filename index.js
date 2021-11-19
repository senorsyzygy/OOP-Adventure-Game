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
    document.getElementById('defeatArea').style.display = "none"
    document.getElementById('victoryArea').style.display = "none"
    document.getElementById("chestButton").style.display = "none"
    pauseOnLoad()
}
//Sets up character objects
class Character {
    constructor(name, description, health, attack, defence, inventory){
        this.name = name
        this.description = description
        this.health = health
        this.attack = attack
        this.defence = defence
        this.inventory = inventory
    }
}

const Slime = new Character(
    "Slime",
    "Shaped like an onion or a rain droplet, known to be very weak",
    1,
    1,
    1,
    ""
)
const Needler = new Character(
    "Needler",
    "Short humanoid creature with cotton balls on their body and carrys a sharp needle as tall as itself",
    3,
    3,
    3,
    ""
)
const Hero = new Character(
    "Hero",
    "Young man from the sleepy village of Cobblestone",
    22,
    15,
    15,
    "Empty"
)
const Smog = new Character(
    "Smog",
    "Formless masses of mist such as you might see on a spring morning. But beware - they've been made into monsters by unpleasant arcane forces.",
    22,
    20,
    15,
    ""
)
//doesnt function as intended, might come back to it
// class Tool {
//     constructor(name, description, value){
//         this.name = name
//         this.description = description
//         this.value = value
//     }
// }
// const HealthPotion = new Tool(
//     "Health Potion",
//     "A vial to restore health",
//     10
// )

function pickUpItem(){
    Hero.inventory = "Health Potion x1"
    alert("You picked up a Health Potion!")
    document.getElementById("heroInventory").innerHTML = "Inventory: " + Hero.inventory
    document.getElementById('chestButton').style.display = "none"
}

function useHealthPotion(){
    if (Hero.health >= 22){
        alert("You restored zero health!")
    } else if (Hero.health < 12){
        Hero.health = Hero.health + 10
        alert("You healed yourself for " + 10)
    } else{
        Hero.health = 22
        alert("You healed yourself to max health!")
    }
    Hero.inventory = "Empty"
    document.getElementById("healButton").style.display = "none"
    document.getElementById("heroHealth2").innerHTML = "Health: " + Hero.health

}
//Sets up Room objects
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
    "This is the halfway point of the mountain, you see rooms to your right and left and in front of you are some stairs which should take you to the peak of the mountain. Behind you is the ladder you came from.",
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
const Stairs = new Room(
    "Stairs",
    "This is the stairway of the mountain passage way, behind is the middle section of the mountain and in front of you are more stairs leading to the exit to the peak of the mountain. You also notice a small hole you could crawl through to your right, maybe there's something inside there?",
    "",
    {}
)
const Peak = new Room(
    "Top of mountain stairs",
    "As you climb the stairs you feel like there is something dangerous lurking beyond the exit, you feel as if you cannot move any further without exploring the rest of the mountain beforehand",
    "",
    {}
)
const StairsRight = new Room(
    "Room leading off from stairs",
    "Room off to the right of the stairs full of excavation equipment, you see the stairs out in the corridor to the left of you and in front another room where you sense something valuable",
    "",
    {}
)
const Treasure = new Room(
    "Treasure Room",
    "You see a chest inside the room, it has a few cobwebs on it, you feel like there may be something important inside. Behind you is the room next to the stairs.",
    "",
    {}
)
//Rooms and their neighbors
Base.addNeighbor({forward : Entrance})
Entrance.addNeighbor({forward: Middle, back: Base})
Middle.addNeighbor({right: MiddleRight, left: MiddleLeft, forward: Stairs, back: Entrance})
Stairs.addNeighbor({forward: Peak, back: Middle, right: StairsRight})
Peak.addNeighbor({back: Stairs})
MiddleRight.addNeighbor({left: Middle})
MiddleLeft.addNeighbor({right: Middle})
StairsRight.addNeighbor({left: Stairs, forward: Treasure})
Treasure.addNeighbor({back: StairsRight})

let current = Base
//Allows access to the Boss if conditions are met
function bossBattle(){
    if (Slime.health == 0 && Needler.health == 0){
        document.getElementById('bossButton2').style.display = "inline-block"
        Peak.description = "You've cleared out the enemies, you now feel as if you can proceed outside of the passageway and onto the peak of the mountain"
    } else {
        document.getElementById('bossButton1').style.display = "inline-block"
    }
}
//Moves rooms and also hides/shows information depending on circumstances such as enemy information going away
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
    } else if (current.name == "Treasure Room"){
        treasureChest()
    } else if (current.name != "Left room", "Right room", "Top of mountain stairs", "Treasure Room"){
        document.getElementById("activeEnemyName").innerHTML = "";
        document.getElementById("activeEnemyDescription").innerHTML = ""
        document.getElementById("activeEnemyHealth").innerHTML = ""
        document.getElementById('slimeImg').style.display = "none"
        document.getElementById('needlerImg').style.display = "none"
        document.getElementById('bossButton1').style.display = "none"
        document.getElementById('bossButton2').style.display = "none"
        document.getElementById('needlerFight').style.display = "none"
        document.getElementById('slimeFight').style.display = "none"
        document.getElementById('chestButton').style.display = "none"
    }
}
function treasureChest(){
    if (Hero.inventory == "Empty"){
    document.getElementById('chestButton').style.display = "inline-block"
    } else{
        document.getElementById('chestButton').style.display = "none"
    }
}

//changes the name of the Hero to the users choice
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
//calculates damage done to monster characters by the Hero
function damageCalculation(monster){
    let damageRand = Math.floor(Math.random() * 5)
    let retDamage = ((Hero.attack / 2) - (monster.defence / 4)) + damageRand
    return retDamage
}
//doesnt seem to want to work so haven't included it
function damageToHero(monster){
    let monRand = Math.floor(Math.random() * 5)
    let monDamage = ((monster.attack / 2) - (Hero.defence / 4)) + monRand
    return monDamage
}
//Slime battle button
function fightBattle1(){
    let fightDamage = damageCalculation(Slime)
    if (fightDamage >= Slime.health){
        Slime.health = 0
        document.getElementById("activeEnemyHealth").innerHTML = "Health: " + Slime.health;
        alert("You dealt " + fightDamage + " damage. You have defeated the slime, well done!")
        document.getElementById('slimeFight').style.display = "none"
    } else {
        Slime.health = (Slime.health - fightDamage)
        document.getElementById("activeEnemyHealth").innerHTML = "Health: " + Slime.health;
        slimeDamage = damageToHero(Slime)
        Hero.health = (Hero.health - slimeDamage)
        alert("Slime attacks back! It deals" + slimeDamage + " damage to you!")
        document.getElementById("heroHealth").innerHTML = "Health: " + Hero.health;
        if(Hero.health <= 0){
            defeatArea()
        } 
    }
}
//Needler battle button
function fightBattle2(){
    let fightDamage = damageCalculation(Needler)
    if (fightDamage >= Needler.health){
        Needler.health = 0
        document.getElementById("activeEnemyHealth").innerHTML = "Health: " + Needler.health;
        alert("You dealt " + fightDamage + " damage. You have defeated the Needler, well done!")
        document.getElementById('needlerFight').style.display = "none"
    } else if (fightDamage < Needler.health) {
        alert("You dealt " + damage + " damage.")
        Needler.health = (Needler.health - damage)
        document.getElementById("activeEnemyHealth").innerHTML = "Health: " + Needler.health;
        needlerDamage = damageToHero(Needler)
        Hero.health = (Hero.health - needlerDamage)
        alert("Needler attacks back! It deals " + needlerDamage +" damage to you!")
        document.getElementById("heroHealth").innerHTML = "Health: " + Hero.health;
        if(Hero.health <= 0){
            defeatArea()
        } 
    }
}
//Loads up defeat screen if hero health goes to zero
function defeatArea(){
    document.getElementById('bossArea').style.display = "none"
    document.getElementById('defeatArea').style.display = "inline-block"
    defeatMusic()
}
//Smog battle button
function bossFightBattle(){
    fightDamage = damageCalculation(Smog)
    if (fightDamage >= Smog.health){
        Smog.health = 0
        document.getElementById("activeEnemyHealth2").innerHTML = "Health: " + Smog.health;
        alert("You dealt " + fightDamage + " damage. You have defeated the Smog, well done!")
        document.getElementById('bossArea').style.display = "none"
        document.getElementById('victoryArea').style.display = "inline-block"
        victoryMusic()
        msg = "Well done " + Hero.name + ". You have successfully passed the coming of age ceremony and managed to clear a nasty enemy off the mountain, congratulations.";
    } else if (fightDamage < Smog.health) {
        Smog.health = (Smog.health - fightDamage)
        alert("You dealt " + fightDamage + " damage to the Smog!")
        document.getElementById("activeEnemyHealth2").innerHTML = "Health: " + Smog.health;
        smogDamage = damageToHero(Smog)
        Hero.health = (Hero.health - smogDamage)
        alert("Smog attacks back! It deals " + smogDamage +" damage to you!")
        document.getElementById("heroHealth2").innerHTML = "Health: " + Hero.health; 
        if(Hero.health <= 0){
            defeatArea()
        } 
    }
    document.getElementById("congratsMsg").innerHTML = msg
}
//moves from one room object to the next
function moveMe(direction){
    if(direction in current.linkedRooms){
      current = current.linkedRooms[direction];
      changeRoom()
    } else {
      alert("There is no room to move into! Try a different direction.")
    }
}
//user types out a direction to move into a neighboring object
function submitHandler() {
    movementInput = document.getElementById("movementInput").value
    dict = ["forward", 'back', 'left', 'right']
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
    document.getElementById("heroInventory").innerHTML = "Inventory: " + Hero.inventory
    startMusic()
}
//Hides game area, changes song to bossTheme and goes onto boss area
function beginBossBattle() {
    document.getElementById('gameArea').style.display = "none"
    document.getElementById('bossArea').style.display = "inline-block"
    document.getElementById("heroName2").innerHTML = "Name: " + Hero.name
    document.getElementById("heroHealth2").innerHTML = "Health: " + Hero.health
    document.getElementById("heroInventory2").innerHTML = "Inventory: " + Hero.inventory
    document.getElementById("activeEnemyName2").innerHTML = "Enemy name: " + Smog.name;
    document.getElementById("activeEnemyDescription2").innerHTML = Smog.description;
    document.getElementById("activeEnemyHealth2").innerHTML = "Health: " + Smog.health;
    bossMusic()
    if (Hero.inventory != "Health Potion x1"){
        document.getElementById("healButton").style.display = "none"
    } else {
        document.getElementById("healButton").style.display = "inline-block"
    }
}
//Stops music from autoplaying on page load
function pauseOnLoad(){
    let music = document.getElementById('audio')
    music.pause()
}
//Autoplays music but at half volume
function startMusic(){
    let music = document.getElementById('audio')
    music.volume = 0.2
    music.play();  
}
//Stops previous music and plays boss theme
function bossMusic(){
    let music = document.getElementById('audio')
    music.pause()
    music.setAttribute("src","music/bossTheme.mp3")
    music.load();
    music.volume = 0.2
    music.play();
}
//Stops previous music and plays victory theme
function victoryMusic(){
    let music = document.getElementById('audio')
    music.pause()
    music.setAttribute("src","music/victoryTheme.mp3")
    music.load();
    music.volume = 0.2
    music.play();
}
//Stops previous music and plays defeat theme
function defeatMusic(){
    let music = document.getElementById('audio')
    music.pause()
    music.setAttribute("src","music/defeatTheme.mp3")
    music.load();
    music.volume = 0.2
    music.play();
}