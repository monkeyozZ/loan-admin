'use strict'

import express from 'express'
import card from '../../Application/Admin/CardController'
const router = express.Router()
router.post('/insert', card.insert)
router.get('/index', card.index)
router.post('/index', card.getonelist)
router.post('/update/:id', card.update)
router.post('/delete', card.delete)

export default router