'use strict'

import express from 'express'
import loan from '../../Application/Admin/LoanController'
const router = express.Router()
router.post('/insert', loan.insert)
router.get('/index', loan.index)
router.post('/index', loan.getonelist)
router.post('/update/:id', loan.update)
router.post('/delete', loan.delete)

export default router