import {
  Inject,
  Injectable, forwardRef
} from '@nestjs/common';
import {
  InjectModel
} from '@nestjs/mongoose';
import {
  Model
} from 'mongoose';
import {
  CreateEmployeeDto
} from '../dto/create-employee.dto';
import {
  UpdateEmployeeDto
} from '../dto/create-employee.dto';
import {
  LoginEmployeeDto
} from '../dto/login-employee.dto';
import {
  Employee,
  EmployeeDocument
} from '../model/employee.model';
import * as bcrypt from 'bcrypt';
import { count } from 'console';


@Injectable()
export class EmployeeService {

  constructor(@InjectModel(Employee.name) private readonly employeeModel: Model<EmployeeDocument>,

  ) { }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<EmployeeDocument> {
    const result: any = { data: [], metadata: null, error: [] }

    try {
      const { email, password } = createEmployeeDto;
      const existingUser: CreateEmployeeDto = await this.employeeModel.findOne({ email })
      if (existingUser) {
        result.error = { message: "employee with this email already exists" }
        return result
      }
      if (!existingUser) {
        const employee = new this.employeeModel(createEmployeeDto);
        const pass = await this.hashPassword(password)
        employee.password = pass
        return await employee.save()
      }

    } catch (error) {
      return error
    }
  }

  async findAll(model: any): Promise<EmployeeDocument[]> {
    const result: any = { data: [], metadata: [], error: null }

    try {
      const page = model.page
      const search = model.search
      let limit = model.limit;
      if (!limit) {
        limit = 2
      }
      if(model.search == undefined){
        result.data = await this.employeeModel.find().limit(limit).skip((page - 1) * limit).sort({ firstName: -1 });
      }
      else{

        result.data = await this.employeeModel.find(
          {
            '$or': [
              {'firstName': {$regex:model.search}},
              {'email': {$regex:model.search}},
              {'address': {$regex:model.search}}
            ]
          }
        ).limit(limit).skip((page - 1) * limit).sort({ firstName: -1 });
          
      }
      result.metadata = await this.employeeModel.countDocuments()

      return result

    } catch (error) {
      throw error
    }
  }




  async findOne(id: string) {
    return this.employeeModel.findById(id);
  }
  /**
   * @param id 
   * @param updateEmployeeDto 
   * @returns 
   * @description: this is used update the 
   *
   */

  async updateDetails(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<EmployeeDocument> {
    const result: any = { data: [], metadata: null, error: [] }

    try {
      const { email } = updateEmployeeDto;
      const existingUser = this.employeeModel.findOne({ id })
      if (!existingUser) {
        result.error = { message: "Employee does not exists" }
        return result
      }
      return this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto, { new: true });
    } catch (error) {
      return error
    }
  }

  async updatePassword(updateEmployeeDto: UpdateEmployeeDto): Promise<EmployeeDocument> {
    const result: any = { data: [], metadata: null, error: [] }

    try {
      const { email, oldPassword, newPassword, confirmPassword } = updateEmployeeDto;


      if (newPassword !== confirmPassword) {
        result.error = { message: "new password and confirm password do not match" }
        return result
      }
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(oldPassword, saltOrRounds);

      const existingUser = await this.employeeModel.findOne({ email });
      if (!existingUser) {
        result.error = { message: "employee with this email does not exists" }
        return result
      }
      console.log(existingUser)
      const isMatch = await bcrypt.compare(oldPassword, existingUser.password);
      if (!isMatch) {
        result.error = { message: "old password is incorrect" }
        return result
      }
      existingUser.password = newPassword;
      const pass = await this.hashPassword(newPassword)
      existingUser.password = pass
      await existingUser.save();

      return existingUser

    } catch (error) {
      throw error;
    }
  }

  async forgetPassword(updateEmployeeDto: UpdateEmployeeDto): Promise<EmployeeDocument> {
    const result: any = { data: [], metadata: null, error: [] }
    try {
      const { email, newPassword, confirmPassword } = updateEmployeeDto;

      if (newPassword !== confirmPassword) {
        result.error = { message: "new password and confirm password do not match" }
        return result
      }

      const existingUser = await this.employeeModel.findOne({ email });
      if (!existingUser) {
        result.error = { message: "employee with this email does not exists" }
        return result
      }

      existingUser.password = newPassword;
      await existingUser.save();

      return existingUser;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const result: any = { data: [], metadata: null, error: [] }
    try {
      const findEmployee = this.employeeModel.findOne({ id })
      if (!findEmployee) {
        result.error = { message: "employee does not exists" }
        return result
      }
      const removeEmployee = this.employeeModel.findByIdAndDelete(id);

    } catch (error) {
      return error
    }
  }




  async findByAttribute(loginEmployeeDto: LoginEmployeeDto): Promise<EmployeeDocument> {
    try {
      console.log(loginEmployeeDto)
      const existingUser = await this.employeeModel.findOne(loginEmployeeDto).lean()
      if (!existingUser) {
        return null
      }
      return this.employeeModel.findByIdAndUpdate(existingUser);
    } catch (error) {
      return error
    }
  }


  async hashPassword(password) {
    try {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltOrRounds);

      return hashedPassword
    } catch (error) {
      return error
    }
  }
}