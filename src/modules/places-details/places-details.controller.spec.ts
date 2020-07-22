import { Test, TestingModule } from '@nestjs/testing';
import { PlacesDetailsController } from './places-details.controller';

describe('PlacesDetails Controller', () => {
  let controller: PlacesDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlacesDetailsController],
    }).compile();

    controller = module.get<PlacesDetailsController>(PlacesDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
