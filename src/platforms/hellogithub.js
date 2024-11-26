const axios = require('axios');

async function getHellogithub() {
  try {
    const response = await axios.get('https://api-hot.imsyy.top/hellogithub?cache=true');
    if (response.data && response.data.data) {
      return response.data.data.map(item => ({
        title: item.title,
        hot: item.hot || '热度未知',
        url: item.url || item.mobileUrl || ''
      }));
    }
    return [];
  } catch (error) {
    console.error('HelloGitHub热榜获取失败：', error);
    return [];
  }
}

module.exports = { getHellogithub }; 
