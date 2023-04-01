//sequelize index

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Checknum = require('./checknum');
const Room = require('./room');
const RoomUser = require('./roomuser');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;

db.User = User;
db.Checknum = Checknum;
db.Room = Room;
db.RoomUser = RoomUser;

User.init(sequelize);
Checknum.init(sequelize);
Room.init(sequelize);
RoomUser.init(sequelize);

User.associate = db;
Checknum.associate = db;
Room.associate = db;
RoomUser.associate = db;

module.exports = db
