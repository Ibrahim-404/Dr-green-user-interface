export interface Category {
    id: number
    name: string
    description: string
    categoryStatus: number
    categoryParentId: any
    datePublished: any
    productCount: number
    categoryImages: string[]
  }


export class CategoryModel {
  id: number=0
  name: string=''
  description: string=''
  categoryStatus: number=0
  categoryParentId: any
  datePublished: any
  productCount: number=0
  categoryImages: string[]=[]
}
