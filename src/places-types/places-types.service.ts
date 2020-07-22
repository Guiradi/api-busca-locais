import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PlacesTypes } from "./places-types.entity"

@Injectable()
export class PlacesTypesService {
  constructor(
    @InjectRepository(PlacesTypes)
    private placesTypesRepository: Repository<PlacesTypes>
  ) {}

  async findAll(): Promise<PlacesTypes[]> {
    return await this.placesTypesRepository.find({ where: { isActive: true } });
  }

  async findOne(id: string): Promise<PlacesTypes> {
    const placeType = await this.placesTypesRepository.findOneOrFail(id);

    if (!placeType.isActive) {
      throw new Error('Local não encontrado!');
    }

    return placeType;
  }

  async create({ id, nome, isActive = true }): Promise<PlacesTypes> {
    const placesType = await this.placesTypesRepository.create({ id, nome, isActive });
    return await this.placesTypesRepository.save(placesType);
  }

  async update(id: string, { nome, isActive = true }): Promise<PlacesTypes> {
    const placeType = await this.placesTypesRepository.findOneOrFail(id);
    return await this.placesTypesRepository.save({ ...placeType, nome, isActive });
  }

  async delete(id: string): Promise<boolean> {
    const placeType = await this.placesTypesRepository.findOneOrFail(id);
    await this.placesTypesRepository.save({ ...placeType, isActive: false });
    return true;
  }
}
