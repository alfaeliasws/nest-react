import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../common/prisma.service';
import { Headliner, Admin } from '@prisma/client';
import {
  HeadlinerResponse,
  CreateHeadlinerRequest,
  SearchHeadlinerRequest,
  UpdateHeadlinerRequest,
} from '../model/headliner.model';
import { ValidationService } from '../common/validation.service';
import { HeadlinerValidation } from './headliner.validation';
import { WebResponse } from '../model/web.model';

@Injectable()
export class HeadlinerService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async create(
    admin: Admin,
    request: CreateHeadlinerRequest,
  ): Promise<HeadlinerResponse> {
    this.logger.debug(
      `HeadlinerService.create(${JSON.stringify(admin)}, ${JSON.stringify(request)})`,
    );
    const createRequest: CreateHeadlinerRequest = this.validationService.validate(
      HeadlinerValidation.CREATE,
      request,
    );

    const headliner = await this.prismaService.headliner.create({
      data: {
        ...createRequest,
        ...{ username: admin.username },
      },
    });

    return this.toHeadlinerResponse(headliner);
  }

  toHeadlinerResponse(headliner: Headliner): HeadlinerResponse {
    return {
      topic: headliner.topic,
      headliner: headliner.headliner,
      id: headliner.id
    };
  }

  async checkHeadlinerMustExists(
    username: string,
    headlinerId: number,
  ): Promise<Headliner> {
    const headliner = await this.prismaService.headliner.findFirst({
      where: {
        username: username,
        id: headlinerId,
      },
    });

    if (!headliner) {
      throw new HttpException('Headliner is not found', 404);
    }

    return headliner;
  }

  async get(admin: Admin, headlinerId: number): Promise<HeadlinerResponse> {
    const headliner = await this.checkHeadlinerMustExists(admin.username, headlinerId);
    return this.toHeadlinerResponse(headliner);
  }

  async update(
    admin: Admin,
    request: UpdateHeadlinerRequest,
  ): Promise<HeadlinerResponse> {
    const updateRequest = this.validationService.validate(
      HeadlinerValidation.UPDATE,
      request,
    );
    let headliner = await this.checkHeadlinerMustExists(
      admin.username,
      updateRequest.id,
    );

    headliner = await this.prismaService.headliner.update({
      where: {
        id: headliner.id,
        username: headliner.username,
      },
      data: updateRequest,
    });

    return this.toHeadlinerResponse(headliner);
  }

  async remove(admin: Admin, headlinerId: number): Promise<HeadlinerResponse> {
    await this.checkHeadlinerMustExists(admin.username, headlinerId);

    const headliner = await this.prismaService.headliner.delete({
      where: {
        id: headlinerId,
        username: admin.username,
      },
    });

    return this.toHeadlinerResponse(headliner);
  }

  async search(
    admin: Admin,
    request: SearchHeadlinerRequest,
  ): Promise<WebResponse<HeadlinerResponse[]>> {
    const searchRequest: SearchHeadlinerRequest = this.validationService.validate(
      HeadlinerValidation.SEARCH,
      request,
    );

    const filters = [];

    if (searchRequest.highlight) {
      // add name filter
      filters.push({
        OR: [
          {
            topic: {
              contains: searchRequest.highlight,
            },
          },
          {
            headliner: {
              contains: searchRequest.highlight,
            },
          },
        ],
      });
    }

    const skip = (searchRequest.page - 1) * searchRequest.size;

    const headliners = await this.prismaService.headliner.findMany({
      where: {
        username: admin.username,
        AND: filters,
      },
      take: searchRequest.size,
      skip: skip,
    });

    const total = await this.prismaService.headliner.count({
      where: {
        username: admin.username,
        AND: filters,
      },
    });

    return {
      data: headliners.map((headliner) => this.toHeadlinerResponse(headliner)),
      paging: {
        current_page: searchRequest.page,
        size: searchRequest.size,
        total_page: Math.ceil(total / searchRequest.size),
      },
    };
  }
}
