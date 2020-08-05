import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { PlacesDetails } from 'src/entities/places-details.entity';
import { PopulateTypeDto } from './dto/populateType.dto';
import { PlacesDetailsService } from "./places-details.service";

@Controller('places-details')
export class PlacesDetailsController {
  constructor(private readonly placesDetailsService: PlacesDetailsService) {}

  @Get()
  async findAll(): Promise<PlacesDetails[]> {
    return await this.placesDetailsService.findAll();
  }

  @Post()
  async populateType(@Body() populateTypeDto: PopulateTypeDto): Promise<boolean> {
    try {
      return await this.placesDetailsService.populateType(populateTypeDto);
    } catch (error) {
      console.error('PlacesDetails populateType error: ', error);
      throw new BadRequestException({ error: "Não foi possível buscar lugares nesta região!" });
    }
  }
}
