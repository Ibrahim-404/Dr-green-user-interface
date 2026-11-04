export interface Tip {
    id: number
    title: string
    author: string
    description: string
    content: string
    tipsDepartment: string
    tipsDepartmentTitle: number
    url: string
    visibleStatus: number
    status: number
    datePublished: string



}
export class TipModel implements Tip {

    id: number = 0
    title: string = ''
    author: string=''
    description: string=''
    content: string=''
    tipsDepartment: string=''
    tipsDepartmentTitle: number=0
    url: string=''
    visibleStatus: number=0
    status: number=0
    datePublished: string=''
}
