const axios = require('axios');

async function get36Kr() {
  try {
    const response = await axios.get('https://api-hot.imsyy.top/36kr?cache=true');
    if (response.data && response.data.data) {
      return response.data.data.map(item => ({
        title: item.title,
        hot: item.hot || '热度未知'
      }));
    }
    return [];
  } catch (error) {
    console.error('36氪热搜获取失败：', error);
    return [];
  }
}

module.exports = { get36Kr }; 
