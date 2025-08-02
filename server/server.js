const express = require('express')
const app = express()
const port = 3000
const { PrismaClient } = require("./generated/prisma")
const prisma = new PrismaClient()
app.use(express.json());


app.get('/posts',async (req, res) => {
    const result = await prisma.post.findMany()
    res.json(result)
    })
// >>>Subtask C: Add a route to retrieve a single post by ID. Use app.get('/posts/:id', ...) with prisma.post.findUnique(). You'll need to get the ID from the request parameters and use it in the where clause of your Prisma call.


app.get('/posts/:id',async (req, res) => {
  const { id } = req.params;
    const result = await prisma.post.findUnique(
      {
        where: {id: Number(id)}
      }
    )
    res.json(result)
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
