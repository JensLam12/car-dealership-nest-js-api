import { Body, Controller,Delete,Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDTO, UpdateCarDTO } from './dto';

@Controller('cars')
//@UsePipes( ValidationPipe)
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ) { }

    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get(':id')
    getCarById( @Param('id', new ParseUUIDPipe({ version: '4' }) ) id: string) {
        
        return this.carsService.findOneById( id );
    }

    @Post()
    createCar( @Body() createCarDTO: CreateCarDTO) {
        return this.carsService.create( createCarDTO );
    }

    @Patch(":id")
    updateCar( 
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() updateCarDTO: UpdateCarDTO
    ) {
        return this.carsService.update( id, updateCarDTO );
    }

    @Delete(":id")
    deleteCar( 
        @Param('id', ParseUUIDPipe) id: string 
    ) {
        return this.carsService.delete( id );
    }
}
