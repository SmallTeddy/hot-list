const axios = require('axios');

async function getJuejin() {
  try {
    const response = await axios.get('https://api-hot.imsyy.top/juejin?cache=true');
    if (response.data && response.data.data) {
      return response.data.data.map(item => ({
        title: item.title,
        hot: item.hot || '热度未知'
      }));
    }
    return [];
  } catch (error) {
    console.error('掘金热榜获取失败：', error);
    return [];
  }
}

module.exports = { getJuejin }; 