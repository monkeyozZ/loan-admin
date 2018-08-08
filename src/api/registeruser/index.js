import request from '@/utils/request'
const getlist = async (obj) => {
  return request({
    url: 'Receiveguests/index',
    method: 'get',
    params: obj
  })
}

const search = async (obj) => {
  return request({
    url: 'Receiveguests/search?' + 'page=' + obj.listQuery.page + '&limit=' + obj.listQuery.limit,
    method: 'post',
    data: obj
  })
}
const search2 = async (obj) => {
  return request({
    url: 'Receiveguests/downsearch',
    method: 'post',
    data: obj
  })
}

export default { getlist, search, search2 }