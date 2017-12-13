'use strict';
const ActionHero = require('actionhero');

module.exports = class SignInAction extends ActionHero.Action {
	constructor() {
		super();
		this.name = 'signIn';
		this.description = 'an actionhero action';
		this.outputExample = {};
		this.blockedConnectionTypes = ["web"];
		this.inputs = {
			userName: {require: true}
		};
	}

	async run(data) {
		const api = ActionHero.api;

		let user = await api.userService.signIn(data.connection.id, data.params.userName);

		data.connection.user = user;
		data.response.data.user = user;
	}
};
