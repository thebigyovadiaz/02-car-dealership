import { v4 as uuid } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    // {
    //   id: uuid(),
    //   name: 'toyota',
    //   createdAt: new Date().getTime(),
    //   updatedAt: new Date().getTime(),
    // },
  ];

  findAll(): Brand[] {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) {
      throw new NotFoundException(`Brand with id '${id}' not found`);
    }
    return brand;
  }

  findOneByName(name: string) {
    const brand = this.brands.find(
      (brand) => brand.name === name.toLowerCase(),
    );

    if (!brand) {
      throw new NotFoundException(`Brand with name '${name}' not found`);
    }

    return brand;
  }

  create(createBrandDto: CreateBrandDto) {
    const findBrand = this.brands.find(
      (brand) => brand.name === createBrandDto.name.toLowerCase(),
    );

    if (findBrand) {
      throw new NotFoundException(
        `Brand with name '${createBrandDto.name}' already exists`,
      );
    }

    const { name } = createBrandDto;

    const newBrand: Brand = {
      id: uuid(),
      name: name.toLowerCase(),
      createdAt: new Date().getTime(),
    };

    this.brands.push(newBrand);
    return newBrand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDB = this.findOne(id);

    if (brandDB.id !== id)
      throw new NotFoundException(`Brand with id '${id}' not found`);

    this.brands = this.brands.map((brand) => {
      if (brand.id === id) {
        brandDB.updatedAt = new Date().getTime();
        brandDB = { ...brandDB, ...updateBrandDto };
        return brandDB;
      }

      return brand;
    });

    return brandDB;
  }

  remove(id: string) {
    const brandDB = this.findOne(id);
    this.brands = this.brands.filter((brand) => brand.id !== brandDB.id);
    return this.brands;
  }

  fillBrandsWithSeedData(brands: Brand[]) {
    this.brands = brands;
  }
}
