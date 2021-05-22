export interface ArticleCard {
  id: number,
  price: string,
  amount: number,
  discount: number,
  image: string,
  type: string,
  name: string,
  aname: string,
  val: number,
  bname: string,
  active: boolean
}

export interface Article {
  id: number,
  price: number,
  amount: number,
  discount: number,
  name: string,
  aname: string,
  bname: string,
  description: string,
  type: string,
  cant: number,
  val: number,
  active: boolean
}
