const axios = require("axios");

async function getTencent() {
  try {
    const response = await axios.get(
      "https://i.news.qq.com/gw/event/pc_hot_ranking_list?ids_hash=&offset=0&page_size=51&appver=15.5_qqnews_7.1.60&rank_id=hot"
    );

    // 检查返回数据结构
    if (
      response.data &&
      response.data.idlist &&
      response.data.idlist[0] &&
      response.data.idlist[0].newslist
    ) {
      // 过滤掉第一条(通常是提示信息)并获取前50条
      return response.data.idlist[0].newslist.slice(1, 51).map((item) => ({
        title: item.title,
        hot: item.hotScore || "热度未知",
        url: item.url || item.link || "",
      }));
    }

    return [];
  } catch (error) {
    console.error("腾讯新闻热点获取失败：", error);
    return [];
  }
}

module.exports = { getTencent };
