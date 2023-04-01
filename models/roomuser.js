const Sequelize = require('sequelize');

module.exports = class RoomUser extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        rooms_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'rooms',
              key: 'id',
              onUpdate: 'CASCADE',
              onDelete: 'CASCADE',
            },
          },
        users_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'users',
              key: 'id',
              onUpdate: 'CASCADE',
              onDelete: 'CASCADE',
            },
        }  
    }, {
      sequelize,
      timestamps: true,   //만든시간, 수정일 기록
      underscored: false,
      modelName: 'RoomUser',
      tableName: 'roomusers',
      paranoid: true,  //soft delete
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

};



