//sequelize user
//이름,카카오톡ID,학과, 입학년도,비밀번호(재확인)
//대학(csv선택),대학 웹메일 주소(인증 필요)
const Sequelize = require('sequelize');

module.exports = class Checknum extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      email: {//대학 웹메일
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true,
      },
      checknum: {//인증번호
        type: Sequelize.STRING(6),
        allowNull: false,
      },
      time: {//만료시간
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      
    }, {
      sequelize,
      timestamps: true,   //만든시간, 수정일 기록
      underscored: false,
      modelName: 'Checknum',
      tableName: 'checknums',
      paranoid: true,  //soft delete
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

};



