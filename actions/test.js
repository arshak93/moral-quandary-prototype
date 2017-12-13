'use strict';
const ActionHero = require('actionhero');

module.exports = class Test extends ActionHero.Action {
	constructor() {
		super();
		this.name = 'test';
		this.description = 'an actionhero action';
		this.outputExample = {};
	}

	async run(data) {
		data.response.data = {};
		data.response.data.quandary = await ActionHero.api.quandaryService.getRandomQuandary();
	}
};
