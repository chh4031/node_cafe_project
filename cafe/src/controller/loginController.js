const useDB = require("../../middleware/db");


// 로그인 화면 띄우기
const loginView = async(req, res) => {
    console.log('로그인 화면 진입 성공')

    return res.render('Login')
}

// 회원가입 화면 띄위기
const registerView = async(req, res) =>{
    console.log('회원가입 화면 진입 성공')

    return res.render('Register')
}

// 로그아웃
const logoutUser = async(req, res) => {
    // 세션 삭제 체크
    req.session.destroy((err) => {
        if(err){
            console.log("로그아웃 실패, 세션 삭제 오류")
            return res.status(500).send("세션삭제오류발생")
        }else{
            console.log("로그아웃 성공, 세션 삭제 완료")
            return res.render("Main", {
                uid : undefined
            })
        }
    })
}

// 로그인 검증(체크하기)
const loginCheck = async(req, res) =>{
    const { loginId } = req.body;

    // 사용자 아이디가 존재하는지 검증
    try{
        const userLogin = await useDB.query(`
        select * from 고객 where 아이디 = "${loginId}"`)
        
        // 로그인시 현재 세션에서 보여질 아이디 지정
        req.session.userid = loginId

        console.log('로그인 성공')

        // 장바구니 식별 테이블 추가 부분
        try{
            // 이미 장바구니를 가진 사용자가 있는지 검색
            const dupeBusketCheck = await useDB.query(`
            select * from 장바구니식별 where 고객_아이디 = "${loginId}"`)

            // 존재하지 않으면 1개 만듬
            if (dupeBusketCheck[0].length == 0){
                const addBusketCheck = await useDB.query(`
                insert into 장바구니식별(고객_아이디) values(?)`, [loginId])

                console.log('장바구니식별 테이블 추가 성공')
            }else{ // 존재하면 안만듬
                console.log('해당 사용자의 장바구니 이미 존재')
            }
        }catch{
            console.log(`장바구니식별 테이블 추가 실패(중복발생)`)
        }

        return res.render('Main', {
            uid : req.session.userid
        })
    }catch{
        console.log('로그인 실패')

        return res.send('<script type = "text/javascript">alert("로그인 실패"); location.href="/moveLogin";</script>')
    }
}

// 회원가입 검증(체크하기), 회원가입 시키기
const newUser = async(req, res) => {
    const { newId, newName, newAddress, newPhone } = req.body;

    // 빈갑 체크하기
    if(newId == '' || newName == '' || newAddress =='' || newPhone == ''){
        return res.send('<script type = "text/javascript">alert("빈값안됨"); location.href="/moveLogin/register";</script>')
    }

    // 회원추가
    try{
        const addUser = await useDB.query(`
        insert into 고객(아이디, 이름, 주소, 전화번호) values(?,?,?,?)`,[newId, newName, newAddress, newPhone])
    
        console.log("회원가입 성공")
        
        return res.render('Main', {
            uid : undefined
        })
    }catch{
        console.log("회원가입 실패/ 데이터 중복 또는 타입문제")

        return res.send('<script type = "text/javascript">alert("회원가입 실패"); location.href="/moveLogin/register";</script>')
    }
}

module.exports = { loginView, loginCheck, registerView, newUser, logoutUser }