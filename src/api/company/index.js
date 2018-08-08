import request from '@/utils/request'

const aboutindex = async () => {
  return request({
    url: 'company/aboutindex',
    method: 'get'
  })
}

const reliefindex = async () => {
  return request({
    url: 'company/reliefindex',
    method: 'get'
  })
}

const contactindex = async () => {
  return request({
    url: 'company/contactindex',
    method: 'get'
  })
}

const aboutinsert = async (obj) => {
  return request({
    url: 'company/aboutinsert',
    method: 'post',
    data: obj
  })
}

const reliefinsert = async (obj) => {
  return request({
    url: 'company/reliefinsert',
    method: 'post',
    data: obj
  })
}

const contactinsert = async (obj) => {
  return request({
    url: 'company/contactinsert',
    method: 'post',
    data: obj
  })
}

export default { aboutinsert, reliefinsert, contactinsert, aboutindex, reliefindex, contactindex }