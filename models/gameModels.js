class User {

	constructor(id, name) {
		this.id = id;
		this.name = name;
	}
}
module.exports.User = User;

class Game {

	constructor(quandary) {
		this.quandary = quandary;
		this.users = [];
	}

	addUser(user) {
		this.users.push(user);
	}
}
module.exports.Game = Game;

class GameResult {

	constructor(game) {
		this.game = game;
		this.userResults = new Map();

		for(let user of game.users) {
			this.userResults.set(user.id, new UserResult(user));
		}
	}

	addAnswer(userId, answer) {
		this.userResults.get(userId).answer = answer;
	}

	addPrediction(senderId, targetId, prediction) {
		this.userResults.get(targetId).addPrediction(prediction, senderId);
	}

	get complete() {
		const userNumber = this.game.users.length;

		for(let userResult of this.userResults.values()) {
			if(userResult.predictionCount !== userNumber - 1) {
				return false;
			}
		}

		return true;
	}

	get view() {
		let result = {};
		result.userResults = [];

		for(let userResult of this.userResults.values()) {
			result.userResults.push(userResult.view);
		}

		return result;
	}
}
module.exports.GameResult = GameResult;

class UserResult {

	constructor(user) {
		this.user = user;
		this.answer = undefined;
		this.predictions = new Map([['Yes', new Set()], ['No', new Set()]]);
	}

	addPrediction(prediction, senderId) {
		this.predictions.get(prediction).add(senderId);
	}

	get predictionCount() {
		return this.predictions.get('Yes').size + this.predictions.get('No').size;
	}

	get view() {
		let result = {};
		result.user = this.user;
		result.answer = this.answer;
		result.predictions = {};

		for(let answer of this.predictions.keys()) {
			result.predictions[answer] = [];
			for(let prediction of this.predictions.get(answer)) {
				result.predictions[answer].push(prediction);
			}
		}

		return result;
	}
}
module.exports.UserResult = UserResult;

class Quandary {

	constructor(question) {
		this.question = question;
	}
}
module.exports.Quandary = Quandary;