import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlacesTypesController } from './places-types.controller';
import { PlacesTypesService } from './places-types.service';
import { PlacesTypes } from "../../entities/places-types.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PlacesTypes])],
  controllers: [PlacesTypesController],
  providers: [PlacesTypesService]
})
export class PlacesTypesModule {}
