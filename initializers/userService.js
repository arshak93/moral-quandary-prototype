'use strict';
const ActionHero = require('actionhero');
const gameModels = require('../models/gameModels');
const User = gameModels.User;

module.exports = class UserService extends ActionHero.Initializer {
	constructor() {
		super();
		this.name = 'userService';
		this.loadPriority = 1000;
		this.startPriority = 1000;
		this.stopPriority = 1000;
	}

	async initialize() {
		ActionHero.api['userService'] = {};
		const userService = ActionHero.api.userService;

		userService.signIn = async (id, userName) => {
			return new User(id, userName);
		}
	}

	async start() {
	}

	async stop() {
	}
};
