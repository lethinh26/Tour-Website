export type TourType = {
    idTour: string
    infomationTour: {
        nameTour: string
        description: string
        price: number
        category: string
    }
    image: string[] 
}

export type UserType = {
    id: string
    name: string
    password: string
}

export type TicketType = {
    id: string
    tour_id: string
    quantity: number
    price: number
    date_depart: string
}

export type OrderType = {
    id: string
    ticket_id: string
    user_id: string
    quantity: number
}

export type TransactionHistoryType = {
    id: string
    order_id: string
    user_id: string
    status: boolean
}

export type ReviewType = {
    id: string
    user_id: string
    review: string
    star: number
}