'use strict'

import express from 'express'
import banner from '../../Application/Admin/BannerController'
const router = express.Router()
router.post('/insert', banner.insert)
router.get('/index', banner.index)
router.post('/index', banner.getonelist)
router.post('/update/:id', banner.update)
router.post('/delete', banner.delete)

export default router