'use strict'

import express from 'express'
import Index from '../../Application/Site/IndexController'
const router = express.Router()
router.post('/index', Index.index)
router.post('/getlastadv', Index.getlastadv)

export default router