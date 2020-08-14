import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
// import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // imports: [TypeOrmModule.forFeature([PlacesDetails])],
  controllers: [LocationController],
  providers: [LocationService]
})
export class LocationModule {}
