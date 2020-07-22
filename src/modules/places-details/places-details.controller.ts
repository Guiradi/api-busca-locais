import { Controller, Get } from '@nestjs/common';
import { PlacesDetails } from 'src/entities/places-details.entity';
import { PlacesDetailsService } from "./places-details.service";

@Controller('places-details')
export class PlacesDetailsController {
  constructor(private readonly placesDetailsService: PlacesDetailsService) {}

  @Get()
  async findAll(): Promise<PlacesDetails[]> {
    return await this.placesDetailsService.findAll();
  }
}
