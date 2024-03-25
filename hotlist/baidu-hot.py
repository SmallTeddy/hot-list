from bs4 import BeautifulSoup
import re
import urllib.request, urllib.error


class BaiduHotSearch():
    def __init__(self):
        # 热搜URL
        self.url = 'https://top.baidu.com/board?tab=realtime'
        # 热搜标题
        self.title = re.compile(r'<div class="c-single-text-ellipsis">(.*?)</div>')
        # 热搜简介
        self.introduction = re.compile(r'<div class="hot-desc_1m_jR small_Uvkd3 ellipsis_DupbZ">(.*)<a')
        # 热搜指数
        self.index = re.compile(r'<div class="hot-index_1Bl1a">(.*?)</div>')
        # 所有热搜条目
        self.all_content = "category-wrap_iQLoo horizontal_1eKyQ"

    def baidu_html_content(self):
        """
        获取热搜页面的html内容
        :return:
        """
        header = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        }
        request = urllib.request.Request(self.url, headers=header)
        html_content = ""
        try:
            response = urllib.request.urlopen(request)
            html_content = response.read().decode("utf-8")
        except urllib.error.URLError as e:
            if hasattr(e, "code"):
                print(e.code)
            if hasattr(e, "reason"):
                print(e.reason)
        return html_content.encode('gbk', 'ignore').decode('gbk')

    def test_get_content(self):
        """
        获取需要的重点信息
        :return:
        """
        # 获取html内容
        html = self.baidu_html_content()
        # 定义一个空列表保存要获取的信息
        data_info = []
        content = BeautifulSoup(html, "html.parser")
        for name in content.find_all('div', class_=self.all_content):
            data = []
            name_str = str(name)
            title = re.findall(self.title, name_str)
            data.append(title)
            introduction = re.findall(self.introduction, name_str)
            data.append(introduction)
            index = re.findall(self.index, name_str)
            data.append(index)
            data_info.append(data)
        return data_info


if __name__ == "__main__":
    hot_search = BaiduHotSearch()
    get_content = hot_search.test_get_content()
    print(f"获取到信息如下：{get_content}")
