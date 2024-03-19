import {
  PartialType
} from '@nestjs/mapped-types';
import { Role} from '../utills/enums/enum'


export class CreateEmployeeDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  password: string;
  role: Role;
}

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) { 
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}