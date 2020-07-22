import { Test, TestingModule } from '@nestjs/testing';
import { PlacesTypesService } from './places-types.service';

describe('PlacesTypesService', () => {
  let service: PlacesTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlacesTypesService],
    }).compile();

    service = module.get<PlacesTypesService>(PlacesTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
