const axios = require('axios');
const cheerio = require('cheerio');

async function getBaidu() {
  try {
    const response = await axios.get('http://top.baidu.com/buzz?b=1', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const $ = cheerio.load(response.data);
    const hotList = [];

    $('.list-table .keyword').each((i, elem) => {
      hotList.push({
        title: $(elem).text().trim(),
        hot: $(elem).next('.last').text().trim()
      });
    });

    return hotList;
  } catch (error) {
    console.error('百度热搜获取失败：', error);
    return [];
  }
}

module.exports = { getBaidu }; 
