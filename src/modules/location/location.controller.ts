import { Body, Controller, Get } from '@nestjs/common';
import { Location } from 'src/entities/location';
import { LocationDto } from './dto/location.dto';
import { LocationService } from "./location.service";

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  async findLocation(@Body() locationDto: LocationDto): Promise<Location> {
    return await this.locationService.findLocation(locationDto.address);
  }
}
