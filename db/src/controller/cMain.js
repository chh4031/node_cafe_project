const useDB = require("../../middleware/db");

const cMain = async(req, res) => {
    // const he = await useDB.query('select JSON_EXTRACT(data, "$.new") AS new_data from sessions');
    // console.log(he[0][0].new_data.good)
    req.session.selectOption = false;
    console.log('메인페이지 완료')

    // 주문내역 체크 코드(모든 페이지에서 써야함.)
    try{
        if(req.session.confirm == true){
            console.log("주문내역 유지")
        }else{
            const lastOrderDelete = await useDB.query(`
                delete from 주문내역 where 주문_주문번호 = ${req.session.orderNum}`)
            console.log("도중에 중단한거라서 주문내역에 넣은거 삭제시키기")
        }
    }catch{
        console.log("처음 서버 켰음")
    }

    req.session.confirm = false;

    try{
        const deletetrashOrder = await useDB.query(`
        delete from 주문 where 주문방식 = "선택안함"`)
        console.log("주문방식이 선택안된 쓰레기 주문 삭제")
    }catch{
        console.log("주문방식이 선택안된 쓰레기 주문 삭제 실패")
    }
    // 여기까지

    // delete req.session.new;
    // 세션 초기값 구현 및 체크 로직
    try{
        if (req.session.loginInfo.loginId != undefined){
            console.log("세션 접속중")
            res.render('pMain', {
                sessionLoginId : req.session.loginInfo.loginId,
                sessionLoginPwd : req.session.loginInfo.loginPwd,
                sessionLoginName : req.session.loginInfo.loginName,
            })
        }else{
            req.session.orderNum = 0;
            console.log("세션 접속 대기중(로그인전 undefined)")
            res.render('pMain', {
                sessionLoginId : undefined,
                sessionLoginPwd : undefined,
                sessionLoginName : undefined,
                
        })
        // console.log(req.session.loginInfo.LoginId)
    }
    }catch{
        req.session.orderNum = 0;
        console.log("세션 비접속중(로그아웃 undefined)")
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
    console.log('로그아웃 실행됨')
    res.render('pMain')
}
module.exports = { cMain, cLogout };