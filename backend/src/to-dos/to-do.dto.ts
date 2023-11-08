import { IsNotEmpty, MaxLength, MinLength } from '@nestjs/class-validator';
import { lengthError } from 'src/common-module/dtoErrorHandler/dtoError.service';
import { StatusEnum } from './to-do.enum';
import { PartialType } from '@nestjs/mapped-types';

export class TodoDTO {
  @IsNotEmpty()
  @MinLength(3, {
    message: lengthError(3),
  })
  @MaxLength(10, {
    message: lengthError(10, false),
  })
  name: string;
  @IsNotEmpty()
  @MinLength(10, {
    message: 'Description is too short',
  })
  description: string;
  @IsNotEmpty()
  status: StatusEnum;
}

export class TodoDTOForUpdating extends PartialType(TodoDTO) {}
