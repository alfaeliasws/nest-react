import { HttpException, Inject, Injectable } from '@nestjs/common';
import {
  LoginAdminRequest,
  AdminResponse,
} from '../model/admin.model';
import { ValidationService } from '../common/validation.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { AdminValidation } from './admin.validation';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { Admin } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  async login(request: LoginAdminRequest): Promise<AdminResponse> {
    this.logger.debug(`AdminService.login(${JSON.stringify(request)})`);
    const loginRequest: LoginAdminRequest = this.validationService.validate(
      AdminValidation.LOGIN,
      request,
    );

    let admin = await this.prismaService.admin.findUnique({
      where: {
        username: loginRequest.username,
      },
    });

    if (!admin) {
      throw new HttpException('Username or password is invalid', 401);
    }

    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      admin.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Username or password is invalid', 401);
    }

    admin = await this.prismaService.admin.update({
      where: {
        username: loginRequest.username,
      },
      data: {
        token: uuid(),
      },
    });

    return {
      username: admin.username,
      name: admin.name,
      token: admin.token,
    };
  }

  async get(admin: Admin): Promise<AdminResponse> {
    return {
      username: admin.username,
      name: admin.name,
    };
  }

  async logout(admin: Admin): Promise<AdminResponse> {
    const result = await this.prismaService.admin.update({
      where: {
        username: admin.username,
      },
      data: {
        token: null,
      },
    });

    return {
      username: result.username,
      name: result.name,
    };
  }
}
