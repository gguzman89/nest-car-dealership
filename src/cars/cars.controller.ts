import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDTO } from './dto/create-car.dto';
import { UpdateCarDTO } from './dto/update-car.dto';

@Controller('cars')
// @UsePipes( ValidationPipe )
export class CarsController {

    constructor(
        private readonly carsService: CarsService, // injection depency
    ) {}

    
    @Get()
    getAllCars(){

        return this.carsService.findAll();
    }

    @Get( ':id' )
    getCarById( @Param('id', ParseUUIDPipe) id: string ) {
        // se puede personalizar la instancia del Pipe

        console.log({ id });
        // const carID = +id;
        // throw new Error( 'Auxilio!' )

        const car = this.carsService.findOneById( id );

        return {
            car
        }
    }

    @Post()
    // @UsePipes( ValidationPipe )
    createCar( @Body() createCarDTO: CreateCarDTO ) {

        const newCar = this.carsService.create( createCarDTO )

        return newCar;
    }

    @Patch( ':id' )
    updateCar( 
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() updateCarDTO: UpdateCarDTO ) {

        return this.carsService.update( id, updateCarDTO );
    }

    @Delete( ':id' )
    deleteCar( @Param( 'id', ParseUUIDPipe ) id: string ) {

        return this.carsService.delete( id );
    }
}
