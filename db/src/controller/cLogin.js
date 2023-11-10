const useDB = require("../../middleware/db");

const cLogin = async(req, res) => {

    // 주문내역 체크 코드(모든 페이지에서 써야함.)
    // 페이지마다 작동 로직 복잡해서 비활성화
    // if(req.session.confirm == true){
    //     console.log("주문내역 유지")
    // }else{
    //     const lastOrderDelete = await useDB.query(`
    //         delete from 주문내역 where 주문_주문번호 = ${req.session.orderNum}`)
    //     console.log("도중에 중단한거라서 주문내역에 넣은거 삭제시키기")
    // }

    // req.session.confirm = false;
    // 여기까지

    console.log('로그인 페이지 완료')
    res.render('pLogin', {
        notLogin : false
    })
}
const loginCheckTodb = async(req, res) =>{
    console.log('로그인 체크 전')
    const {loginId, loginPwd} = req.body;
    // console.log(loginId, loginPwd);
    const member = await useDB.query(
        'select * from 고객'
    );
    // console.log(member[0]);
    for(let i = 0;i < member[0].length; i++){
        // console.log(member[0][i])
        if(loginId === member[0][i].고객아이디 && String(loginPwd) === member[0][i].고객비밀번호){
            console.log('로그인 성공')
            req.session.loginInfo = {
                loginName : member[0][i].고객이름,
                loginId : member[0][i].고객아이디,
                loginPwd : member[0][i].고객비밀번호
            }
            req.session.orderNum = 0;
            console.log(req.session.loginInfo.loginId)
            return res.redirect("/")
        }else{
            console.log('로그인 실패')
        }
    }
    return res.render("pLogin", {
        notLogin : true
    })
}

const cLogout = async(req, res) => {
    delete req.session.loginInfo;
    delete req.session.orderNum;
    return res.redirect("/")
}

module.exports = { cLogin, loginCheckTodb, cLogout }