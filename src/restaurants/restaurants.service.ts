import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantsRepo: Repository<Restaurant>,
  ) {}
  getAll(): Promise<Restaurant[]> {
    return this.restaurantsRepo.find();
  }
  createRestaurant(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    // const newRestaurant = new Restaurant();
    const newRestaurant = this.restaurantsRepo.create(createRestaurantDto);
    return this.restaurantsRepo.save(newRestaurant);
  }
  updateRestaurant({ id, data }: UpdateRestaurantDto) {
    // update is not checking if record exists
    this.restaurantsRepo.update(id, { ...data });
  }
}
