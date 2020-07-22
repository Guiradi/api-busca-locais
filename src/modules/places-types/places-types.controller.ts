import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { PlacesTypesService } from "./places-types.service";
import { PlacesTypes } from "../../entities/places-types.entity";
import { CreatePlaceTypeDto } from './dto/create-place-type.dto';
import { UpdatePlaceTypeDto } from './dto/update-place-type.dto';

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
      console.error('PlacesTypes create error: ', error);
      throw new BadRequestException({ error: "Não foi possível criar este lugar!" });
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePlaceTypeDto: UpdatePlaceTypeDto): Promise<PlacesTypes> {
    try {
      return await this.placesTypesService.update(id, updatePlaceTypeDto);
    } catch (error) {
      console.error('PlacesTypes update error: ', error);
      throw new BadRequestException({ error: "Não foi possível atualizar este lugar!" });
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    try {
      return await this.placesTypesService.delete(id);
    } catch (error) {
      console.error('PlacesTypes delete error: ', error);
      throw new BadRequestException({ error: "Não foi possível deletar este lugar!" });
    }
  }
}
