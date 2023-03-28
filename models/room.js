const Sequelize = require('sequelize');

module.exports = class Room extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {//이름
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true,
      },
      member: {//멤버 수
        type: Sequelize.INTEGER(2),
        allowNull: false,
      },
      gender: {//성별
        type: Sequelize.STRING(3),
        allowNull: false,
      },
      introduce: {//소개
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      year: {//평균 입학년도
        type: Sequelize.STRING(7),
        allowNull: false,
      },     
    }, {
      sequelize,
      timestamps: true,   //만든시간, 수정일 기록
      underscored: false,
      modelName: 'Room',
      tableName: 'rooms',
      paranoid: true,  //soft delete
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Room.belongToMany(db.User, {through: 'RoomUser'})
  }

};



