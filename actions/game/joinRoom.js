'use strict';
const ActionHero = require('actionhero');

module.exports = class JoinRoomAction extends ActionHero.Action {
	constructor() {
		super();
		this.name = 'joinRoom';
		this.description = 'an actionhero action';
		this.outputExample = {};
		this.inputs = {
			roomId: {required: true}
		}
	}

	async run(data) {
		const api = ActionHero.api;

		let room = await api.gameService.joinRoom(data.params.roomId, data.connection.id);
		data.connection.room = room;
	}
};
