import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from "uuid";
import { Car } from './interfaces/car.interface';
import { CreateCarDTO, UpdateCarDTO } from './dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        // {
        //     id: uuid(),
        //     brand: 'Toyota',
        //     model: 'Corolla'
        // },
        // {
        //     id: uuid(),
        //     brand: 'Honda',
        //     model: 'Civic'
        // },
        // {
        //     id: uuid(),
        //     brand: 'Jeep',
        //     model: 'Cherokee'
        // }
    ];

    findAll() {
        return this.cars;
    }
    
    findOneById( id: string ) {

        // const car = this.cars.at( id )
        const car = this.cars.find( car => car.id === id );
        if ( !car ) throw new NotFoundException( `Car with id ${ id } not found.` )

        return car;
    }

    create( createCarDTO: CreateCarDTO ) {

        const car: Car = {
            id: uuid(),
            ...createCarDTO
            // brand: createCarDTO.brand,
            // model: createCarDTO.model
        }

        this.cars.push( car )

        return car;
    }

    update( id: string, updateCarDTO: UpdateCarDTO ) {

        let carDB = this.findOneById( id );

        this.cars = this.cars.map( car => {

            if ( car.id === id ) {
                
                carDB = {
                    ...carDB,
                    ...updateCarDTO,
                    id
                }

                return carDB;
            }

            return car;
        })

        return carDB;
    }

    delete( id: string) {
    
        let carDB = this.findOneById( id );
        this.cars = this.cars.filter( car => car.id !== carDB.id );
    }

    fillCarsWithSeedData( cars: Car[] ) {
        this.cars = cars;
      }
}
