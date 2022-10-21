const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/user.routes')
const userController = require('./controller/user.controller')


const PORT = process.env.PORT || 8080

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({ credential: true, origin: 'http://localhost:3000' }))
app.use('/api', userRouter)
app.use((req, res, next) => {
   res.header("Access-Control-Allow-Credentials", true);
   next();
});

app.get('/', (req, res) => {
   res.status(202)
      .cookie('newUser', JSON.stringify(userController.newUserData), {
         sameSite: 'strict',
         path: '/',
         maxAge: 1000 * 60 * 60,
         httpOnly: true,
         secure: true
      }).send('cookie init    ===    ' + JSON.stringify(userController.newUserData))
})

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
