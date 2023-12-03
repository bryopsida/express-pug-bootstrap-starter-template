function buildCardRows () {
  const rows = []
  for (let i = 0; i < 5; i++) {
    const row = []
    for (let j = 0; j < 5; j++) {
      row.push({
        title: `Row ${i} Card ${j}`,
        description: `Row ${i} Description ${j}`
      })
    }
    rows.push(row)
  }
  return rows
}

module.exports = {
  registerHomePage: function registerHomePage (app) {
    app.get('/', (req, res) => {
      res.render('index', {
        user: req.user,
        title: 'Home',
        cardRows: buildCardRows()
      })
    })
  }
}
