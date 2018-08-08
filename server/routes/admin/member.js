'use strict'

import express from 'express'
import Member from '../../Application/Admin/MemberController'
const router = express.Router()
router.get('/index', Member.index)
router.post('/search', Member.search)
router.post('/downsearch', Member.downsearch)
export default router