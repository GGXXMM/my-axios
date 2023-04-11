"use strict";
import { Cancel } from "./Cancel";
// CancelToken 实质是改变 Promise状态
export default class CancelToken{
    constructor(executor) {
        if (typeof executor !== 'function') {
            throw new TypeError('executor must be a function.');
        }
        let resolvePromise;

        this.promise = new Promise((resolve)=> {
            resolvePromise = resolve;
        })
        executor(messege => {
            if (this.reason) {
                return;
            }
            this.reason = new Cancel(messege);
            resolvePromise(this.reason);
        })
    }

    // 静态方法：通过类调用，但不能被实例继承
    static source() {
        let cancel;
        const token = new CancelToken(c => {
            cancel = c;
        });
        return {
            cancel,
            token
        }
    }
}