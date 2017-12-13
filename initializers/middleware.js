'use strict';
const {Initializer, api} = require('actionhero');

module.exports = class RequestMiddleware extends Initializer {
	constructor() {
		super();
		this.name = 'requestMiddleware';
		this.loadPriority = 1000;
		this.startPriority = 1000;
		this.stopPriority = 1000;
	}

	async initialize() {
		const actionMiddleware = {
			name: this.name,
			global: true,
			preProcessor: async (data) => {
				if (data.connection.type === 'websocket' && !data.actionTemplate.test && !data.params.requestId) {
					throw Error('All requests require a requestId');
				} else {
					data.response.id = data.params.requestId;
				}

				data.response.data = {};
			}
		};

		api.actions.addMiddleware(actionMiddleware);

		const connectionMiddleware = {
			name: 'connection middleware',
			priority: 1000,
			create: (connection) => {
				//api.log('connection joined')
			},
			destroy: (connection) => {
				//api.log('connection left')
				if(connection.room) {
					api.chatRoom.removeMember(connection.id, connection.room);
				}
			}
		};

		api.connections.addMiddleware(connectionMiddleware)
	}

	async start() {
	}

	async stop() {
	}
};
