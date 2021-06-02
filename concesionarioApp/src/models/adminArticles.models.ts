export interface AdminArticle {
  id: number,
  price: number,
  amount: number,
  discount: number,
  type: string,
  val: number,
  bname: string,
  aname: string,
  active: boolean
}

export interface ArticleForm {
  name: string,
  brand: number,
  type: number,
  price: number,
  amount: number,
  discount: number,
  description: string
}