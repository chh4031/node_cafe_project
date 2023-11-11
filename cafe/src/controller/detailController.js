const useDB = require("../../middleware/db")
const time = require("../function/time");

// 오늘 날짜 추출하는 함수
const today = `${time.time().year}-${time.time().month}-${time.time().date}`

// 상세보기 화면 보여주기
const detailView = async(req, res) => {
    // 메뉴이름 누를시 params로 항목번호 가져오기
    const menuNum = req.params.menuNum

    // 가져온 항목번호로 해당 메뉴의 정보 가져오기
    const oneMenu = await useDB.query(`
    select * from 메뉴항목 where 항목번호 = "${Number(menuNum)}"`)

    // 들어오는 재료 정보 가져오기
    const itemInfo = await useDB.query(`
    select * from 레시피 where 메뉴항목_항목번호 = "${Number(menuNum)}"`)

    return res.render("Detail", {
        uid : req.session.userid,
        detailMenu : oneMenu[0][0],
        itemInfo : itemInfo[0]
    })
}

// 주문방식 선택하기
const order = async(req, res) =>{

    // count = 수량, 
    // selected = 주문방식 선택유무,1
    // pay = 구매방식
    // menuprice = 메뉴가격
    // menunum = 메뉴항목번호
    const { count, pay, selected, menuprice, menunum } = req.body

    // pay = 1 바로결제, pay = 2 장바구니 담기
    try{
        if (pay == "1"){
            console.log("바로결제")
    
            // 주문 테이블에 주문자 정보 우선 저장
            const orderAdd = await useDB.query(`
            insert into 주문(고객_아이디, 주문날짜, 주문방식, 총금액) values(?,?,?,?)`, [req.session.userid, today, selected, menuprice * count ])

            console.log("(바로결제), 주문 저장 성공")

            // 주문 테이블에서 마지막 주문한 주문번호 가져오기
            // 위에서 주문번호가 우선 저장되어서 가져올 수 있음.
            const orderUser = await useDB.query(`
            select max(주문번호) maxorder from 주문 where 고객_아이디 = "${req.session.userid}"`)

            // 주문내역 테이블에 주문정보 넣기
            const orderListAdd = await useDB.query(`
            insert into 주문내역(주문_주문번호, 메뉴항목_항목번호, 수량금액, 수량) values(?,?,?,?)`, [orderUser[0][0].maxorder, menunum, menuprice * count, count])
    
            console.log("(바로결제), 주문내역 저장 성공")
    
        }else{
            console.log("장바구니 담기")

            // 장바구니 식별 테이블에서 현재 사용자의 장바구니 번호 가져오기
            const busketInfo = await useDB.query(`
            select 장바구니번호 from 장바구니식별 where 고객_아이디 = "${req.session.userid}"`)

            console.log(busketInfo[0][0].장바구니번호)

            // 장바구니에 메뉴추가하기, 중복검사를 위해 try catch
            try{
                const busketAdd = await useDB.query(`
                insert into 장바구니(장바구니식별_장바구니번호, 메뉴항목_항목번호, 수량, 수량금액) values(?,?,?,?)`, [busketInfo[0][0].장바구니번호, menunum, count, menuprice * count])

                console.log("장바구니 추가 완료")
            }catch{
                console.log("장바구니에 동일메뉴드감")
                console.log("수정하고 싶으면 장바구니 탭에서 할것")
            }
        }
    }catch{
        console.log("바로결제 오류 또는 장바구니 담기 오류")
    }
    return res.redirect("/moveMenu")
}

module.exports = { detailView, order }