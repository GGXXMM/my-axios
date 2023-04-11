"use strict";

export class Cancel {
    constructor(message) {
        this.message = message;
    }
}

export const isCancel = value => {
    return value instanceof Cancel;
}