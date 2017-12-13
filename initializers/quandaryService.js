'use strict';
const Actionhero = require('actionhero');
const gameModels = require('../models/gameModels');
const Quandary = gameModels.Quandary;

module.exports = class QuandaryServiceInitializer extends Actionhero.Initializer {
	constructor() {
		super();
		this.name = 'quandaryService';
		this.loadPriority = 1000;
		this.startPriority = 1000;
		this.stopPriority = 1000;
	}

	async initialize() {
		const api = Actionhero.api;
		api['quandaryService'] = {};

		const quandaries = [
			'A colleague you detest comes out of the restroom unaware of a long piece of TP stuck to his shoe. He’s headed to an important meeting. Do you tell him about his paper trail?',
			'The waiter at the posh restaurant you are dining at inadvertently forgot to bill you for one of the entrees on the tab. Do you bring it to his attention?',
			'A friend who is a bit irresponsible with money asks to borrow $500 from you. Would you lend her the Benjamins?',
			'The stray cat that your kids adopted six months ago was apparently not abandoned. A Lost & Found notice picturing the runaway has just come to your attention. Your kids love the pet. Do you return it to it’s rightful owner?',
			'Two businessmen are heading towards your elevator. You’re late for a meeting. Do you press the “DOOR CLOSE” button so they have to take another car?',
			'One of your dinner guests is a vegetarian. You inadvertently added some chicken stock to the rice dish you made for her. Do you tell her that when you serve it?',
			'Happy First Anniversary! Unfortunately 365 days have passed and you still have not written those pesky thank you notes for the wedding gifts. Would you do so now, a whole year later?',
			'It’s Black Friday and you’ve been waiting in line for 5 hours for the Apple Store to open. A friend spots you and asks to cut in line. Would you let her?',
			'On a crowded subway, you see the stranger next to you being pickpocketed. Do you intervene and try to stop the crime from happening?',
			'A guy at your gym is a notorious treadmill hogger. He never gets off the machine when he should. Do you complain to the management about him?',
			'You finally meet “The One” after many broken romances. Everything is right about this person except he still lives at home with his parents. Would you continue to date him?',
			'Your faithful pooch of eight years has recently attacked a neighbor. Do you put your loyal companion down, if directed to do so by the Animal Control Officer?',
			'A former employee who you like a lot, but was a bit of a goof-off, asks you for a letter of recommendation. Would you write one?',
			'Your roomie’s friend needs a place to bunk while her apartment is being treated for a bedbug infestation. Do you green-light her stay?',
			'You are pet-sitting a hamster for the family next door and the little beast dies on your watch. Do you replace it with a look-alike from the pet store and not tell the neighbors?',
			'The “envelope” is being passed at work for a colleague who is getting married. This will be her fourth trip down the aisle. Do you still contribute?',
			'At the playground, an unsupervised kid is annoying your 4 year old and the other children. Do you ask the brat’s mother to rein him in?',
			'Someone at work is selling Girl Scout cookies for his daughter. Everyone is buying some. You do not like this colleague. Would you still order a box?',
			'Someone you work with has fertility issues, To your delight you just discovered you’re pregnant! Do you openly announce the good news to all of your colleagues?',
			'A friend gifts you with a lottery ticket for your birthday that makes you $10,000 richer. Do you share the winnings evenly with your pal, sharing the pot 50-50?',
			'One of your customers on your newspaper route is cheap with her tips. Do you ever toss her morning paper in a puddle to get even?',
			'While stirring the chili at the diner you work at, a Band-aid on your finger slips off and lands right in the pot. You can’t find it. Do you still serve the Southwest special for lunch?',
			'At a restaurant, someone at the next table is choking. Would you jump up and perform the Heimlich maneuver on him even if you have never done it before?',
			'At a swanky restaurant, the chef is visiting tables to ask if the patrons enjoyed their dinners. Your meal was a disappointment. Do you tell her?',
			'You’ve accepted an invitation to a good friend’s goodbye party a few weeks prior to the event. A day before, your crush asks you out on a date, but the only time they’re available is during the party. Do you cancel on your friend?',
			'Your property borders a high school. You’ve noticed teens jumping the fence, even though you’ve put up “No Trespassing” signs in order to protect your garden. Do you add an electric fence?',
			'Your friend is a passionate musician who has sacrificed everything to pursue their career, but they aren’t very good. They ask you to be honest about what you really think about their music. Do you tell the truth?',
			'You’re babysitting a 3-year-old for a family that you’ve just met. While you’re babysitting, the child slips and hits their head. Even though there is no visible mark, the child is very upset for about 15 minutes. Do you tell the parents what happened when they come home?',
			'You’re the only witness to a car crash and are positive you know who is at fault, but you’re on your way to have dinner with a friend and waiting to report the incident will make you really late. Do you stop and wait to give a report to the police?',
			'You and your roommate have a four-bedroom apartment in New York City and must fill the other two rooms. You post an ad on craigslist. Would you list the other rooms at a higher price so that you and your roommate can pay less?',
			'You’ve agreed to look after a neighbor’s cat while they’re away for a week. You forget to go until the last day. The cat is fine, but they agreed to pay you for checking on the cat every day. Do you confess?',
			'You have a five-page paper due tomorrow, and you totally forgot about it. You go online and find an article on the subject that you’re assigned to write about, and think you can make it sound like your own. Do you plagiarize?',
			'You’ve just gotten out of a movie at the theatre and notice another movie you want to see is just starting across the hallway. You have nothing else to do that afternoon. Do you go in and watch the movie without paying?',
			'You’re a waiter and about to wait on a table of people that come in at least once a week, but never tip. Do you give them good service?',
			'The sign at the gas station says “do not top off.” Do you top off?'
			];

		api.quandaryService.getRandomQuandary = async () => {
			return new Quandary(api.utils.randomFromArray(quandaries));
		}
	}

	async start() {
	}

	async stop() {
	}
};
