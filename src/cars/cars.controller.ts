import { Controller, Get, Param } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarByID(@Param('id') id: string) {
    const parseId = Number(id);

    if (parseId >= 0) {
      return this.carsService.findOneById(Number(id));
    } else {
      return { message: 'Car ID Failed, check and retry again' };
    }
  }
}
