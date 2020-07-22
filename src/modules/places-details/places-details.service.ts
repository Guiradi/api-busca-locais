import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { PlacesDetails } from 'src/entities/places-details.entity';
import { Repository } from "typeorm";

@Injectable()
export class PlacesDetailsService {
  constructor(
    @InjectRepository(PlacesDetails)
    private placesDetailsRepository: Repository<PlacesDetails>
  ) {}

  async findAll(): Promise<PlacesDetails[]> {
    return await this.placesDetailsRepository.find({ where: { isActive: true } });
  }
}
