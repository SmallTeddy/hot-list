const axios = require('axios');

async function getBaidu() {
  try {
    const response = await axios.get('https://api-hot.imsyy.top/baidu?cache=true');
    if (response.data && response.data.data) {
      return response.data.data.map(item => ({
        title: item.title,
        hot: item.hot || '热度未知',
        url: item.url || item.link || ''
      }));
    }
    return [];
  } catch (error) {
    console.error('百度热搜获取失败：', error);
    return [];
  }
}

module.exports = { getBaidu }; 
