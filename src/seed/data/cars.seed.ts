import { v4 as uuid } from 'uuid';
import { Car } from 'src/cars/interfaces/car.interface';

export const CARS_SEED: Car[] = [
  {
    id: uuid(),
    brand: 'Toyota',
    model: 'Autana',
  },
  {
    id: uuid(),
    brand: 'Subaru',
    model: 'Impreza',
  },
  {
    id: uuid(),
    brand: 'Audi',
    model: 'Q7',
  },
  {
    id: uuid(),
    brand: 'BMW',
    model: 'M7',
  },
];
