import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Patch,
    Post,
  } from '@nestjs/common';
  import { AdminService } from './admin.service';
  import { WebResponse } from '../model/web.model';
  import {
    AdminResponse,
    LoginAdminRequest,
  } from '../model/admin.model';
  import { Auth } from '../common/auth.decorator';
  import { Admin } from '@prisma/client';
  
  @Controller('/api/admin')
  export class AdminController {
    constructor(private adminService: AdminService) {}
  
  
    @Post('/login')
    @HttpCode(200)
    async login(
      @Body() request: LoginAdminRequest,
    ): Promise<WebResponse<AdminResponse>> {
      const result = await this.adminService.login(request);
      return {
        data: result,
      };
    }

    @Delete('/logout')
    @HttpCode(200)
    async logout(@Auth() admin: Admin): Promise<WebResponse<boolean>> {
      await this.adminService.logout(admin);
      return {
        data: true,
      };
    }
  }
  