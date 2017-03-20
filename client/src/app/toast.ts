import { Injectable } from '@angular/core';

export class Toast {
    constructor(public title: string,
                public desc?: string,
                public dissmissable = true,
                public time?: number) {}
}

@Injectable()
export class ToastService {
    public toasts: Toast[] = [];

    show(t: Toast) {
        this.toasts.unshift(t);
        if (t.time) {
            setTimeout(() =>
                this.toasts = this.toasts.filter(toast => toast !== t),
            t.time);
        }
    }
}
