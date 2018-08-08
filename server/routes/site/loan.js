'use strict'

import express from 'express'
import Siteloan from '../../Application/Site/SiteloanController'
const router = express.Router()
router.post('/Datainit', Siteloan.Datainit)
router.post('/dropdown', Siteloan.dropdown)
router.get('/getmore', Siteloan.getmore)
router.post('/filter', Siteloan.filtercase)
router.post('/getplatform', Siteloan.getplatform)
router.post('/getformdata', Siteloan.getformdata)
router.post('/creatbill', Siteloan.creatbill)
router.post('/updatebill/:id', Siteloan.updatebill)
router.post('/getbill', Siteloan.getbill)
router.post('/getbillcount', Siteloan.getbillcount)
router.post('/historylist', Siteloan.historylist)

export default router