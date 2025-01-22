import { Test, TestingModule } from '@nestjs/testing';
import {auditsService } from 'src/modules/logs/logs.service';

describe('LogsService', () => {
  let service:auditsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogsService],
    }).compile();

    service = module.get<LogsService>(LogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
