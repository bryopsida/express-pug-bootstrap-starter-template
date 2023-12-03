function buildAboutItems () {
  const items = []
  for (let i = 0; i < 5; i++) {
    const item = {
      title: `Item ${i}`,
      content: `Item ${i} content`,
      id: i
    }
    items.push(item)
  }
  return items
}

module.exports = {
  registerAboutPage: function registerAboutPage (app) {
    app.get('/about', (req, res) => {
      res.render('about', {
        user: req.user,
        title: 'About',
        items: buildAboutItems()
      })
    })
  }
}
