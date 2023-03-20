const express = require('express');
const passport = require('passport');
const controller = require('../controllers/controller')

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { join, login, logout } = require('../controllers/auth');

const router = express.Router();

// POST /auth/join
router.post('/join', isNotLoggedIn, join); 

// POST /auth/login
router.post('/login', isNotLoggedIn, login);

router.post('/existemail', controller.existemail)  //이메일 중복 여부
router.post('/existnick', controller.existnick) //닉네임 중복 여부
router.post('/sendemail', controller.SendEmail) //인증이메일 보내기
router.post('/search', controller.Search)  //대학교 검색하기
router.post('/askemail',controller.AskEmail)  //계정문의 메일-내게쓰기
router.post('/checknum', controller.CheckNum)//인증번호 확인
router.post('/school', controller.school)  //학교정보 전송하기

// GET /auth/logout
router.get('/logout', isLoggedIn, logout);

// GET /auth/kakao

// GET /auth/kakao/callback

module.exports = router;
