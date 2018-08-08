'use strict'

import express from 'express'
import Register from '../../Application/Admin/RegisterController'
const router = express.Router()
router.get('/index', Register.index)
router.post('/search', Register.search)
router.post('/downsearch', Register.downsearch)
export default router