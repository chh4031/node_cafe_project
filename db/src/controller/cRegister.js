const useDB = require("../../middleware/db");

const cRegister = async(req, res) =>{
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