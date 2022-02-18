import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity } from "typeorm";
import { Ingredient } from "./ingredient";

@Entity()
export class Product extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Ingredient)
    @JoinTable()
    ingredients: Ingredient[];
}
