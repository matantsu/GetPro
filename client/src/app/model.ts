export interface Job {
    $key?: string;
    type: string;
    desc: string;
    bids?: Bid[];
    locked?: boolean;
}

export interface Bid {
    $key?: string;
    price: number;
}

export interface User {
    $key?: string;
    displayName: string;
    photoURL: string;
    phone: string;
    address: string;
}

export interface IAppState {
};

export const initialState: IAppState = {
};
