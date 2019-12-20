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
		// 
		//remove form
		$('form').remove()

		// show tama
		$('#tama').css('visibility', 'visible')
		// Name the Tamagotchi
		this.name = n

		this.startTime()


		console.log('time is ' + this.time)
		console.log('pen dims')
		console.log($('#pen').height())
		console.log($('#pen').width())
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

const penHeight = 550
const penWidth = 700
const tamaHeight = 50
const tamaWidth = 50

function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = penHeight - tamaHeight;
    var w = penWidth - tamaWidth;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
}

function animateDiv(myclass){
    var newq = makeNewPosition();
    $('#tama').animate({ top: newq[0], left: newq[1] }, 4000,   function(){
      animateDiv('#tama');        
    });
    
};


/////animation

//Listeners
$( "form" ).submit((event) => {
  event.preventDefault();
  game.play($('input').val())
});

