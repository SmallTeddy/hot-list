const axios = require("axios");

async function getIthome() {
  try {
    const response = await axios.get(
      "https://api-hot.imsyy.top/ithome?cache=true"
    );
    if (response.data && response.data.data) {
      return response.data.data.map((item) => ({
        title: item.title,
        hot: item.hot || "热度未知",
      }));
    }
    return [];
  } catch (error) {
    console.error("IT之家热榜获取失败：", error);
    return [];
  }
}

module.exports = { getIthome };
