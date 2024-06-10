import { PrismaService } from '../src/common/prisma.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Headliner, Admin } from '@prisma/client';

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async deleteHeadliner() {
    await this.prismaService.headliner.deleteMany({
      where: {
        username: 'test',
      },
    });
    await this.prismaService.headliner.deleteMany({
        where: {
          headliner: 'Unit Testing Underway',
        },
      });
  }

  async deleteAll() {
    await this.deleteHeadliner();
    await this.deleteAdmin();
  }

  async deleteAdmin() {
    await this.prismaService.admin.deleteMany({
      where: {
        username: 'test',
      },
    });
  }

  async getAdmin(): Promise<Admin> {
    return this.prismaService.admin.findUnique({
      where: {
        username: 'test',
      },
    });
  }

  async createAdmin() {
    await this.prismaService.admin.create({
      data: {
        username: 'test',
        name: 'test',
        password: await bcrypt.hash('test', 10),
        token: 'test'
      },
    });
  }

  async getHeadliner(): Promise<Headliner> {
    return this.prismaService.headliner.findFirst({
      where: {
        username: 'test',
      },
    });
  }

  async createHeadliner() {
    await this.prismaService.headliner.create({
      data: {
        topic: 'test',
        headliner: 'Unit Testing Underway',
        username: 'test',
      },
    });
  }
}
