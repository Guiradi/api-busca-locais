import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne  } from 'typeorm';
import { PlacesTypes } from "./places-types.entity";

@Entity()
export class PlacesDetails {
  @PrimaryColumn()
  id: string;

  @Column()
  bairro: string;

  @Column({ name: "nome_estabelecimento" })
  nomeEstabelecimento: string;

  @Column()
  telefone: string;

  @Column()
  website: string;

  @Column()
  endereco: string;

  @ManyToOne(type => PlacesTypes, placeType => placeType.locais)
  tipo: PlacesTypes;

  @Column({ name: "raw_data" })
  rawInformations: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at'})
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at'})
  updatedAt!: Date;
}