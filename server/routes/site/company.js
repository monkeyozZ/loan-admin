'use strict'

import express from 'express'
import Company from '../../Application/Site/CompanyController'
const router = express.Router()
router.post('/about', Company.about)
router.post('/relief', Company.relief)

export default router