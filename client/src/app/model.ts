export interface Job {
    $key?: string;
    type: string;
    desc: string;
    bids?: Bid[];
    locked?: boolean;
}

export interface Bid {
    $key?: string;
    owner: User;
    price: number;
}

export interface User {
    $key?: string;
    displayName: string;
    photoURL: string;
    phone: string;
}

export interface StoreState {
};

export const initialState: StoreState = {
};
