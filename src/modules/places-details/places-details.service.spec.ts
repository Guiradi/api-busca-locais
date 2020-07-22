import { Test, TestingModule } from '@nestjs/testing';
import { PlacesDetailsService } from './places-details.service';

describe('PlacesDetailsService', () => {
  let service: PlacesDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlacesDetailsService],
    }).compile();

    service = module.get<PlacesDetailsService>(PlacesDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
