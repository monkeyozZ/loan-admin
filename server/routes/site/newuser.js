'use strict'

import express from 'express'
import Newuser from '../../Application/Site/NewuserController'
const router = express.Router()
router.post('/getlist', Newuser.getlist)

export default router