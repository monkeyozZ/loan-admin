'use strict'

import express from 'express'
import Notice from '../../Application/Site/NoticeController'
const router = express.Router()
router.post('/list', Notice.list)
router.get('/details/:id', Notice.details)
router.post('/count', Notice.count)

export default router