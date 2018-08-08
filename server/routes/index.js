'use strict'
import login from './admin/login'
import loan from './admin/loan'
import card from './admin/card'
import Receiveguests from './admin/Receive_guests'
import company from './admin/company'
import member from './admin/member'
import notice from './admin/notice'
import banner from './admin/banner'
import newuser from './admin/newuser'
import platform from './admin/platform'
import bank from './admin/bank'
import adposition from './admin/adposition'
import authlogin from './site/authlogin'
import register from './site/registeruser'
import Personal from './site/personal'
import index from './site/index'
import siteloan from './site/loan'
import sitecard from './site/card'
import sitecompany from './site/company'
import sitenotice from './site/notice'
import sitenewuser from './site/newuser'
export default app => {
  app.use('/login', login)
  app.use('/authlogin', authlogin)
  app.use('/loan', loan)
  app.use('/card', card)
  app.use('/register', register)
  app.use('/Receiveguests', Receiveguests)
  app.use('/Personal', Personal)
  app.use('/member', member)
  app.use('/company', company)
  app.use('/notice', notice)
  app.use('/banner', banner)
  app.use('/newuser', newuser)
  app.use('/platform', platform)
  app.use('/bank', bank)
  app.use('/adposition', adposition)
  app.use('/siteindex', index)
  app.use('/siteloan', siteloan)
  app.use('/sitecard', sitecard)
  app.use('/sitecompany', sitecompany)
  app.use('/sitenotice', sitenotice)
  app.use('/sitenewuser', sitenewuser)
}