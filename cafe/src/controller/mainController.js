const useDB = require("../../middleware/db");

const mainView = async(req, res) => {

    try{
        console.log('메인 화면 진입 성공, 접속 유저 존재')

        return res.render('Main', {
            uid : req.session.userid
        })
    }catch{
        console.log('메인 화면 진입 성공, 접속 유저 존재 안함')

        return res.render('Main', {
            uid : undefined
        })
    }
}

module.exports = { mainView }