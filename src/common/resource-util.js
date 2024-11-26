import axios from "axios";

export class ResourceUtil {
    /**
     * Resources
     * @type {Resources}
     */
    static resources = {};

    static init(resources) {
        ResourceUtil.resources = resources
    }

    /**
     * 尝试获取资源
     * @param item
     * @returns {Promise<*>}
     */
    static getResource(item) {
        if (item.type === 'all') {
            return ResourceUtil.getAllResources()
        } else {
            return ResourceUtil.getResourceItem(item)
        }
    }

    /**
     * 获取单个资源
     * @param item
     * @returns {Promise<void>}
     */
    static async getResourceItem(item) {
        const replacementReg = /\$\{([^}]+)\}/g;
        const {baseUrl, method, headers,resourceTransformer, list} = this.resources[item.from];
        const {params} = item;
        let match;
        let url = baseUrl;
        while ((match = replacementReg.exec(baseUrl)) !== null) {
            console.log("提取内容:", match[1]);
            const key = match[1];
            url = url.replace('${' + key + '}', item[key])
        }
        const response = await ResourceUtil.fetch(url, {method,headers,params})
        return resourceTransformer?resourceTransformer(response):response
    }

    /**
     * 获取全部存在的源
     * @returns {Promise<void>}
     */
    static async getAllResources() {

    }

    static getGetParams(params){
        return Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
    }

    static async fetch(url, config, callback, error) {
        try {
            const {method, headers, params} = config;
            if (method === 'POST') {
                return await axios.post(url, params, {headers}).then(response => {
                    callback?.(response);
                    return response;
                });
            } else {
                if(params){
                    url += url.includes('?') ? '&' + ResourceUtil.getGetParams(params) : '?' + ResourceUtil.getGetParams(params);
                }
                return await axios.get(url, {headers}).then(response => {
                    callback?.(response);
                    return response;
                });
            }
        } catch (e) {
            error?.(e);
        }
    }

    /**
     * 获取全部资源数据列表
     * @returns {Resources[key]['list'][]}
     */
    static getAllResourceTypeList() {
        return Object.keys(ResourceUtil.resources).reduce((list, key) => {
            return list.concat(ResourceUtil.resources[key].list.map(o => Object.assign(o, {from: key})));
        }, [])
    }
}