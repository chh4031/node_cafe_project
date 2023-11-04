const useDB = require("../../middleware/db");

const cMain = async(req, res) => {
    // const he = await useDB.query('select JSON_EXTRACT(data, "$.new") AS new_data from sessions');
    // console.log(he[0][0].new_data.good)
    console.log('메인페이지 완료')
    // delete req.session.new;
    // 세션 초기값 구현 및 체크 로직
    try{
        if (req.session.loginInfo.loginId != undefined){
            console.log("위 정상")
            res.render('pMain', {
                sessionLoginId : req.session.loginInfo.loginId,
                sessionLoginPwd : req.session.loginInfo.loginPwd,
                sessionLoginName : req.session.loginInfo.loginName
            })
        }else{
            console.log("아래 정상")
            res.render('pMain', {
                sessionLoginId : undefined,
                sessionLoginPwd : undefined,
                sessionLoginName : undefined
        })
        console.log(req.session.loginInfo.LoginId)
    }
    }catch{
        req.session.loginInfo = {
            loginName : undefined,
            loginId : undefined,
            loginPwd : undefined
        }

        res.render('pMain',{
            sessionLoginId : undefined,
            sessionLoginPwd : undefined,
            sessionLoginName : undefined
        })
        }
    }

const cLogout = async(req, res) => {
    console.log('실행됨')
    res.render('pMain')
}
module.exports = { cMain, cLogout };