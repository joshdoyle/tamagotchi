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
			},1000)

	},

	stopTime(){
		clearInterval(this.timer)
	}	
}





//Listeners
$( "form" ).submit((event) => {
  event.preventDefault();
  game.play($('input').val())
});

