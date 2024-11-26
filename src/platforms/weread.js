const axios = require('axios');

async function getWeread() {
  try {
    const response = await axios.get('https://api-hot.imsyy.top/weread?cache=true');
    if (response.data && response.data.data) {
      return response.data.data.map(item => ({
        title: item.title,
        hot: item.hot || '热度未知',
        url: item.url || item.mobileUrl || ''
      }));
    }
    return [];
  } catch (error) {
    console.error('微信读书热榜获取失败：', error);
    return [];
  }
}

module.exports = { getWeread }; 