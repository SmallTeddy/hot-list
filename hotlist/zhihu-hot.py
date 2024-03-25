from bs4 import BeautifulSoup
import re
import urllib.request, urllib.error


class ZhihuHotSearch():
    def __init__(self):
        # 热搜URL
        self.url = 'https://www.zhihu.com/hot'
        # 热搜指数
        self.index = re.compile(r'<div class="HotItem-rank HotItem-hot">(.*?)</div>')
        # 热搜标题
        self.title = re.compile(r'<div class="HotItem-title">(.*?)</div>')
        # 热搜简介
        self.introduction = re.compile(r'<p class="HotItem-excerpt">(.*)</p>')
        # 热搜热度
        self.count = re.compile(r'</svg>(.*?)<span class="HotItem-action">')
        # 所有热搜条目
        self.all_content = "HotList-list"

    def zhihu_html_content(self):
        """
        获取热搜页面的html内容
        :return:
        """
        header = {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
            # 需要一个Cookie 才能访问
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
        html = self.zhihu_html_content()
        # 定义一个空列表保存要获取的信息
        data_info = []
        content = BeautifulSoup(html, "html.parser")
        list = content.find('div', class_=self.all_content)
        for sec in list.find_all('section'):
            sec_str = str(sec)
            # 空字典
            data = {}
            data['title'] = re.findall(self.title, sec_str)
            data['index'] = re.findall(self.index, sec_str)
            data['introduction'] = re.findall(self.introduction, sec_str)
            data['count'] = re.findall(self.count, sec_str)
            data_info.append(data)
        return data_info

if __name__ == "__main__":
    hot_search = ZhihuHotSearch()
    get_content = hot_search.test_get_content()
    print(f"获取到信息如下：{get_content}")
