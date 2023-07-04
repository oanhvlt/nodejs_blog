const exp = require('express')
const morgan = require('morgan')
const app = exp()
const port = 3000

app.use(morgan('combined'))

app.get('/', (req, res) => {
  res.send('Hello World 123456!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})