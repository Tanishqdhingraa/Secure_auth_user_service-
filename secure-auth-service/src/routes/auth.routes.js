import express from 'express'
import validate from '../middlewares/validate.middleware';



const router = express.Router();


let users=[];
let refreshtoken=[];

router.post('/register',validate(re))