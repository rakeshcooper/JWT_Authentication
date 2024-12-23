import express from "express"
import dotenv  from 'dotenv'
dotenv.config()
import jwt from "jsonwebtoken"
import bodyParser from "body-parser"

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

console.log(jwt);


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



app.get('/posts',authenticateToken, (req,res,next) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

// app.post('/login', (req,res) => {
//     //Authentication Username
//     const username = req.body.username
//     const user = {name: username}

//     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//     res.json( {accessToken: accessToken} )
// })

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token === null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, user) => {
        console.log(err);
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })    

         
}

app.listen(5000, () => {
    console.log(`The PORT of ${5000} is running`)   
})
