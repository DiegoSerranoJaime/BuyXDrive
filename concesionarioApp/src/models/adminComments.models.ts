export interface AdminComment {
    email: string,
    title: string,
    body: string,
    valoration: number,
    publication_date: Date,
    name: string,
    product_id: number,
    user_id: number
}
export interface AdminUserComment {
    email: string,
    title: string,
    body: string,
    valoration: number,
    publication_date: Date,
    name: string,
    id: number,
}