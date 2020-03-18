module.exports = {
  "GET /api/bloggerInfo": (req,res) => {
    res.json({
      imgUrl: '/public/images/blog-portrait.jpg',
      name: 'クレヨンしんちゃん',
      autograph: 'あなたの釣りに従って法を執行します。 結局私は来るものは拒まないです。'
    })
  }
}