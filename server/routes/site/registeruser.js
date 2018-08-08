'use strict'

import express from 'express'
import Register from '../../Application/Site/RegisterController'
const router = express.Router()
router.post('/getcode', Register.getcode)
router.post('/step_1', Register.step1)
router.post('/step_2', Register.step2)
router.post('/step_3', Register.step3)

export default router