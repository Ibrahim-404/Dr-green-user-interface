export interface AllTips {
  author?: string;

  content?: string;

  datePublished?: Date;

  description?: string;

  id?: number;

  status?: number;

  tipsDepartmentId?: number;

  tipsDepartment?: string;
  tipsDepartmentTitle?:number
  title?: string;

  url?: string;

  visibleStatus?: number;
}

export class Tips implements AllTips {
  author?: string = '';

  content?: string = '';

  datePublished?: Date = new Date();

  description?: string = '';

  id?: number = -1;

  status?: number = 0;

  tipsDepartmentId?: number = 0;

  tipsDepartment?: string = '';

  title?: string = '';

  url?: string = '';
  tipsDepartmentTitle=10;

  visibleStatus?: number = 0;
}
