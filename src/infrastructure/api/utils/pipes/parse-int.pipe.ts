import { PipeTransform, Injectable } from "@nestjs/common";

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value === "string") {
      return parseInt(value, 10);
    }
    return value;
  }
}
