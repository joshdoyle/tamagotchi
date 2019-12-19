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

	play(n){
		this.name = n
	}
	
}





//Listeners
$( "form" ).submit((event) => {
  event.preventDefault();
  game.play($('input').val())
});

