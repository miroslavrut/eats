/* eslint-disable arrow-parens */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Resolver(of => Restaurant)
export class RestaurantResolver {
  @Query(returns => Boolean)
  isPizzaGood(): boolean {
    return true;
  }

  @Query(returns => Restaurant)
  myRestaurant() {
    return true;
  }

  @Query(returns => [Restaurant])
  restaurants(@Args('veganOnly') veganOnly: boolean): Restaurant[] {
    return [];
  }

  // Without DTO/InputType, all arguments are declared here
  // @Mutation(returns => Boolean)
  // createRestaurant(
  //   @Args('name') name: string,
  //   @Args('isVegan') isVegan: boolean,
  //   @Args('address') address: string,
  //   @Args('ownerName') ownerName: string,
  // ): boolean {
  //   return true;
  // }

  // Using DTO/InputType/ArgsType
  // With InputType we need to pass whole object, while with ArgsType
  // we can pass just arguments
  @Mutation(returns => Boolean)
  createRestaurant(@Args() createRestaurantDto: CreateRestaurantDto): boolean {
    console.log(createRestaurantDto);
    return true;
  }
}
