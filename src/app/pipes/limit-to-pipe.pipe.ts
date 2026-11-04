import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitToPipe'
})
export class LimitToPipePipe implements PipeTransform {

  transform(value: any[], start:number,end: number): any[] {
    return value.slice(start, end);
  }
}
