const useDB = require("../../middleware/db");

// 장바구니 화면 보여주기
const busketView = async(req, res) => {

    console.log("장바구니 화면 성공")

    // 접속 유저의 장바구니번호 가져오기
    const busketNum = await useDB.query(`
    select 장바구니번호 from 장바구니식별 where 고객_아이디 = "${req.session.userid}"`)

    console.log("장바구니 식별 번호 가져옴.")

    // 장바구니번호로 장바구니 리스트를 가져옴, 메뉴항목번호와 조인사용
    const busketList = await useDB.query(`
    select * from 장바구니 inner join 메뉴항목 on 장바구니.메뉴항목_항목번호 = 메뉴항목.항목번호 where 장바구니식별_장바구니번호 = "${busketNum[0][0].장바구니번호}"`)

    console.log("장바구니 리스트 가져오기 성공")

    return res.render("Busket", {
        uid : req.session.userid,
        busketList : busketList[0]
    })
}

// 장바구니에서 수량수정, 삭제, 주문하기, 취소하기 를 선택해서 하는 부분
const busketOption = async(req, res) => {

    // 선택부분에서 중요한것
    // option은 수량변경이랑 취소 관련임
    // option = 1 수량변경, option = 0 삭제
    // pay = 1 주문하기, pay = 0 취소하기
    // 선택한 버튼의 값이 아니면 보통 undefiend로 들어와짐

    // menunum = 항목번호
    // count = 현재 수량

    console.log("장바구니에서 선택부분 진입")

    const {option, pay, menunum, count} = req.body

    if(option == "1"){
    // 장바구니 리스트에서 수량 변경하는 경우

        // 메뉴항목에서 우선 메뉴가격부터 가져옴. (가격 * 갯수) 계산 목적
        const menuPrice = await useDB.query(`
        select 메뉴가격 from 메뉴항목 where 항목번호 = "${Number(menunum)}"`)

        // 장바구니에서 메뉴 수량 수정과 그에 따른 총금액 수정
        try{
            const countChange = await useDB.query(`
            update 장바구니 set 수량 = "${Number(count)}", 수량금액 = "${Number(count * menuPrice[0][0].메뉴가격)}" where 메뉴항목_항목번호 = "${Number(menunum)}"`)

            console.log("장바구니에서 해당 메뉴 수정 성공")

            return res.redirect("/moveBusket")
        }catch{

            console.log("장바구니 수량 변경 과정에서 문제 발생")

        }
        

    }else if(option == "0"){
    // 장바구니 리스트에서 삭제하는 경우

        const menuDelete = await useDB.query(`
        delete from 장바구니 where 메뉴항목_항목번호 = "${Number(menunum)}"`)

        console.log("장바구니에서 해당 메뉴 삭제 성공")

        return res.redirect("/moveBusket")
    }

    return res.render("Busket")
}

module.exports = { busketView, busketOption }