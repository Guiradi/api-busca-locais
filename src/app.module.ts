import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlacesTypesModule } from './modules/places-types/places-types.module';
import { PlacesDetailsModule } from './modules/places-details/places-details.module';
import { LocationModule } from './modules/location/location.module';

@Module({
  imports: [TypeOrmModule.forRoot(), PlacesTypesModule, PlacesDetailsModule, LocationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
