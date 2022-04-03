const express = require('express')
const app = express()


app.use('/', require('./route/Books'))

app.listen(3000)