class Tamagotchi {
	constructor(n) {
		this.name = n
		this.age = 0
		this.hunger = 0
		this.boredom = 0
		this.sleepiness = 0
		this.sleeping = false
		this.height = 50
		this.width = 50
		this.opacity = 1
	}

	// Called every 'hour' which is every 10 seconds(see game.hourInMilliseconds = 10000)
	updateStats(){
		this.updateAge()
		this.updateHunger()
		this.updateBoredom()
		this.updateSleepiness()
	}

	getAge(){
		return Math.round( this.age * 10) / 10
	}

	getSleepiness(){
		return Math.round( this.sleepiness * 10) / 10
	}

	getHunger(){
		console.log('in getHunger', this.hunger)
		return Math.round( this.hunger * 10) / 10
	}

	getBoredom(){
		return Math.round( this.boredom * 10) / 10
	}

	updateAge(){
		this.age += 1/24 //Add an hour to age
	}

	getWidth(){
		return this.width
	}

	getHeight(){
		return this.height
	}

	updateHunger(){
	
		let hungerFactor = 0
		if(this.sleeping){
			hungerFactor = .25
			this.width -= 5
			this.height -= 5
		} else {
			hungerFactor = 1
			this.width -= 10
			this.height -= 10
		}

		this.hunger += hungerFactor //Every hour you are 10% hungrier
	}

	updateBoredom(){
		let boredomFactor = 0
		if(this.sleeping){
			boredomFactor = .1
		}else {
			boredomFactor = 2
			this.opacity -= .2
		}
		this.boredom += boredomFactor //Every hour you are 20% more bored
	}

	updateSleepiness(){
		if(this.sleeping){
			this.sleepiness -= 1/8
		} else {
			this.sleepiness += 1/2 //You can be awake for 16 hours a day.
			speed -= 5000
		}

		if(this.sleepiness < 0){ this.sleepiness = 0}
	}

	isAlive(){
		if(this.hunger >= 10 || this.boredom >= 10 || this.sleepiness >=  10){
			console.log('tama is dead')
			speed = 0
			return false
		} else {
			return true
		}
	}

	feed(){ 
		console.log('in Tama feed')
		this.hunger -= 2
		if(this.hunger < 0){this.hunger = 0}
		this.width += 5
		this.height += 5	
	}

	play(){ 
		this.boredom -= 1
		if(this.boredom < 0){this.boredom = 0}
		this.opacity += .1	
		console.log('opacity', this.opacity)
	}

	toggleSleep(lightsOn){
		if(lightsOn){
			console.log('is awake')
			this.sleeping = false
		} else {
			console.log('is sleeping')
			this.sleeping = true
			speed += 1000
		}
	}
	
	



}

const game = {
	myTama: {},
	hourInSeconds: 5, //every 10 seconds is an hour in the game
	seconds: 0,
	timer: null,
	lightsOn: true,
	// speed: 20000,


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
		 		console.log('before moving. am i asleep?',this.myTama.sleeping)
		 		if(this.myTama.sleeping === false){
					animateDiv()
		 		}
				if(this.seconds === this.hourInSeconds){
					this.passTheHour()
					this.seconds = 0
				} else {
					this.seconds++
				}
		 	} else {
		 		$('#pen').append(`<h1>${this.myTama.name} is dead`)
		 		this.stopTime()
		 	}
		},1000)
	},

	passTheHour(){
			this.myTama.updateStats()
			this.printStats()

	},

	stopTime(){
		clearInterval(this.timer)
		this.printStats()
	},

	printStats(){
		$('#name').text('Name: ' + this.myTama.name)
		$('#age').text('Age: ' + this.myTama.getAge() + ' Days')
		$('#hunger').text('Hunger: ' + this.myTama.getHunger())
		$('#boredom').text('Boredom: ' + this.myTama.getBoredom())
		$('#sleepiness').text('Sleepiness: ' + this.myTama.getSleepiness())

		$('#tama').css('width', this.myTama.getWidth())
		$('#tama').css('height', this.myTama.getHeight())
		$('#tama').css('opacity', this.myTama.opacity)

	},

	switchLights(){
		if(this.lightsOn){
			this.lightsOn = false
			this.myTama.toggleSleep(this.lightsOn)
		} else {
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

let speed = 20000

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
    $('#tama').animate({ top: newq[0], left: newq[1] }, speed,   function(){
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