export interface Order {
    orderid: number,
    toastyid: number,
    customeremail: string,
}

export interface Product {
    id: number,
    name: string
    ingredients: {
        id: number,
        name: string,
    }[],
}
