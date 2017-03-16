import { Observable } from 'rxjs';
// shorthand for Object.assign that is also typed.
export function a<T>(a: T, b: any): T {
    return Object.assign({}, a, b);
}

export function trace(other: any) {
    console.log('-- trace:');
    console.log(other);
    return other;
}

export const id = x => x;

