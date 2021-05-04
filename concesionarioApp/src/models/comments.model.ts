export interface Comment {
  email: string,
  image: string,
  title: string,
  body: string,
  valoration: number,
  publication_date: string
};

export interface CommentSend {
  product_id: number,
  title: string,
  body: string,
  valoration: number
}
