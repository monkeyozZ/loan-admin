'use strict'

import express from 'express'
import Personal from '../../Application/Site/PersonalController'
const router = express.Router()
router.post('/getonelist', Personal.getonelist)
router.post('/step_1', Personal.step1)
router.post('/step_2', Personal.step2)
router.post('/step_3', Personal.step3)

export default router