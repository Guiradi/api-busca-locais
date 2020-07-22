import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn  } from 'typeorm';

@Entity()
export class PlacesTypes {
  @PrimaryColumn()
  id: string;

  @Column()
  nome: string;

  // @Column("text")
  // nome: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at'})
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at'})
  updatedAt!: Date;
}