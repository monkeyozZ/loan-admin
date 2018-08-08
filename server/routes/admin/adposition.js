'use strict'

import express from 'express'
import advposition from '../../Application/Admin/AdpositionController'
const router = express.Router()
router.post('/insert', advposition.insert)
router.get('/index', advposition.index)
router.post('/index', advposition.getonelist)
router.post('/update/:id', advposition.update)
router.post('/delete', advposition.delete)

export default router