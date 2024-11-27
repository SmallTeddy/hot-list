const axios = require("axios");

async function getBilibili() {
  try {
    const response = await axios.get(
      "https://api-hot.imsyy.top/bilibili?cache=true"
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
    console.error("B站热搜获取失败：", error);
    return [];
  }
}

module.exports = { getBilibili };
