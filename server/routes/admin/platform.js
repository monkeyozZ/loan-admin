'use strict'

import express from 'express'
import platform from '../../Application/Admin/PlatformController'
const router = express.Router()
router.post('/insert', platform.insert)
router.get('/index', platform.index)
router.post('/index', platform.getonelist)
router.post('/update/:id', platform.update)
router.post('/delete', platform.delete)

export default router