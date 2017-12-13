'use strict';
const ActionHero = require('actionhero');

module.exports = class MyInitializer extends ActionHero.Initializer {
	constructor() {
		super();
		this.name = 'networking';
		this.loadPriority = 1000;
		this.startPriority = 1000;
		this.stopPriority = 1000;
	}

	async initialize() {
		ActionHero.api['networking'] = {};
		const api = ActionHero.api;
		const networking = api.networking;

		networking.pushToAll = async (roomId, action, data) => {
			data.action = action;
			const json = JSON.stringify(data);
			await api.chatRoom.broadcast({}, roomId, data);
		};
	}

	async start() {
	}

	async stop() {
	}
};
