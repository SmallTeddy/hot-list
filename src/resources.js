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
        resourceTransformer: (response)=>{
            if (response.data && response.data.data) {
                return response.data.data.map(item => ({
                    title: item.title,
                    hot: item.hot || '热度未知'
                }));
            }
            return [];
        },
        list: [
            {
                name: '36氪热搜',
                description: '',
                type: '36kr',
                params: {}
            }
        ]
    }

}