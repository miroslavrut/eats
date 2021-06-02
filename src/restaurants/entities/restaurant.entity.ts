import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field(type => Number)
  id: number;

  @Field(type => String)
  @Column()
  @IsString()
  @Length(5, 25)
  name: string;

  @Field(type => Boolean, { nullable: true })
  @Column({ default: false })
  @IsOptional()
  @IsBoolean()
  isVegan: boolean;

  @Field(type => String, { defaultValue: 'address' })
  @Column()
  @IsString()
  address: string;

  // @Field(type => String)
  // @Column()
  // @IsString()
  // ownerName: string;

  // @Field(type => String)
  // @Column()
  // @IsString()
  // categoryName: string;

  // @Field(type => Boolean, { nullable: true })
  // @Column()
  // isGood?: boolean;
}
