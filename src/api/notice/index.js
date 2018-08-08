import request from '@/utils/request'
const insert = async (obj) => {
  return request({
    url: 'notice/insert',
    method: 'post',
    data: obj
  })
}

const getlist = async () => {
  return request({
    url: 'notice/index',
    method: 'get'
  })
}

const getonelist = async (id) => {
  return request({
    url: 'notice/index',
    method: 'post',
    data: {
      _id: id
    }
  })
}

const update = async (id, obj) => {
  return request({
    url: 'notice/update/' + id,
    method: 'post',
    data: obj
  })
}

const delcount = async (id) => {
  return request({
    url: 'notice/delete',
    method: 'post',
    data: {
      _id: id
    }
  })
}

export default { insert, getlist, getonelist, update, delcount }