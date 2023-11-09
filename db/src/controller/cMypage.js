const useDB = require("../../middleware/db")

const cMypage = async(req, res) => {
    const MemberInfo = await useDB.query(`
    select * from 고객 where 고객아이디 = "${req.session.loginInfo.loginId}"`)
    console.log("마이페이지 로딩 성공")
    // console.log(MemberInfo[0][0])

    res.render('pMypage', {
        memberId : MemberInfo[0][0].고객아이디,
        memberName : MemberInfo[0][0].고객이름,
        memberAddress : MemberInfo[0][0].주소,
        memberPhone: MemberInfo[0][0].휴대폰번호,
    })
}

module.exports = {cMypage};