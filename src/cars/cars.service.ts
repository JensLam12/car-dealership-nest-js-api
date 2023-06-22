import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDTO } from './dto/create-car.dto';
import { REFUSED } from 'dns';
import { UpdateCarDTO } from './dto/update-car.dto';

@Injectable()
export class CarsService {
    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'
        }
    ]

    findAll() {
        return this.cars;
    }

    findOneById( id: string) {
        const car = this.cars.find( car => car.id === id );

        if(!car) throw new NotFoundException(`Car with '${id}' not found`);

        return car;
    }

    create( createCarDto: CreateCarDTO ) {
        const car: Car = {
            id: uuid(),
            ...createCarDto
            // brand: createCarDto.brand,
            // model: createCarDto.model
        }
        this.cars.push(car);

        return car;
    }

    update( id: string, updateCarDTO: UpdateCarDTO ) {
        let carDB = this.findOneById(id);

        if( updateCarDTO.id && updateCarDTO.id !== id )
            throw new BadRequestException(`Car id is not valid`);

        this.cars = this.cars.map( car => {
            if( car.id === id) {
                carDB = {
                    ...carDB,
                    ...updateCarDTO,
                    id
                }
                return carDB;
            }
            return car;
        });

        return carDB;
    }

    delete( id: string ) {
        const carDB = this.findOneById(id);
        this.cars = this.cars.filter( car => car.id !== id );
        return carDB;
    }
}
