'use strict';
const ActionHero = require('actionhero');

module.exports = class MyAction extends ActionHero.Action {
	constructor() {
		super();
		this.name = 'predictAnswer';
		this.description = 'an actionhero action';
		this.outputExample = {};
		this.inputs = {
			targetUserId: {required: true},
			answer: {required: true}
		};
	}

	async run(data) {
		const api = ActionHero.api;
		const roomId = data.connection.room;

		api.gameService.addPrediction(roomId, data.connection.user.id, data.params.targetUserId, data.params.answer);
	}
};
