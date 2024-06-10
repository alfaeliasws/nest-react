import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('AdminController', () => {
  let app: INestApplication;
  let logger: Logger;
  let testService: TestService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);
  });

  describe('POST /api/headliners', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createAdmin();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/headliners')
        .set('Authorization', 'test')
        .send({
            topic: '',
            headliner: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to create headliner', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/headliners')
        .set('Authorization', 'test')
        .send({
            topic: 'science',
            headliner: 'New Planet Found in Extraterrestrial',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.topic).toBe('science');
      expect(response.body.data.headliner).toBe('New Planet Found in Extraterrestrial');
    });
  });

  describe('GET /api/headliners/:headlinerId', () => {
    beforeEach(async () => {
      await testService.deleteAll();

      await testService.createAdmin();
      await testService.createHeadliner();
    });

    it('should be rejected if headliner is not found', async () => {
      const headliner = await testService.getHeadliner();
      const response = await request(app.getHttpServer())
        .get(`/api/headliners/${headliner.id + 1}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to get headliner', async () => {
      const headliner = await testService.getHeadliner();
      const response = await request(app.getHttpServer())
        .get(`/api/headliners/${headliner.id}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.topic).toBe('test');
      expect(response.body.data.headliner).toBe('Unit Testing Underway');
  });
  })


  describe('PUT /api/headliners/:headlinerId', () => {
    beforeEach(async () => {
      await testService.deleteAll();

      await testService.createAdmin();
      await testService.createHeadliner();
    });

    it('should be rejected if request is invalid', async () => {
      const headliner = await testService.getHeadliner();
      const response = await request(app.getHttpServer())
        .put(`/api/headliners/${headliner.id}`)
        .set('Authorization', 'test')
        .send({
            topic: '',
            headliner: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if headliner is not found', async () => {
      const headliner = await testService.getHeadliner();
      const response = await request(app.getHttpServer())
        .put(`/api/headliners/${headliner.id + 1}`)
        .set('Authorization', 'test')
        .send({
            topic: 'test',
            headliner: 'Unit Testing Underway Test',
        });

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to update headliner', async () => {
      const headliner = await testService.getHeadliner();
      const response = await request(app.getHttpServer())
        .put(`/api/headliners/${headliner.id}`)
        .set('Authorization', 'test')
        .send({
            topic: 'test updated',
            headliner: 'Unit Testing Underway Test',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.topic).toBe('test updated');
      expect(response.body.data.headliner).toBe('Unit Testing Underway Test');
    });
  });

  describe('DELETE /api/headliners/:headlinerId', () => {
    beforeEach(async () => {
      await testService.deleteAll();

      await testService.createAdmin();
      await testService.createHeadliner();
    });

    it('should be rejected if headliner is not found', async () => {
      const headliner = await testService.getHeadliner();
      const response = await request(app.getHttpServer())
        .delete(`/api/headliners/${headliner.id + 1}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to remove headliner', async () => {
      const headliner = await testService.getHeadliner();
      const response = await request(app.getHttpServer())
        .delete(`/api/headliners/${headliner.id}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data).toBe(true);
    });
  });

  describe('GET /api/headliners', () => {
    beforeEach(async () => {
      await testService.deleteAll();

      await testService.createAdmin();
      await testService.createHeadliner();
    });

    it('should be able to search headliners', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/headliners`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });

    it('should be able to search headliners by topic highlight', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/headliners`)
        .query({
          highlight: 'tes',
        })
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });

    it('should be able to search headliners by topic highlight not found', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/headliners`)
        .query({
          highlight: 'wrong',
        })
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(0);
    });

    it('should be able to search headliners by highlight headliner', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/headliners`)
        .query({
          highlight: 'Underway',
        })
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });

    it('should be able to search headliners by highlight headliner not found', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/headliners`)
        .query({
            highlight: 'wrong',
        })
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(0);
    });

    it('should be able to search headliners with page', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/headliners`)
        .query({
          size: 1,
          page: 2
        })
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(0);
      expect(response.body.paging.current_page).toBe(2);
      expect(response.body.paging.total_page).toBe(1);
      expect(response.body.paging.size).toBe(1);
    });
  });
});
