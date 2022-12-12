const Player = require("../model/playerModel");
const catchAsync = require("../utils/catchAsync");
const {
  factoryCreateOne,
  factoryGetAll,
  factoryGetOne,
  factoryUpdateOne,
  factoryDeleteOne,
} = require("./factoryController");

exports.getAllPlayers = factoryGetAll(Player);
exports.getOnePlayer = factoryGetOne(Player);
exports.createOnePlayer = factoryCreateOne(Player);
exports.updateOnePlayer = factoryUpdateOne(Player);
exports.deleteOnePlayer = factoryDeleteOne(Player);
