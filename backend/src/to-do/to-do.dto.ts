import { IsNotEmpty, MaxLength, MinLength } from '@nestjs/class-validator';
import { Optional } from '@nestjs/common';
import { lengthError } from 'src/common-module/dtoErrorHandler/dtoError.service';
import { StatusEnum } from './to-do.enum';

export class TodoDTOForCreating {
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

export class TodoDTOForUpdating {
  @Optional()
  @MinLength(3, {
    message: lengthError(3),
  })
  @MaxLength(10, {
    message: lengthError(10, false),
  })
  name: string;
  @Optional()
  @MinLength(10, {
    message: 'Description is too short',
  })
  description: string;
  @Optional()
  status: StatusEnum;
}
