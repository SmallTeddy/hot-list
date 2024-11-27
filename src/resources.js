/**
 * API资源配置对象。
 * @typedef {Object} Resources
 * @property {Object} [key] - API资源配置。
 */

/**
 * API资源配置。
 * @typedef {Object} Resources[key]
 * @property {string} baseUrl - API的基准URL。
 * @property {string} method - API请求的HTTP方法。
 * @property {*} headers - API请求的Headers
 * @property {Function} resourceTransformer - API响应数据转换函数。
 * @property {Array<Object>} list - API资源配置列表。
 */

/**
 * API响应数据转换函数。
 * @callback Resources[key].resourceTransformer
 * @param {Object} response - API响应对象。
 * @returns {Array<Object>} 转换后的响应数据。
 */

/**
 * API资源配置项。
 * @typedef {Object} Resources[key].list[]
 * @property {string} name - API资源名称。
 * @property {string} description - API资源描述。
 * @property {string} type - API资源类型。
 * @property {Object} params - API请求的额外参数。
 */
export const Resources = {
    'api-hot': {
        baseUrl: 'https://api-hot.imsyy.top/${type}?cache=true',
        method: 'GET',
        headers: {},
        resourceTransformer: (response) => {
            if (response.data && response.data.data) {
                return response.data.data.map(item => ({
                    title: item.title,
                    hot: item.hot || '热度未知',
                    url: item.url || item.link || ''
                }));
            }
            return [];
        },
        list: [
            {
                name: '微博热搜',
                description: '',
                type: 'weibo',
                params: {}
            },
            {
                name: '抖音热搜',
                description: '',
                type: 'douyin',
                params: {}
            },
            {
                name: '百度热搜',
                description: '',
                type: 'baidu',
                params: {}
            },
            {
                name: '腾讯新闻',
                description: '',
                type: 'tencent',
                params: {}
            },
            {
                name: 'B站热搜',
                description: '',
                type: 'bilibili',
                params: {}
            },
            {
                name: '36氪热搜',
                description: '',
                type: '36kr',
                params: {}
            },
            {
                name: '知乎热搜',
                description: '',
                type: 'zhihu',
                params: {}
            },
            {
                name: 'IT之家热榜',
                description: '',
                type: 'ithome',
                params: {}
            },
            {
                name: '少数派热榜',
                description: '',
                type: 'sspai',
                params: {}
            },
            {
                name: '澎湃新闻',
                description: '',
                type: 'thepaper',
                params: {}
            },
            {
                name: '豆瓣电影',
                description: '',
                type: 'douban',
                params: {}
            },
            {
                name: '掘金热榜',
                description: '',
                type: 'juejin',
                params: {}
            },
            {
                name: '网易新闻',
                description: '',
                type: 'netease',
                params: {}
            },
            {
                name: '微信读书',
                description: '',
                type: 'weread',
                params: {}
            },
            {
                name: 'hellogithub',
                description: '',
                type: 'hellogithub',
                params: {}
            },
            {
                name: '简书热榜',
                description: '',
                type: 'jianshu',
                params: {}
            }
        ]
    }
}
