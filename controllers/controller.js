const nodemailer = require('nodemailer');
const User = require('../models/user')
const Checknum = require('../models/checknum')
const { smtpTransport } = require('../config/email');
const XLSX = require('xlsx')
const express = require('express');
const dotenv = require('dotenv')
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const Sequelize = require('sequelize');
const sequelize = new Sequelize( config.database, config.username, config.password, config,);
const query = 'SELECT * FROM school';

//이메일 중복확인
exports.existemail = async (req, res, next) => {
    
    const {email} = req.body;
    try {
        const exUser = await User.findOne({ where: { email } });
        if (exUser) {
            return res.status(200).send(false);   //중복이야
        }
        return res.status(200).send(true);   //중복 아님
    
        
    } catch (error) {
        console.error(error);
        return next(error);
    }
};


//닉네임중복확인
exports.existnick = async (req, res, next) => {
    
    const {nick} = req.body;
    try {
        const exUser = await User.findOne({ where: { nick } });
        if (!exUser) {
            return res.status(200).send(true);  //중복x
        }
        return res.status(200).send(false);   //중복o
    
        
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

//이메일 보내기


/* min ~ max까지 랜덤으로 숫자를 생성하는 함수 */ 

exports.SendEmail = async(req, res, next) => {
    var generateRandom = function (min, max) {
        var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
        return ranNum;
      }
    const number = generateRandom(111111,999999)

    const { email } = req.body;
    //const email = "suys010605@gmail.com"
    try{
        let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS,
        },
      });
    
      // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `"UNIVERSITING" <${process.env.NODEMAILER_USER}>`,
            to: email,
            subject: 'UNIVERSITING 인증메일입니다',  //제목
            text: "인증번호는 "+number+" 입니다.\n5분안에 인증번호를 입력하세요",
            //html: `<b>${"인증번호는 "+number+" 입니다.\n인증번호를 입력하세요"}</b>`
        });
        const time = Date.now() + (5 * 60 * 1000)  //만료시간 5분
        const exUser = await Checknum.findOne({ where: { email } });
        if (!exUser) {
            await Checknum.create({   //인증번호 db create
                email,
                checknum : number,
                time
            })
        }
        if (exUser) {  //이미 존재하면 새 인증번호와 시간으로 업데이트
            await Checknum.update({checknum:number,time:time},{where:{email:email}})
        }
        res.status(200).json({
            status: 'Success',
            code: 200,
            number: number
        });
    } catch (error) {
        console.error(error);
        return next(error);
      }
}
    
//대학교 검색하기  인->인천대...인하대...//안사용할듯
exports.Search = async(req, res, next) => {
    const workbook = XLSX.readFile('학교이름주소.xlsx');
    const sheet_name_list = workbook.SheetNames;
    const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    const arr=[]
    //const letter = "서울"
    let { letter } = req.body
    try {
        for (let key in xlData){
            if ( xlData[key].학교명.indexOf(letter) != -1) {
                arr.push(xlData[key])
            }

        }
        //console.log(arr)
        return res.send(arr)
    } catch (error) {
        console.error(error);
        return res.status(404)
    }
}

//대학정보 한번에 보내주기

exports.school = async(req, res, next) => {
    try{ 
        sequelize.query(query).then(results => {
        // Log the fetched data to the console
        res.send(results[0]);

        // Close the Sequelize connection
        sequelize.close();
    
    })} catch (error) {
        console.error(error);
        return res.status(404)
    }
}


//계정 문의하기//db에 넣을 것인가??

exports.AskEmail = async(req, res, next) => {
    const { name, email, content } = req.body;
    //const email = "suys010605@gmail.com"
    try{
        let transporter = nodemailer.createTransport({   //내게쓰기
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS,
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
            from: `"UNIVERSITING" <${process.env.NODEMAILER_USER}>`,
            to: process.env.NODEMAILER_USER,
            subject: 'UNIVERSITING 계정문의',  //제목
            text: "이름 : "+ name +"\n메일 주소 : "+ email +"\n문의 내용 : "+ content,
        });
    
        res.status(200).json({
            status: 'Success',
            code: 200,
        });
    } catch (error) {
        console.error(error);
        return next(error);
      }
}


//인증번호 확인하기 (만료시간/번호 일치 여부)
exports.CheckNum = async(req, res, next) => {
    const { email, number } = req.body
    const emailnumber = await Checknum.findOne({
        attributes: ['checknum'],
        where: {email : email}  //그 값의 모든정보가 다 뜸...밑에서 객체 이용
    })

    const emailtime = await Checknum.findOne({
        attributes: ['time'],
        where: {email : email}
    })
    try{
        if (number == emailnumber.checknum&& Date.now() < emailtime.time){
            res.status(200).send(true)  //인증번호 일치,5분안
        }
        else res.status(200).send(false)  //불일치or시간만료
    } catch (error) {
        console.error(error);
        return next(error);
      }

}
