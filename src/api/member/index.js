import request from '@/utils/request'
const getlist = async (obj) => {
  return request({
    url: 'member/index',
    method: 'get',
    params: obj
  })
}

const search = async (obj) => {
  return request({
    url: 'member/search?' + 'page=' + obj.listQuery.page + '&limit=' + obj.listQuery.limit,
    method: 'post',
    data: obj
  })
}
const search2 = async (obj) => {
  return request({
    url: 'member/downsearch',
    method: 'post',
    data: obj
  })
}

export default { getlist, search, search2 }