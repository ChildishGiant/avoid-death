//Standard life expectancy
const standardExpectancy = 81.5;

//Must be a factor of 1 or the stages won't function
const growthPerTick = .05;

//knowledge lost per tick (when applicable)
var knowledgeLoss =  0.1
//knowledge gained (when learning)
var knowledgeGain = 2

//How many milliseconds before you can do an action again. (1000 = 1 second)
var cooldown = 2000

//tickRate should be == frameRate
//tickRate should also be a factor of frameRate
const tickRate = 2;

//Human template (Contains all declarations)
function human() {
  this.age = 0;
  this.expectancy = standardExpectancy;
  this.alive = true;
  this.deathNote = "an error... complain."
  this.stage = "baby"

  //0 is netural
  //+10 is max
  //-10 is lowest

  this.happiness = 0;
  this.happinessStage = ""
  this.fulfillment = 0; //Doing job well

  this.health = 0; //Random colds etc ...
  this.healthStage = "healty";
  this.knowledge = -5;
  this.knowledgeStage = "dumb";
}

//Upgrade stat
function research(stat, increase, element) {
  stat += increase;
  $(element).addClass("disabled")

  setTimeout(function(){
    $(element).removeClass("disabled")
  }, cooldown);

}

//Calculates the delay between updates needed to reach the desired tick rate
var tickGap = 1000 / tickRate;

//Runs the ticks at the correct interval
var tick = setInterval(onTick,tickGap);
//To cancel
//clearInterval(tick);
//tick = 0;

function onFrame() {
  //Too be ran every frame

  $("#age").text((user.age/100).toFixed(2));
  $("#stage").text(user.stage);
  $("#knowledge").text(user.knowledgeStage)

}

function onTick() {
  var age = user.age/100;
  var knowledge = user.knowledge;
  //Too be ran every tick

  //To avoid floating point problems I'm adding
  //growthPerTick * 100 then / by 100 to add growthPerTick
  user.age += (growthPerTick * 100);

  if (age == 1 - growthPerTick) {
    user.stage = "toddler";
  } else if (age == (3 - growthPerTick)) {
    user.stage = "child";
  } else if (age == (13 - growthPerTick)) {
    user.stage = "teenager";
  } else if (age == (20 - growthPerTick)) {
    user.stage = "adult";
  } else if (age == (60 - growthPerTick)) {
    user.stage = "pensioner";
  };

  if (knowledge == -10) {
    user.knowledgeStage = "brain-dead";
  } else if (knowledge == -5) {
    user.knowledgeStage = "a bit dumb";
  } else if (knowledge == 0) {
    user.knowledgeStage = "of average intelligence";
  } else if (knowledge == 5){
    user.knowledgeStage = "smart";
  };

  //Die if too old
  if (age >= user.expectancy){

      user.alive = false;
      user.deathNote = "old age"
      user.stage = "corpse"
    };

  //check if user is dead
  if (user.alive == false) {
    stop();
    $(".overlay").css("width", "100%");
    alert("You died due to " + user.deathNote + ".");
  };


  //Update the frame.
  onFrame();
};

//Once loaded, create a player.
$(function() {
    user = new human();
});


//Stops updating
function stop() {
  clearInterval(tick);
  tick = 0;
};

//Starts updating
function start() {
  var tick = setInterval(onTick,tickGap);
};
