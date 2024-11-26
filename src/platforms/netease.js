const axios = require('axios');

async function getNetease() {
  try {
    const response = await axios.get('https://api-hot.imsyy.top/netease-news?cache=true');
    if (response.data && response.data.data) {
      return response.data.data.map(item => ({
        title: item.title,
        hot: item.hot || '热度未知',
        url: item.url || item.mobileUrl || ''
      }));
    }
    return [];
  } catch (error) {
    console.error('网易新闻热榜获取失败：', error);
    return [];
  }
}

module.exports = { getNetease }; 
