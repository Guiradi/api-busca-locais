import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany  } from 'typeorm';
import { PlacesDetails } from './places-details.entity';

@Entity()
export class PlacesTypes {
  @PrimaryColumn()
  id: string;

  @Column()
  nome: string;

  @OneToMany(type => PlacesDetails, placeDetails => placeDetails.tipo)
  locais: PlacesDetails[] 

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at'})
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at'})
  updatedAt!: Date;
}