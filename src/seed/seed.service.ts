import { Injectable } from '@nestjs/common';
import { BrandsService } from 'src/brands/brands.service';
import { CarsService } from 'src/cars/cars.service';
import { CARS_SEED, BRAND_SEED } from './data/index.seed';

@Injectable()
export class SeedService {
  constructor(
    private readonly carsService: CarsService,
    private readonly brandsService: BrandsService,
  ) {}

  populateDB(): string {
    this.carsService.fillCarsWithSeedData(CARS_SEED);
    this.brandsService.fillBrandsWithSeedData(BRAND_SEED);
    return `SEED executed successfully`;
  }
}
