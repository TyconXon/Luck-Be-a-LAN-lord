const WAREHOUSE = {
	EMPTY : new Symbol({name: "empty", rarity: -1, skip:1, calculate: (self)=>{return 0;}}),
	CAT: new Symbol({name: "cat", rarity: 0, calculate: async (self)=>{
		
		let countingCoins = 1;
		countingCoins += 9 * await eat("milk", self);


		return countingCoins;    
	}}),

	MILK: new Symbol({name: "milk", rarity: 0, calculate: async(self)=>{
		return 1;    
	}}),

	ANCHOR: new Symbol({name: "anchor", rarity: 0, calculate: async(self)=>{
		if (((self.x == 3 || self.x == 0) && (self.y == 0 || self.y == 4))){
			return 5;
		}
		return 1;
	}, aquatic: 1}),

	BANANA: new Symbol({name: "banana", rarity: 0, calculate: async(self)=>{
		return 1;
	}, onDestroy: (self)=>{
		addSymbol(WAREHOUSE.BANANA_PEEL);
	}, monkeyLikes: 1, fruit: 1,}),

	BANANA_PEEL: new Symbol({name: "banana peel", rarity: 0, calculate: async(self)=>{
		return 1;    
	}}),

	BEE: new Symbol({name: "bee", rarity: 0, calculate: async(self)=>{
		return 1 + await bonus("flower", self);
	}}),

	BEER: new Symbol({name: "beer", rarity: 0, calculate: async(self)=>{
		return 1;    
	}, alch: 1}),
	
	BOUNTY_HUNTER: new Symbol({name: "bounty hunter", rarity: 0, calculate: async(self)=>{
		let countingCoins = 1;
		countingCoins += await eat("thief", self) * 20 

		return countingCoins; 
	}, human: 1}),

	BUBBLE: new Symbol({name: "bubble", rarity: 0, calculate: async(self)=>{
		self.timer = self.timer - 1 || 4;
		if(self.timer == 1){
			destroySymbol(self);
			self.e.css("opacity", "0.25");                 
		}
		return 2;    
	}, babyLikes: 1}),

	CANDY: new Symbol({name: "candy", rarity: 0, calculate: async(self)=>{
		return 1;    
	}, babyLikes: 1,}),

	CHEESE: new Symbol({name: "cheese", rarity: 0, calculate: async(self)=>{
		return 1;    
	}}),

	CHERRY: new Symbol({name: "cherry", rarity: 0, calculate: async(self)=>{
		return 1;    
	},fruit: 1,}),

	COAL: new Symbol({name: "coal", rarity: 0, calculate: async(self)=>{
		self.timer = self.timer - 1 || 21;
		if(self.timer == 1){
			destroySymbol(self);
			self.e.css("opacity", "0.25");                 
		}
		return 0;   
	}}),

	COIN: new Symbol({name: "coin", rarity: 0, calculate: async(self)=>{
		return 1;    
	}}),

	CRAB: new Symbol({name: "crab", rarity: 0, calculate: async(self)=>{
		let countingCoins = 0;
		for (element of slots[self.x]){
			if (element.symbol.name == "crab"){
				countingCoins+=1;
			}
		}
		return countingCoins;
	}}),

	CROW: new Symbol({name: "crow", rarity: 0, calculate: async(self)=>{
		self.timer = self.timer - 1 || 5;
		if(self.timer == 1){
			return -3;
		}
		return 2;   
	}}),


	CULTIST: new Symbol({name: "cultist", rarity: 0, calculate: async(self)=>{
		let countingCoins = -1;
		slots.forEach(row => {
			countingCoins += _.filter(row, (value) => {
			return value.symbol.name == "cultist";
			}).length
		});
		return countingCoins;
	}, human: 1}),
	
	DOG: new Symbol({name: "dog", rarity: 0, calculate: async(self)=>{

		for (element of adjacentSlots(self.y, self.x)){
			if (element.symbol.human) {
				element.e.css("outline", "white 2px solid");
				await delay(500);
				element.e.css("outline", "none");
				return 3;
			}
		};

		return 1;
	}}),

	DWARF: new Symbol({name: "dwarf", rarity: 0, calculate: async (self)=>{
		
		let countingCoins = 1;
		for (element of adjacentSlots(self.y, self.x)){
			if (element.symbol.alch) {
				countingCoins += await element.calculate() * 10;
				element.e.css("opacity", "1.0");                 
				element.e.css("outline", "white 2px solid");
				await delay(500);
				element.e.css("opacity", "0.25");                 
				await delay(500);
				element.e.css("outline", "none");
				destroySymbol(element)

			}
		};

		return countingCoins;    
	}, human:1}),

	EGG: new Symbol({name: "egg", rarity: 0, calculate: async(self)=>{
		return 1;    
	}}),

	FLOWER: new Symbol({name: "flower", rarity: 0, calculate: async(self)=>{
		return 1;    
	}}),

	GAMBLER: new Symbol({name: "gambler", rarity: 0, calculate: async(self)=>{
		self.savings = self.savings+1 || 1;
		return 1;    
	}, onDestroy: (self)=>{
		return self.savings || 1;
	},  human: 1}),

	GOLDFISH: new Symbol({name: "goldfish", rarity: 0, calculate: async (self)=>{
		return 1 + (15 * await eat("bubble", self));    
	}}),

	GOOSE: new Symbol({name: "goose", rarity: 0, calculate: async(self)=>{
		return 1;    
	}, bird: 1}),

	KEY: new Symbol({name: "key", rarity: 0, calculate: async(self)=>{
		let findBoxes = await eatType("box", self); 
		if (findBoxes > 0){
			destroySymbol(self);
			self.e.css("opacity", "0.25");                 
			self.e.css({"color":"red"}); 
		}
		return 1 + findBoxes;
	}}),

	LIGHT_BULB: new Symbol({name: "light bulb", rarity: 0, calculate: async(self)=>{
		let result = await bonusType("rock", self);
		self.uses = self.user - 1 || 6;
		if(self.uses == 1){
			destroySymbol(self)
			self.e.css("opacity", "0.25"); 
		}
		return 1 + (result * 2);    
	}}),

	LOCKBOX: new Symbol({name: "lockbox", rarity: 0, calculate: async(self)=>{
		return 1;    
	}, box: 15}),

	MAGPIE: new Symbol({name: "magpie", rarity: 0, calculate: async(self)=>{
		self.timer = self.timer - 1 || 5;
		if(self.timer == 1){
			return 9;
		}
		return -1;  
	}, bird: 1}),

	MINER: new Symbol({name: "miner", rarity: 0, calculate: async (self)=>{
		
		let countingCoins = 1;
		countingCoins += 20 * await eatType("ore", self);

		return countingCoins;    
	}, human:1}),

	MONKEY: new Symbol({name: "monkey", rarity: 0, calculate: async (self)=>{
		return 1 + (6 * await eatType("monkeyLikes", self));    
	}, beast: 1}),

	GOLDFISH: new Symbol({name: "goldfish", rarity: 0, calculate: async (self)=>{
		return 1 + (20 * await eat("cheese", self));    
	}, beast:1}),

	ORE: new Symbol({name: "ore", rarity: 0, calculate: async(self)=>{
		return 1;    
	}, onDestroy: (self)=>{
		addSymbol(WAREHOUSE.SAPPHIRE);
	}, ore:1}),

	OWL: new Symbol({name: "owl", rarity: 0, calculate: async(self)=>{
		self.timer = self.timer - 1 || 4;
		if(self.timer == 1){
			return 2;
		}
		return 1;  
	}, bird: 1}),

	OYSTER: new Symbol({name: "oyster", rarity: 0, calculate: async(self)=>{
		if(_.random(0, 10) == 10){
			self.e.text((unu, l)=>{return l+"!"});
			addSymbol(WAREHOUSE.PEARL)
		}
		return 1;

	}, aquatic:1}),

	PEARL: new Symbol({name: "pearl", rarity: 0, calculate: async(self)=>{
		return 1;    
	}, aquatic:1, rock:1}),

	PRESENT: new Symbol({name: "present", rarity: 0, calculate: async(self)=>{
		self.timer = self.timer - 1 || 13;
		if(self.timer == 1){
			destroySymbol(self);
			self.e.css("opacity", "0.25");                 
			return 10;
		}
		return 0;    
	}, babyLikes:1}),

	SEED: new Symbol({name: "seed", rarity: 0, calculate: async(self)=>{
		return 1;    
	}}),
	
	SHINY_PEBBLE: new Symbol({name: "shiny pebble", rarity: 0, calculate: async(self)=>{
		return 1;    
	}, rock:1}),

	SNAIL: new Symbol({name: "snail", rarity: 0, calculate: async(self)=>{
		self.timer = self.timer - 1 || 5;
		if(self.timer == 1){
			return 5;
		}
		return 0;  
	}, aquatic: 1}),

	THREE_SIDED_DIE: new Symbol({name: "d3", rarity: 0, calculate: async(self)=>{
		let result = _.random(1,3);
		if(result == 1){
			for (var row of slots){
				let fR = _.filter(row, (value) => {
					return value.symbol.name == "gambler";
				});
				for (const element of Object.keys(fR)) {
					fR[element].e.text(fR[element].symbol.name);
					fR[element].e.css("outline", "white 2px solid");
					await delay(500);
					fR[element].e.text("+"+destroySymbol(fR[element]));
					await delay(500);
					fR[element].e.css("outline", "none");
					
				}
			}
		}
		return result;
	}, dice: 1}),

	TODDLER: new Symbol({name: "toddler", rarity: 0, calculate: async (self)=>{
		return 1 + (6 * await eatType("babyLikes", self));    
	}, human: 1}),

	TURTLE: new Symbol({name: "turtle", rarity: 0, calculate: async(self)=>{
		self.timer = self.timer - 1 || 4;
		if(self.timer == 1){
			return 4;
		}
		return 0;  
	}, aquatic: 1}),

	URN: new Symbol({name: "urn", rarity: 0, calculate: async(self)=>{
		return 1;    
	}, urn: 1}),

	BAR_OF_SOAP: new Symbol({name: "bar of soap", rarity: 1, calculate: async(self)=>{
		self.timer = self.timer - 1 || 4;
		addSymbol(WAREHOUSE.BUBBLE);
		if(self.timer == 1){
			destroySymbol(self);
			self.e.css("opacity", "0.25");                 
		}
		return 1;    
	}}),

	BEAR: new Symbol({name: "bear", rarity: 1, calculate: async(self)=>{
		return 2;    
	}}),

	BIG_ORE: new Symbol({name: "big ore", rarity: 1, calculate: async(self)=>{
		return 2;    
	}, onDestroy: (self)=>{
		addSymbol(WAREHOUSE.SAPPHIRE);
		addSymbol(WAREHOUSE.SAPPHIRE);
	}, ore:2}),

	BIG_URN: new Symbol({name: "big urn", rarity: 1, calculate: async(self)=>{
		return 2;    
	}, urn:2}),

	BILLIONAIRE: new Symbol({name: "billionaire", rarity: 1, calculate: async(self)=>{
		return 0;    
	}}),

	// BRONZE_ARROW: new Symbol({name: "bronze arrow", rarity: 1, calculate: async(self)=>{
	//     return 0;  //placeholder   
	// }}),

	FIVE_SIDED_DIE: new Symbol({name: "d5", rarity: 1, calculate: async(self)=>{
		let result = _.random(1,5);
		if(result == 1){
			for (var row of slots){
				let fR = _.filter(row, (value) => {
					return value.symbol.name == "gambler";
				});
				for (const element of Object.keys(fR)) {
					fR[element].e.css("opacity", "1.0");
					fR[element].e.css("outline", "white 2px solid");
					await delay(500);
					fR[element].e.text("+"+destroySymbol(fR[element]));
					await delay(500);
					fR[element].e.css("outline", "none");
					
				}
			}
		}
		return result;
	}, dice: 2}),

	GOLEM: new Symbol({name: "golem", rarity: 1, calculate: async(self)=>{
		self.timer = self.timer - 1 || 6;
		if(self.timer == 1){
			destroySymbol(self);
			_.times(5,()=>{addSymbol(WAREHOUSE.ORE)});
			self.e.css("opacity", "0.25");
		}
		return 0;   
	}}),

	HOOLIGAN: new Symbol({name: "hooligan", rarity: 1, calculate: async (self)=>{
		
		let countingCoins = 1;
		countingCoins += 6 * await eatType("urn", self);

		return countingCoins;    
	}, human:1}),

	PINATA: new Symbol({name: "pinata", rarity: 1, calculate: async(self)=>{
		return 1;    
	}, onDestroy: (self)=>{
		_.times(7, ()=>{addSymbol(WAREHOUSE.CANDY);}); 
	}, babyLikes: 1,}),

	SAFE: new Symbol({name: "safe", rarity: 1, calculate: async(self)=>{
		return 1;    
	}, box: 30}),

	SAPPHIRE: new Symbol({name: "sapphire", rarity: 1, calculate: async(self)=>{
		return 2;    
	}, rock: 2}),

	THIEF: new Symbol({name: "thief", rarity: 1, calculate: async(self)=>{
		self.savings = self.savings+4 || 1;
		return -1;    
	}, onDestroy: (self)=>{
		return self.savings || 1;
	},  human: 1}),

	VOID_CREATURE: new Symbol({name: "void creature", rarity: 1, calculate: async(self)=>{
		let result = await bonus("empty", self);
		if(result == 0){
			destroySymbol(self);
			self.e.css("opacity", "0.25");
			return 8;
		}
		return 1 + (result * 2);    
	}}),

	WEALTHY_CAPSULE: new Symbol({name: "lucky capsule", rarity: 1, calculate: async(self)=>{
		destroySymbol(self);
		self.e.css("opacity", "0.25");
		return 10;
	}, babyLikes:1}),

	WINE: new Symbol({name: "wine", rarity: 1, calculate: async(self)=>{
		return 2;    
	}, alch: 2}),


}; 
const STOREROOM = {
	ANTHROPOLOGY_DEGREE: {name:"Anthropology Degree", rarity:3, calculate: (self,context,base)=>{
		if (typeof context == typeof STOREROOM){
			return context.symbol.human?1:0;
		}else { return 0; }
	}},
	BIRDHOUSE: {name:"Birdhouse", rarity:1, calculate: (self,context,base)=>{
		if (typeof context == typeof STOREROOM){
			return context.symbol.bird?1:0;
		}else { return 0; }
	}},
	BLACK_CAT: {name:"Black Cat",rarity:2, calculate: (self,context,base)=>{
		if (typeof context == typeof STOREROOM){
			return context.symbol.name == "cat"?1:0;
		}else if(context == "onCount"){
			return base%0==0?9:0;
		} else { return 0; }
	}},
	BLACK_PEPPER: {name:"Black Pepper",rarity:1, calculate: (self,context,base)=>{
		if(context == "onCount"){
			let old = self.count || 0;
			self.count = 0;
			return old;
		} else if(context == "onDestroy"){
			self.count = self.count+1 || 1;
			return 0;
		} else { return 0; }
	}},
	BROWN_PEPPER: {name:"Brown Pepper",rarity:1, calculate: (self,context,base)=>{
		if(context == "onCount"){
			let old = self.count || 0;
			self.count = 0;
			return old;
		} else if(context == "onAdded"){
			self.count = self.count+1 || 1;
			return 0;
		} else { return 0; }
	}},
	BOWLING_BALL: {name:"Bowling Ball",rarity:4, calculate: (self,context,base)=>{
		if(context == "onCount"){
			return 3;
		} else { return 0; }
	}},
};
//}End of WAREHOUSE (EOW)