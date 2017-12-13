'use strict';
const ActionHero = require('actionhero');

module.exports = class MyAction extends ActionHero.Action {
	constructor() {
		super();
		this.name = 'resetGame';
		this.description = 'an actionhero action';
		this.outputExample = {};
		this.inputs = {
			roomId: {required: true}
		}
	}

	async run(data) {
		const api = ActionHero.api;

		await api.gameService.resetGame(data.params.roomId);
	}
};
