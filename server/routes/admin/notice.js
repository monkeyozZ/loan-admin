'use strict'

import express from 'express'
import notice from '../../Application/Admin/NoticeController'
const router = express.Router()
router.post('/insert', notice.insert)
router.get('/index', notice.getlist)
router.post('/index', notice.getonelist)
router.post('/update/:id', notice.update)
router.post('/delete', notice.delete)

export default router