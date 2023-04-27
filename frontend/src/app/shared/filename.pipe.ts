import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filename'
})
export class FilenamePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    const parts = value.split('\\');
    const prefixedName = parts[parts.length - 1];
    let [start, ...end] = prefixedName.split('-');
    return end.join();
  }
}
