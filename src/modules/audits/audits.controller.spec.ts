import { Test, TestingModule } from '@nestjs/testing';
import {AuditsController } from 'src/modules/logs/logs.controller';
import {auditsService } from 'src/modules/logs/logs.service';

describe('LogsController', () => {
  let controller:AuditsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogsController],
      providers: [LogsService],
    }).compile();

    controller = module.get<LogsController>(LogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
