import axios from "axios";
import { isEmpty } from "lodash";
import { BadRequestException, Injectable } from '@nestjs/common';
import { Location } from "src/entities/location";

@Injectable()
export class LocationService {
  async findLocation(address: string): Promise<Location> {
    try {
      const url = 'https://maps.googleapis.com/maps/api/geocode/json';

      const {
        data: { results = [] },
      } = await axios({
        url,
        method: 'get',
        params: {
          key: process.env.GOOGLE_API_KEY,
          address
        },
      })

      if (!isEmpty(results)) {
        const endereco = results[0].formatted_address;
        const locationObj = results[0].geometry.location;

        return {
          endereco,
          location: `${locationObj.lat},${locationObj.lng}`
        }
      } else {
        throw new Error('Local não encontrado');
      }
    } catch (error) {
      console.error(error);
      throw new BadRequestException({ error: "Não foi possível encontrar esse local!" });  
    }
    
  }
}
