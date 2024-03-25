import baseRequest from './index'

export function fetchWeiBoHotList() {
  return baseRequest.get({
    url: 'https://www.weibo.com/ajax/side/hotSearch'
  })
}
