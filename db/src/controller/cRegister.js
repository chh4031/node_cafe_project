const useDB = require("../../middleware/db");

const cRegister = async(req, res) =>{

    // 주문내역 체크 코드(모든 페이지에서 써야함.)
    if(req.session.confirm == true){
        console.log("주문내역 유지")
    }else{
        const lastOrderDelete = await useDB.query(`
            delete from 주문내역 where 주문_주문번호 = ${req.session.orderNum}`)
        console.log("도중에 중단한거라서 주문내역에 넣은거 삭제시키기")
    }

    req.session.confirm = false;
    // 여기까지
    
    console.log('회원가입 페이지 완료')
    res.render('pRegister')
}

const registerTodb = async(req, res) =>{
    console.log("DB 전송전");
    const {username, useraddress, userphone, userid, userpwd} = req.body;
    console.log(username, useraddress, userphone, userid, userpwd);
    const member = await useDB.query(
        'insert into 고객(고객아이디, 고객비밀번호, 고객이름, 주소, 휴대폰번호) values(?,?,?,?,?)', [userid, userpwd, username, useraddress, userphone]
    )
    console.log('DB전송 완료')
    return res.redirect("/");
};

module.exports = { cRegister, registerTodb }