'use strict';
const ActionHero = require('actionhero');
const {Game, GameResult} = require('../models/gameModels');

module.exports = class GameServiceInitializer extends ActionHero.Initializer {
	constructor() {
		super();
		this.name = 'gameService';
		this.loadPriority = 1000;
		this.startPriority = 1000;
		this.stopPriority = 1000;
	}

	async initialize() {
		ActionHero.api['gameService'] = {};
		const api = ActionHero.api;
		const gameService = api.gameService;
		gameService.usersNumber = 4;
		gameService.gameResults = {};

		api.chatRoom.generateMemberDetails = (connection) => {
			return {
				id: connection.id,
				user: connection.user
			};
		};

		api.chatRoom.sanitizeMemberDetails = (memberData) => {
			return {
				id: memberData.id,
				user: memberData.user
			};
		};

		gameService.resetGame = async (roomId) => {
			let exists = await api.chatRoom.exists(roomId);

			if(exists) {
				await api.chatRoom.destroy(roomId);
			}
		};

		gameService.joinRoom = async (roomId, connectionId) => {
			let exists = await api.chatRoom.exists(roomId);

			if (!exists) {
				await api.chatRoom.add(roomId);
			}

			await api.chatRoom.addMember(connectionId, roomId);
			let roomStatus = await api.chatRoom.roomStatus(roomId);

			if (roomStatus.membersCount === gameService.usersNumber) {
				let game = await gameService.createGame(roomStatus.members, roomId);
				api.networking.pushToAll(roomId, 'gameStart', game);
			}

			return roomId;
		};

		gameService.createGame = async (roomMembers, roomId) => {
			let quandary = await api.quandaryService.getRandomQuandary();
			let game = new Game(quandary);

			for (let roomMemberId in roomMembers) {
				if (roomMembers.hasOwnProperty(roomMemberId)) {
					game.addUser(roomMembers[roomMemberId].user);
				}
			}

			gameService.gameResults[roomId] = new GameResult(game);

			return game;
		};

		gameService.addAnswer = async (roomId, userId, answer) => {
			const gameResult = gameService.gameResults[roomId];
			gameResult.addAnswer(userId, answer);
		};

		gameService.addPrediction = async (roomId, senderId, targetUserId, answer) => {
			const gameResult = gameService.gameResults[roomId];
			gameResult.addPrediction(senderId, targetUserId, answer);

			if (gameResult.complete) {
				let push = {
					gameResult: gameResult.view
				};
				api.networking.pushToAll(roomId, 'gameEnd', push);
			}
		};
	}

	async start() {
	}

	async stop() {
	}
};