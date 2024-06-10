import {
    createParamDecorator,
    ExecutionContext,
    HttpException,
  } from '@nestjs/common';

  
  export const Auth = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
      const request = context.switchToHttp().getRequest();

    console.log("Decorator First")

      const admin = request.admin;

      if (admin) {
        return admin;
      } else {
        throw new HttpException('Unauthorized', 401);
      }
    },
  );