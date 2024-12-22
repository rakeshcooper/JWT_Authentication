import express from "express"
import dotenv  from 'dotenv'
dotenv.config()
import jwt from "jsonwebtoken"

const app = express()


const posts = [
    {
        username: 'Cooper',
        title: 'Post 1'   
    },
    {
        username: 'Rakesh',
        title: 'Post 2'   
    }  
]

app.use(express.json())

app.get('/posts', (req,res) => {
    res.json(posts)
})

app.post('/login', (req,res) => {
    //Authentication Username
    const username = req.body.username
    const user = {name: username}

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json( {accessToken: accessToken} )
})

app.listen(5000, () => {
    console.log(`The PORT of ${5000} is running`)   
})
