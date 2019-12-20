class Tamagotchi {
	constructor(n) {
		this.name = n
		this.age = 0
		this.hunger = 0
		this.boredom = 0
		this.sleepiness = 0
		this.sleeping = false
	}

	// Called every 'hour' which is every 10 seconds(see game.hourInMilliseconds = 10000)
	updateStats(){
		this.updateAge()
		this.updateHunger()
		this.updateBoredom()
		this.updateSleepiness()
	}

	getAge(){
		return Math.floor(this.age)
	}

	getSleepiness(){
		return Math.floor(this.sleepiness)
	}

	updateAge(){
		this.age += 1/24 //Add an hour to age
	}

	updateHunger(){
		let hungerFactor = 0
		if(this.sleeping){
			let hungerFactor = .25
		} else {
			let hungerFactor = 1
		}
		this.hunger += hungerFactor //Every hour you are 10% hungrier

	}

	updateBoredom(){
		let boredomFactor = 0
		if(this.sleeping){
			boredomFactor = .1
		}else {
			boredomFactor = 2
		}
		this.boredom += boredomFactor //Every hour you are 20% more bored
	}

	updateSleepiness(){
		if(this.sleeping){
			this.sleepiness -= 1/8
		} else {
			this.sleepiness += 1/2 //You can be awake for 16 hours a day.
		
		}

		if(this.sleepiness < 0){ this.sleepiness = 0}
	}

	isAlive(){
		if(this.hunger >= 10 || this.boredom >= 10 || this.sleepiness >=  10){
			console.log('tama is dead')
			return false
		} else {
			return true
		}
	}

	feed(){ 
		this.hunger -= 2
		if(this.hunger < 0){this.hunger = 0}
	}

	play(){ 
		this.boredom -= 1
		if(this.boredom < 0){this.boredom = 0}
	}

	toggleSleep(lightsOn){
		if(lightsOn){
			console.log('is awake')
			this.sleeping = false
		} else {
			console.log('is sleeping')
			this.sleeping = true
		}
	}
	
	



}

const game = {
	myTama: {},
	hourInSeconds: 5, //every 10 seconds is an hour in the game
	seconds: 0,
	timer: null,
	lightsOn: true,


	play(n){
		// 
		//remove form
		$('form').remove()

		//Create Tama
		this.myTama = new Tamagotchi(n)

		// show tama
		$('#tama').css('visibility', 'visible')
		this.startTime()

	},	

	startTime(){
		// let timer = setInterval(this.waitForTheHour(),1000)
		 this.timer = setInterval(() => {
		 	if(this.myTama.isAlive()){
				animateDiv()
				if(this.seconds === this.hourInSeconds){
					this.passTheHour()
					this.seconds = 0
				} else {
					this.seconds++
				}
		 	} else {
		 		this.stopTime()
		 	}
		},1000)
	},

	passTheHour(){
			this.myTama.updateStats()
			this.printStats()
	},

	stopTime(){
		console.log('stop timer')
		clearInterval(this.timer)
		this.printStats()
	},

	printStats(){
		$('#name').text('Name: ' + this.myTama.name)
		$('#age').text('Age: ' + this.myTama.getAge() + ' Days')
		$('#hunger').text('Hunger: ' + this.myTama.hunger)
		$('#boredom').text('Boredom: ' + this.myTama.boredom)
		$('#sleepiness').text('Sleepiness: ' + this.myTama.getSleepiness())
	},

	switchLights(){
		if(this.lightsOn){
			console.log('lights turned off')
			this.lightsOn = false
			this.myTama.toggleSleep(this.lightsOn)
		} else {
			console.log('lights turned on')
			this.lightsOn = true
			this.myTama.toggleSleep(this.lightsOn)			
		}

		$('#pen').toggleClass("lights-out")
	}	
}



/////animation

// give credit for this code
//http://jsfiddle.net/Xw29r/15/
//move these functions to tamagotchi class
function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
}

function animateDiv(myclass){
    var newq = makeNewPosition();
    $('#tama').animate({ top: newq[0], left: newq[1] }, 30000,   function(){
      animateDiv('#tama');        
    });
    
};


/////animation

//Listeners
$( "form" ).submit((event) => {
  event.preventDefault();
  game.play($('input').val())
});

$('#btnFeed').on('click', () => {
	console.log('feed listener')
  	game.myTama.feed()
  	game.printStats()
})

$('#btnPlay').on('click', () => {
	console.log('play listener')
  	game.myTama.play()
  	game.printStats()
})

$('#btnLights').on('click', () => {
	console.log('lights listener')	
  	game.switchLights()
})