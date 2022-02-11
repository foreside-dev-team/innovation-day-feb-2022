export interface Order {
    order_id: number,
    toasty_id: number,
    customer_email: string,
}

export interface Product {
    id: number,
    name: string
    ingredients: {
        id: number,
        name: string,
    }[],
}
