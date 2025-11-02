import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, map } from 'rxjs';
import {
  ICreateUserResponse,
  IGetUsersResponse,
} from 'src/users/users.interface';

@Injectable()
export class HandleResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();

    return next.handle().pipe(
      map((data: ICreateUserResponse | IGetUsersResponse) => ({
        path: request.url,
        message: data.message,
        data: data.data,
      })),
    );
  }
}
