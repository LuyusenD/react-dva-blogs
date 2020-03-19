const Mock = require('mockjs')

module.exports = {
  "GET /api/blogs": (req,res) => {
    let { page, pageSize } = req.query
    //默认每次请求10数据
    !pageSize ? pageSize = 10 : ''

    res.json(Mock.mock({
      ["blogs|" + pageSize]: [
        { 
          "id|+1": (page - 1) * pageSize + 1, 
          "title": () => Mock.mock('@csentence'),
          "context": () => Mock.mock('@cparagraph(10,20)'),
          "author": () => Mock.mock('@first'),
          "browse|1-9999": 0,
          "time" : () => `${Mock.mock('@date')} ${Mock.mock('@time')}`
        }
      ]
    }))
  }
}