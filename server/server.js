const express = require('express')
const app = express()
const port = 3000
const { PrismaClient } = require("./generated/prisma")
const prisma = new PrismaClient()
app.use(express.json());
const cors = require('cors');
app.use(cors())

app.get('/posts',async (req, res) => {
    const result = await prisma.post.findMany()
    res.json(result)
    })

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

    // Subtask D: Add a route to update an existing post. Use app.put('/posts/:id', ...) with prisma.post.update(). This function will need to get the post's ID from the request parameters and the new data from the request body.

app.put('/posts/:id', async(req, res) =>{
    const { id } = req.params;
 const updateData = req.body
    const result = await prisma.post.update(
      {
        where: {id: Number(id)},
                data: updateData
      }
    )
    res.json(result)
    })

    // Subtask E: Add a route to delete a post. Use app.delete('/posts/:id', ...) with prisma.post.delete(). You will get the ID from the request parameters to specify which post to remove

    app.delete('/posts/:id', async (req,res)=>{
      const {id} = req.params;
      await prisma.post.delete({
        where: {id: Number(id)}
      })
          res.send(`Post number ${id} was deleted.`)

    })

    app.get('/posts',async (req, res) => {
    const result = await prisma.post.findMany()
    res.json(result)
    })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
