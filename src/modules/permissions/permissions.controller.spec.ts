import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsController } from 'src/modules/permissions/permissions.controller';
import { PermissionsService } from 'src/modules/permissions/permissions.service';

describe('PermissionsController', () => {
  let controller: PermissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionsController],
      providers: [PermissionsService],
    }).compile();

    controller = module.get<PermissionsController>(PermissionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
