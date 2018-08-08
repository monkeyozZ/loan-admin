'use strict'

import express from 'express'
import Authlogin from '../../Application/Site/AuthLoginController'
const router = express.Router()
router.post('/gettoken', Authlogin.gettoken)
router.post('/getsessioninfo', Authlogin.getsessioninfo)

export default router