//Standard life expectancy
const standardExpectancy = 81.5;

//FPS Goal
const frameRate = 2;

//tickRate should be <= frameRate
//tickRate should also be a factor of frameRate
const tickRate = 2;

//Human template (Contains all declarations)
function human() {
  this.age = 0;
  this.expectancy = standardExpectancy;
  this.alive = true;
  this.deathNote = "an error... complain."

  //0 is netural
  this.happiness = 0;
  this.fulfillment = 0; //Doing job well
  this.health = 0; //Random colds etc ...
}


//Calculates the delay between updates needed to reach the desired frame rate
var frameGap = 1000 / frameRate;

//Runs the frames at the correct interval
var frame = setInterval(onFrame,frameGap);
//To cancel
//clearInterval(frame);
//frame = 0;

//Calculates the delay between updates needed to reach the desired tick rate
var tickGap = 1000 / tickRate;

//Runs the ticks at the correct interval
var tick = setInterval(onTick,tickGap);
//To cancel
//clearInterval(tick);
//tick = 0;

function onFrame() {
  //Too be ran every frame

  $("#age").text(user.age/100);

}


function onTick() {
  //Too be ran every tick

  //To avoid floating point problems I'm adding 5 then / by 100 to add .05
  user.age += 5;

  //Die if too old
  if (user.age/100 >= user.expectancy){

      user.alive = false;
      user.deathNote = "old age."
    };

  //check if user is dead
  if (user.alive == false) {
    stop();
    alert("You died due to " + user.deathNote);
    var $input = $('<input type="button" value="Retry" onclick="location.reload();"/>');
    $input.appendTo($("body"));
  };
};


$(function() {
    user = new human();
});

paused = false;
//Stops updating
function stop() {
  if (paused == false){
    paused = !paused;
    clearInterval(tick);
    tick = 0;
    clearInterval(frame);
    frame = 0;
  };
};

//Starts updating
function start() {
  //Checking to make sure you can't have multiple ticks running
  if (paused == true){
    paused = !paused;
    var frame = setInterval(onFrame,frameGap);
    var tick = setInterval(onTick,tickGap);
  };
};
