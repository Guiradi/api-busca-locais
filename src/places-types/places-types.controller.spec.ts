import { Test, TestingModule } from '@nestjs/testing';
import { PlacesTypesController } from './places-types.controller';

describe('PlacesTypes Controller', () => {
  let controller: PlacesTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlacesTypesController],
    }).compile();

    controller = module.get<PlacesTypesController>(PlacesTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
