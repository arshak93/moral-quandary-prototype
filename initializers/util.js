'use strict';
const ActionHero = require('actionhero');

module.exports = class UtilInitializer extends ActionHero.Initializer {
	constructor() {
		super();
		this.name = 'util';
		this.loadPriority = 1000;
		this.startPriority = 1000;
		this.stopPriority = 1000;
	}

	async initialize() {
		//ActionHero.api['utils'] = {};
		const utils = ActionHero.api.utils;

		utils.shuffle = (array) => {
			return array.sort(() => Math.random() - 0.5);
		};

		utils.randomInt = (min, max) => {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min)) + min;
		};

		utils.randomFromArray = (array) => {
			return array[utils.randomInt(0, array.length)];
		};
	}

	async start() {
	}

	async stop() {
	}
};
