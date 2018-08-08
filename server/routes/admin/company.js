'use strict'

import express from 'express'
import company from '../../Application/Admin/CompanyController'
const router = express.Router()
router.post('/aboutinsert', company.aboutinsert)
router.post('/reliefinsert', company.reliefinsert)
router.post('/contactinsert', company.contactinsert)
router.get('/aboutindex', company.aboutindex)
router.get('/reliefindex', company.reliefindex)
router.get('/contactindex', company.contactindex)

export default router