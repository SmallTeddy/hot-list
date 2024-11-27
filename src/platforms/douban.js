const axios = require("axios");

async function getDouban() {
  try {
    const response = await axios.get(
      "https://api-hot.imsyy.top/douban-movie?cache=true"
    );
    if (response.data && response.data.data) {
      return response.data.data.map((item) => ({
        title: item.title,
        hot: item.hot || "热度未知",
        url: item.url || item.link || "",
      }));
    }
    return [];
  } catch (error) {
    console.error("豆瓣电影热榜获取失败：", error);
    return [];
  }
}

module.exports = { getDouban };
