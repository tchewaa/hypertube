import { Router } from 'express'
const router = Router()
import { 
    auth, listUsers, registerUser, loginUser, authLogin, logoutUser, uploadPhoto
} from '../../controllers/userController'
import upload from '../../models/imageModel'
import passport from 'passport'
import path from 'path'

export default router

//get oauth
.get('/auth/42', passport.authenticate('42', {scope: 'public'}))
.get('/auth/redirect', passport.authenticate('42', {failureRedirect: '/api/users/signup'}), authLogin)
.get('/auth/github', passport.authenticate('github', {scope: 'user'}))
.get('/auth/redirect2', passport.authenticate('github', {failureRedirect: '/api/users/signup'}), authLogin)

//get
.get('/logout', logoutUser)
.get('/', auth, listUsers)
.get('/photo', auth, (req, res) => {
    res.sendFile(path.join(__dirname+'/form.html'))
})
//post
.post('/signup', registerUser)
.post('/signin', loginUser)
.post('/upload', auth, upload.single('photo'), uploadPhoto)

//delete