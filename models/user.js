//sequelize user
//이름,카카오톡ID,학과, 입학년도,비밀번호(재확인)
//대학(csv선택),대학 웹메일 주소(인증 필요)
const Sequelize = require('sequelize');
const crypto = require('crypto')

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {//이름
        type: Sequelize.STRING(6),
        allowNull: false,
      },
      kakaoID: {//카카오톡ID
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true
      },
      university: {//대학
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      major: {//학과
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      year: {//입학년도
        type: Sequelize.STRING(7),
        allowNull: false,
      },
      email: {//대학 웹메일
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true,
      },
      password: {//비밀번호
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      nick: {//닉네임
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
      },
      introduce: {//자기소개
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      
    }, {
      sequelize,
      timestamps: true,   //만든시간, 수정일 기록
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,  //soft delete
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

};



