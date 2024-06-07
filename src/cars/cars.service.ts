import { v4 as uuid } from 'uuid';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Car } from './interfaces/car.interface';
import { CreateCarDTO } from './dto/create-car.dto';
import { UpdateCarDTO } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Autana',
    // },
  ];

  /**
   * findAll find all cars
   */
  findAll() {
    return this.cars;
  }

  /**
   * findOneById find one car
   */
  findOneById(id: string): Car {
    const car = this.cars.find((item) => item.id === id);

    if (!car) throw new NotFoundException(`Car with id '${id}' not found`);

    return car;
  }

  /**
   * findOneByModel find one model car
   */
  findOneByModel(model: string): Car {
    return this.cars.find((item) => item.model === model);
  }

  /**
   * create allow created a new car
   */
  create(createCarDTO: CreateCarDTO): Car {
    const createCar: Car = {
      id: uuid(),
      ...createCarDTO,
    };

    const findModel = this.findOneByModel(createCarDTO.model);

    if (findModel)
      throw new BadRequestException(
        `Car with model '${findModel.model}' exist!`,
      );

    this.cars.push(createCar);
    return createCar;
  }

  /**
   * update allow modified attributes car
   */
  update(id: string, updateCarDTO: UpdateCarDTO): Car {
    let carDB: Car = this.findOneById(id);

    if (updateCarDTO.id && updateCarDTO.id !== id)
      throw new BadRequestException('ID sent inside body is not valid');

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = { ...carDB, ...updateCarDTO, id };
        return carDB;
      }

      return car;
    });

    return carDB;
  }

  /**
   * delete allow deleted a car
   */
  delete(id: string): Car[] {
    const findCar = this.findOneById(id);
    this.cars = this.cars.filter((car) => car.id !== findCar.id);
    return this.cars;
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
