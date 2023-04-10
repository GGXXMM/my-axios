import { isPlainObject } from "../utils";

// 对入参 data 进行序列化
export const transformRequest = data => {
    if(isPlainObject(data)) {
        return JSON.stringify(data);
    }
    return data;
}

// 对出参 data 转换，如果是字符串转换成 json 对象
export const transformResponse = data => {
    if(typeof data === 'string') {
        try {
            data = JSON.parse(data);
        } catch (e) {
            console.log(e);
        }
    }
    return data;
}