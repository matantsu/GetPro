export interface Job {
    type: string;
    desc: string;
    bid?: Bid;
    owner?: User;
}

export interface User {
    displayName: string;
    photoURL: string;
    phone: string;
    address: string;
}

export interface Bid {
    price: number;
    payed: boolean;
}

export interface IAppState {

};

export const initialState: IAppState = {

};
