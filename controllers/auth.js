const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

exports.join = async (req, res, next) => {
  
  const { name, kakaoID, university, major, year, email, password, nick, introduce } = req.body  
  // const name = "김수연"
  // const kakaoID = "suys6"
  // const university= "인천대학교"
  // const major= "산업경영공학과"
  // const year= "2021"
  // const email= "suys0605@gmail.com"
  // const password= "010605"
  // const nick= "suys"
  // const introduce= "안녕하세요"


  try {
    const hash = await bcrypt.hash(password, 12);
    //console.log(name, kakaoID, university, major, year, email, hash, nick, introduce)
    await User.create({
      name,
      kakaoID,
      university,
      major,
      year,
      email,
      password : hash,
      nick,
      introduce
    });
    return res.status(200).send("join success");
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

exports.login = (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(404).send("No user");
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.status(200).send("login success");  //로그인 성공시 뭐?
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
};
