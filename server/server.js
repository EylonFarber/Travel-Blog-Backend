const express = require('express')
const app = express()
const port = 3000
const { PrismaClient } = require("./generated/prisma")
const prisma = new PrismaClient()
app.use(express.json());



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post(`/posts`, async (req, res) => {
  
    const {  author, title ,content,      
  cover} = req.body
    const result = await prisma.post.create({
        data: {
  author,
  title ,
  content,      
  cover
}
    })
    res.json(result)
    })
    
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
