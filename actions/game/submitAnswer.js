'use strict';
const ActionHero = require('actionhero');

module.exports = class MyAction extends ActionHero.Action {
	constructor() {
		super();
		this.name = 'submitAnswer';
		this.description = 'an actionhero action';
		this.outputExample = {};
		this.inputs = {
			answer: {required: true}
		};
	}

	async run(data) {
		const api = ActionHero.api;
		const roomId = data.connection.room;

		api.gameService.addAnswer(roomId, data.connection.user.id, data.params.answer);
	}
};
