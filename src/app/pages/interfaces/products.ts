export interface Products {
  id:number
    name: string
    highloghts: any
    description: string
    status: number
    publishDate: string|Date
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
    productCategories: any[]
    highlights: any[]
    specifications: any[]
    reviewProducts: any[]
}

export class ProductsModel implements Products{
  code: string='';
  description: string='';
  id: number=-1;
  name: string='';
  overAllRating: number=0;
  price: number=0;
  priceAfterDiscount: number=0;
  productCategories: any[]=[];
  productImages: string[]=[];
  status: number=0;
  stockStatus: number=0;
  quantity: number=0;
  reviewProducts: any[]=[];
  specifications: any[]=[];
  highlights: any[]=[];
  isInCart: boolean=false;
  isFavorite: boolean=false;
  actualPrice: number=0;
  highloghts: any[]=[];
  publishDate: string|Date='';
}

