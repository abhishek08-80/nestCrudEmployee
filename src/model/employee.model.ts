import {
    Prop,
    Schema,
    SchemaFactory
  } from '@nestjs/mongoose';
  import { IsNumber, IsObject, IsString } from 'class-validator'
  import {
    Document, now
  } from 'mongoose';
  import { 
    nanoid
   } from 'nanoid';   
import { Role } from 'src/utills/enums/enum';

  export type EmployeeDocument = Employee & Document;
  
  @Schema()
  export class Employee {
    
    @IsString()
    @Prop({ default: () => nanoid() }) 
    _id: string;

    @Prop({default:false, required:true})
    firstName: string;

    @Prop()
    lastName: string;
  
    @Prop()
    email: string;
  
    @Prop()
    address: string;
    
    @Prop()
    password: string;

    @Prop({default: Role.Staff})
    role: string;

    @Prop({default: now()})
    createdAt: Date;

    @Prop({default: now()})
    updatedAt: Date;

  }
  
  export const EmployeeSchema = SchemaFactory.createForClass(Employee);

