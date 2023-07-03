const exp = require('express')
const app = exp()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World 123456!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})