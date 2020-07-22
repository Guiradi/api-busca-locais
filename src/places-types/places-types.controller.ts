import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { PlacesTypesService } from "./places-types.service";
import { PlacesTypes } from "./places-types.entity";
import { CreatePlaceTypeDto } from './dto/create-place-type.dto';

@Controller('places-types')
export class PlacesTypesController {
  constructor(private readonly placesTypesService: PlacesTypesService) {}

  @Get()
  async findAll(): Promise<PlacesTypes[]> {
    return await this.placesTypesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string ): Promise<PlacesTypes> {
    try {
      return await this.placesTypesService.findOne(id);
    } catch (error) {
      throw new NotFoundException({ error: 'Não foi possível encontrar o lugar buscado!' })
    }
  }

  @Post()
  async create(@Body() createPlaceTypeDto: CreatePlaceTypeDto): Promise<PlacesTypes> {
    try {
      return await this.placesTypesService.create(createPlaceTypeDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // @Put(':id')
  // async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
  //   return `This action updates a #${id} cat`;
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return `This action removes a #${id} cat`;
  // }
}
