'use strict'

import express from 'express'
import Sitecard from '../../Application/Site/SitecardController'
const router = express.Router()
router.post('/Datainit', Sitecard.Datainit)
router.post('/dropdown', Sitecard.dropdown)
router.get('/getmore', Sitecard.getmore)
router.post('/filter', Sitecard.filtercase)
router.post('/getbank', Sitecard.getbank)
router.post('/getformdata', Sitecard.getformdata)
router.post('/creatbank', Sitecard.creatbank)
router.post('/updatebank/:id', Sitecard.updatebank)
router.post('/getcard', Sitecard.getcard)
router.post('/getcardcount', Sitecard.getcardcount)
router.post('/historylist', Sitecard.historylist)

export default router