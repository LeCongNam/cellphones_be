import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class FindAllResponse<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data: any) => {
        console.log('Data', data);
        return {
          messageCode:
            data.status || context.switchToHttp().getResponse().statusCode,
          message: data.message ? data.message : undefined,
          data: data.data[0],
          pagination: {
            total: data.data[1],
            limit: +data.limit,
            page: data.page,
            nextPage: data.page + 1,
          },
        };
      }),
    );
  }
}
