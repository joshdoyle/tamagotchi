class Tamagotchi {
	constructor(n) {
		this.name = n
		this.hunger = 0
		this.sleepiness = 0
		this.boredom = 0
		this.age = 0
	}

}

const game = {
	name: '',
	time: 0,
	timer: 0,

	play(n){
		// Name the Tamagotchi
		this.name = n

		this.startTime()


		console.log('time is ' + this.time)
		},

	startTime(){
		this.timer = setInterval(() => {
			this.time++
			animateDiv()
			},1000)

	},

	stopTime(){
		clearInterval(this.timer)
	}	
}



/////animation

// give credit for this code
//http://jsfiddle.net/Xw29r/15/

function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
}

function animateDiv(){
    var newq = makeNewPosition();
    var oldq = $('#tama').offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);
    
    $('#tama').animate({ top: newq[0], left: newq[1] }, speed, function(){
      animateDiv();        
    });
    
};

function calcSpeed(prev, next) {
    
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    
    var greatest = x > y ? x : y;
    
    var speedModifier = 0.1;

    var speed = Math.ceil(greatest/speedModifier);

    return speed;

}


/////animation

//Listeners
$( "form" ).submit((event) => {
  event.preventDefault();
  game.play($('input').val())
});

