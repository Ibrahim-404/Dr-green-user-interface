
export interface ProductById {
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
  productImages: string[]
  productCategories: any[]
  highlights: Highlight[]
  specifications: Specification[]
  reviewProducts: ReviewProduct[]
}

export interface Highlight {
  id: number
  title: string[]
  isProduct: boolean
  isPackage: boolean
}

export interface Specification {
  id: number
  title: string
  content: string
  isProduct: boolean
  isPackage: boolean
}
export interface ReviewProduct {
  id: number
  rating: number
  comment: string
  productId: number
  userName: string
  createdDate: string
  userId: number
}

export class ProductByIdModel implements ProductById {
  id: number=0
  name: string=''
  highloghts: any
  description: string=''
  status: number=0
  publishDate: any
  actualPrice: number=0
  price: number=0
  priceAfterDiscount: number=0
  code: string=''
  overAllRating: any
  quantity: number=0
  stockStatus: number=0
  isFavorite: boolean=false
  isInCart: boolean=false
  productImages: any[]=[]
  productCategories: any[]=[]
  highlights: Highlight[]=[]
  specifications: Specification[]=[]
  reviewProducts: ReviewProduct[]=[]
}
export class HighlightModel implements Highlight {
  id: number = 0
  title: string[] = []
  isProduct: boolean = false
  isPackage: boolean = false
}

export class SpecificationModel implements Specification {
  id: number = 0
  title: string = ''
  content: string = ''
  isProduct: boolean = false
  isPackage: boolean = false
}

export class ReviewProductModel implements ReviewProduct {
  id: number = 0
  rating: number = 0
  comment: string = ''
  productId: number = 0
  userId: number = 0
  userName: string = ''
  createdDate: any
}
