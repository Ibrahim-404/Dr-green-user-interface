export interface RootCategory {
  id: number
  name: string
  description: any
  categoryStatus: number
  categoryParentId: number
  datePublished: string
  images: string[]
  productCategories: ProductCategory[]
}

export interface ProductCategory {
  id: number
  name: string
  highloghts: string
  description: string
  status: number
  publishDate: any
  actualPrice: number
  price: number
  priceAfterDiscount: number
  code: string
  overAllRating: any
  quantity: number
  stockStatus: number
  isFavorite: boolean
  isInCart: boolean
  productImages: any[]
  productCategories: any
  highlights: any
  specifications: any
  reviewProducts: any
}

export class  RootCategoryModel implements RootCategory {
  id: number = 0
  name: string = ''
  description: any
  categoryStatus: number = 0
  categoryParentId: number = 0
  datePublished: any
  images: string[] = []
  productCategories: ProductCategory[] = []
}

export class ProductCategoryModel implements ProductCategory {
  id: number = 0
  name: string = ''
  highloghts: string = ''
  description: string = ''
  status: number = 0
  publishDate: any
  actualPrice: number = 0
  price: number = 0
  priceAfterDiscount: number = 0
  code: string = ''
  overAllRating: any
  quantity: number = 0
  stockStatus: number = 0
  isFavorite: boolean = false
  isInCart: boolean = false
  productImages: any[] = []
  productCategories: any
  highlights: any
  specifications: any
  reviewProducts: any
}
