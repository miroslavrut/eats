import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';

// Use InputType/ArgsType for graphql DTO-like input arguments
@ArgsType()
export class CreateRestaurantDto {
  @Field(type => String)
  @IsString()
  @Length(5, 10)
  name: string;

  @Field(type => Boolean)
  @IsBoolean()
  isVegan: string;

  @Field(type => String)
  @IsString()
  address: string;

  @Field(type => String)
  @IsString()
  ownersName: string;
}
