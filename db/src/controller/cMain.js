const cMain = async(req, res) => {
    console.log('메인페이지 완료')
    res.render('pMain')
}

module.exports = { cMain };