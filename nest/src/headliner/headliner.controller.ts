import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { HeadlinerService } from './headliner.service';
import { Auth } from '../common/auth.decorator';
import { Admin } from '@prisma/client';
import {
  HeadlinerResponse,
  CreateHeadlinerRequest,
  SearchHeadlinerRequest,
  UpdateHeadlinerRequest,
} from '../model/headliner.model';
import { WebResponse } from '../model/web.model';

@Controller('/api/headliners')
export class HeadlinerController {
  constructor(private headlinerService: HeadlinerService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Auth() admin: Admin,
    @Body() request: CreateHeadlinerRequest,
  ): Promise<WebResponse<HeadlinerResponse>> {
    const result = await this.headlinerService.create(admin, request);
    return {
      data: result,
    };
  }

  @Get('/:headlinerId')
  @HttpCode(200)
  async get(
    @Auth() admin: Admin,
    @Param('headlinerId', ParseIntPipe) headlinerId: number,
  ): Promise<WebResponse<HeadlinerResponse>> {
    const result = await this.headlinerService.get(admin, headlinerId);
    return {
      data: result,
    };
  }

  @Put('/:headlinerId')
  @HttpCode(200)
  async update(
    @Auth() admin: Admin,
    @Param('headlinerId', ParseIntPipe) headlinerId: number,
    @Body() request: UpdateHeadlinerRequest,
  ): Promise<WebResponse<HeadlinerResponse>> {
    request.id = headlinerId;
    const result = await this.headlinerService.update(admin, request);
    return {
      data: result,
    };
  }

  @Delete('/:headlinerId')
  @HttpCode(200)
  async remove(
    @Auth() admin: Admin,
    @Param('headlinerId', ParseIntPipe) headlinerId: number,
  ): Promise<WebResponse<boolean>> {
    await this.headlinerService.remove(admin, headlinerId);
    return {
      data: true,
    };
  }

  @Get()
  @HttpCode(200)
  async search(
    @Auth() admin: Admin,
    @Query('highlight') highlight?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('size', new ParseIntPipe({ optional: true })) size?: number,
  ): Promise<WebResponse<HeadlinerResponse[]>> {
    const request: SearchHeadlinerRequest = {
      highlight: highlight,
      page: page || 1,
      size: size || 10,
    };
    return this.headlinerService.search(admin, request);
  }
}
