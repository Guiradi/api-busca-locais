import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlacesTypesModule } from './places-types/places-types.module';

@Module({
  imports: [TypeOrmModule.forRoot(), PlacesTypesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
