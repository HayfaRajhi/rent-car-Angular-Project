import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getChar'
})
export class GetCharPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    if (args[0] && args[0] < value.length)
      return value[args[0]];

    return value[0];
  }

}
