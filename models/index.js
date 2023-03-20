//sequelize index

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Checknum = require('./checknum');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Checknum = Checknum;

User.init(sequelize);
Checknum.init(sequelize);

User.associate = db;
Checknum.associate = db;
module.exports = db.User,db.Checknum;
