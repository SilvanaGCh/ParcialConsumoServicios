const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname,'public')))

app.set('PORT',process.env.PORT || 2500)

app.use('/',(req,res)=> res.sendFile(path.join(__dirname, './views/index.html')))


app.listen(app.get('PORT'), ()=>console.log(`Server Ready at port ${app.get('PORT')}`))