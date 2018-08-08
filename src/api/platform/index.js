import request from '@/utils/request'

const getlist = async (obj) => {
  return request({
    url: 'platform/index',
    method: 'get',
    params: obj
  })
}

const getonelist = async (id) => {
  return request({
    url: 'platform/index',
    method: 'post',
    data: {
      _id: id
    }
  })
}

const update = async (id, obj) => {
  return request({
    url: 'platform/update/' + id,
    method: 'post',
    data: obj
  })
}

const delcount = async (id) => {
  return request({
    url: 'platform/delete',
    method: 'post',
    data: {
      _id: id
    }
  })
}

export default { update, getonelist, getlist, delcount }