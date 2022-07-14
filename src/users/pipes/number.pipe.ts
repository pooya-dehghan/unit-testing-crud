import { Injectable, PipeTransform } from '@nestjs/common';

export type Pagination = { page: string | number; limit: string | number };

@Injectable()
export class NumberPipe implements PipeTransform {
  private check(value: string) {
    return (typeof value === typeof undefined || !+value) && +value !== 0;
  }
  transform(value: Pagination) {
    if (this.check(value.limit as string)) {
      value.limit = 5;
    }
    if (this.check(value.page as string)) {
      value.page = 0;
    }

    return value;
  }
}
