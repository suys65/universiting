const User = require('../models/user')
const Room = require('../models/room')

const express = require('express');
const dotenv = require('dotenv')
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const Sequelize = require('sequelize');
const sequelize = new Sequelize( config.database, config.username, config.password, config,);

//방만들기
exports.roommaker = async (req, res, next) => {
    //{'people':[아이디,아이디],'name':'이름','introduce':'~~~~','year':0000,'gender':'#'}
    const {people, name, introduce, year, gender} = req.body;
    console.log(name, introduce, year, gender)
    try {
        var peoples = people.split(',');
        let member = peoples.length

        console.log(peoples, member)

        // await Room.create({
        //     name,
        //     member,
        //     gender,
        //     introduce,
        //     year
        //   });
        
        return res.status(200).send("room make success");  
    
    } catch (error) {
        console.error(error);
        return next(error);
    }
};


//대학교 방 리스트 조회
exports.a = async (req, res, next) => {
    
    const {} = req.body;
    try {
        
        return    
    
        
    } catch (error) {
        console.error(error);
        return next(error);
    }
};


//그룹에 친구 초대하기
exports.b = async (req, res, next) => {
    
    const {} = req.body;
    try {
        
        return    
    
        
    } catch (error) {
        console.error(error);
        return next(error);
    }
};
