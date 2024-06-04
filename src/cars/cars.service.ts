import { Injectable } from '@nestjs/common';

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
    const carId = this.cars.find((item) => item.id === id);
    return carId || { id, message: 'Car not found' };
  }
}
