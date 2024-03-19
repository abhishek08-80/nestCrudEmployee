import * as Joi from 'joi';
  import {Role} from '../utills/enums/enum'
  
export const employeeSignupValidation = Joi.object({
  _id: Joi.string().optional(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  address: Joi.string().required(),
  password: Joi.string().required().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 
  'password'),
  // role: Joi.string().valid('Admin','Staff')
  role: Joi.string()
  .valid(...Object.values(Role)),

})

export const employeeUpdateValidation = Joi.object().keys({
  _id: Joi.string().optional(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  email: Joi.string().optional(),
  address: Joi.string().optional().allow(""),
  newPassword: Joi.string().optional().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 
  'password'),
  oldPassword: Joi.string().optional().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 
  'password'),
  confirmPassword: Joi.string().optional().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 
  'password')
})


export const employeeChangeValidation = Joi.object().keys({
  email: Joi.string().required(),
  oldPassword: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 
      'password'),
  newPassword: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 
      'password'),
  confirmPassword: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 
      'password')
})

export const employeeForgetValidation = Joi.object().keys({
  email: Joi.string().required(),
  newPassword: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 
      'password'),
  confirmPassword: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 
      'password')
})

export const employeeLoginValidation = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 
      'password'),
})