import { Injectable, NotFoundException } from '@nestjs/common';

interface Car {
  brand: string;
  model: string;
}

@Injectable()
export class CarsService {
  private cars = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Autana',
    },
    {
      id: 2,
      brand: 'Subaru',
      model: 'Impreza',
    },
    {
      id: 3,
      brand: 'Audi',
      model: 'Q7',
    },
    {
      id: 4,
      brand: 'BMW',
      model: 'M7',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: number) {
    const car = this.cars.find((item) => item.id === id);

    if (!car) throw new NotFoundException(`Car with id '${id}' not found`);

    return car;
  }

  save(car: Car) {
    const id = this.cars.length + 1;

    this.cars.push({
      id,
      brand: car.brand,
      model: car.model,
    });

    return this.cars;
  }

  update(id: number, data: Car) {
    const findCar = this.cars.find((car) => car.id === id);

    if (!findCar) {
      throw new NotFoundException(`Car with id '${id}' not found`);
    }

    findCar.brand = data.brand;
    findCar.model = data.model;
    return this.cars;
  }

  delete(id: number) {
    const newCars = this.cars.filter((car) => car.id !== id);
    this.cars = newCars;
    return this.cars;
  }
}
