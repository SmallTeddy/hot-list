const axios = require('axios');

async function getThepaper() {
  try {
    const response = await axios.get('https://api-hot.imsyy.top/thepaper?cache=true');
    if (response.data && response.data.data) {
      return response.data.data.map(item => ({
        title: item.title,
        hot: item.hot || '热度未知'
      }));
    }
    return [];
  } catch (error) {
    console.error('澎湃新闻热榜获取失败：', error);
    return [];
  }
}

module.exports = { getThepaper }; 