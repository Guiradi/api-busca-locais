import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesDetails } from 'src/entities/places-details.entity';
import { PlacesDetailsController } from './places-details.controller';
import { PlacesDetailsService } from './places-details.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlacesDetails])],
  controllers: [PlacesDetailsController],
  providers: [PlacesDetailsService]
})
export class PlacesDetailsModule {}
