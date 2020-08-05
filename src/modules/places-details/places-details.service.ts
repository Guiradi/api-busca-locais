import axios from "axios";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { PlacesDetails } from 'src/entities/places-details.entity';
import { Repository } from "typeorm";
import { PlacesIdInterface } from "./interfaces/placesId.interface";
import { PlaceDetailInterface } from "./interfaces/place.detail.interface"

function sleep(milliseconds): void {
  const date = Date.now()
  let currentDate = null
  do {
    currentDate = Date.now()
  } while (currentDate - date < milliseconds)
}

@Injectable()
export class PlacesDetailsService {
  constructor(
    @InjectRepository(PlacesDetails)
    private placesDetailsRepository: Repository<PlacesDetails>
  ) {}

  async findAll(): Promise<PlacesDetails[]> {
    return await this.placesDetailsRepository.find({ where: { isActive: true } });
  }

  async populateType({ type, location, radius = 2000 }): Promise<boolean> {
    this.fetchPlaces({ type, location, radius });
    return true;
  }

  async fetchPlaces({ type, location, radius }): Promise<boolean> {
    try {
      const { placesIds, next_page_token } = await this.fetch20Places(type, location, radius);

      let token: string = next_page_token;

      while (token) {
        sleep(3000);

        const fetchWithToken = await this.fetch20Places(type, location, radius, token);

        placesIds.push(...fetchWithToken.placesIds);
        token = fetchWithToken.next_page_token || null;
      }

      await this.savePlaces(placesIds, type);
      
      return true
    } catch (error) {
      console.error("fetchPlaces error: ", error);
      throw error;
    }
  }

  async fetch20Places(type: string, location: string, radius: number, pagetoken: string = null): Promise<PlacesIdInterface> {
    try {
      const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

      const {
        data: { results = [], next_page_token = null },
      } = await axios({
        url,
        method: 'get',
        params: {
        key: process.env.GOOGLE_API_KEY,
        location,
        radius,
        type,
        pagetoken,
      },
      })

      const placesIds = results.map(({ place_id }) => place_id)

      return { placesIds, next_page_token }
    } catch (error) {
      console.error('fetch20Places', error)
      throw error
    }
  }

  async fetchPlaceDetails(place_id: string): Promise<PlaceDetailInterface> {
    try {
      const { data } = await axios({
        url: 'https://maps.googleapis.com/maps/api/place/details/json',
        method: 'get',
        params: {
          place_id,
          key: process.env.GOOGLE_API_KEY,
          fields:
            'address_components,name,formatted_phone_number,website,formatted_address',
        },
      })

      const bairroObj = data.result.address_components.find((x) =>
        x.types.includes('sublocality')
      )

      return {
        bairro: bairroObj ? bairroObj.long_name : '-',
        nomeEstabelecimento: data.result.name || '-',
        telefone: data.result.formatted_phone_number || '-',
        website: data.result.website || '-',
        endereco: data.result.formatted_address || '-',
        rawInformations: JSON.stringify(data.result)
      }
    } catch (error) {
      console.error('fetchPlaceDetails', error)
      throw error
    }
  }

  async savePlaces(placesIds: string[], type: string): Promise<void> {
    try {
      const placesDetails = [];

      for await (const placeId of placesIds) {
        const googlePlaceDetail = await this.fetchPlaceDetails(placeId);
        placesDetails.push({ ...googlePlaceDetail, id: placeId, tipo: type });
      }

      await this.placesDetailsRepository.save(placesDetails);
    } catch (error) {
      console.error("savePlaces error: ", error);
      throw error;
    }
  }
}
