'use strict'

import express from 'express'
import bank from '../../Application/Admin/BankController'
const router = express.Router()
router.post('/insert', bank.insert)
router.get('/index', bank.index)
router.post('/index', bank.getonelist)
router.post('/update/:id', bank.update)
router.post('/delete', bank.delete)

export default router