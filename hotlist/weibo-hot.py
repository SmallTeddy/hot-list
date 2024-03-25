import requests
import json

cookies = {}
headers = {
    'accept': 'application/json, text/plain, */*'
}
# 获取微博热搜请求
response = requests.get('https://weibo.com/ajax/side/hotSearch', cookies=cookies, headers=headers)

if response.ok:
    json_data = response.json()
    print(json.dumps(json_data, ensure_ascii=False, indent=4))
else:
    print(f"请求失败，状态码：{response.status_code}")
