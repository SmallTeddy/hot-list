import requests
import json

class JuejinSearchHot():
    def __init__(self):
        # 热搜URL
        self.url = 'https://api.juejin.cn/content_api/v1/content/article_rank?category_id=1&type=hot&aid=2608&uuid=7339455245044778507&spider=0'

    def juejin_data(self):
        """
        获取内容JSON
        :return:
        """
        header = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        }
        response = requests.get(self.url,headers=header)
        if response.ok:
            json_data = response.json()
            print(json.dumps(json_data, ensure_ascii=False, indent=4))
        else:
            print(f"请求失败，状态码：{response.status_code}")


if __name__ == "__main__":
    hot_search = JuejinSearchHot()
    hot_search.juejin_data()
