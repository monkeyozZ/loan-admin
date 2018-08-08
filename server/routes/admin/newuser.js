'use strict'

import express from 'express'
import newuser from '../../Application/Admin/NewuserController'
const router = express.Router()
router.post('/insert', newuser.insert)
router.get('/index', newuser.index)
router.post('/index', newuser.getonelist)
router.post('/update/:id', newuser.update)
router.post('/delete', newuser.delete)

export default router