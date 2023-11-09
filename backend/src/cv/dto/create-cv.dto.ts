import { IsNotEmpty } from '@nestjs/class-validator';

export class CreateCvDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  cin: number;

  @IsNotEmpty()
  job: string;

  @IsNotEmpty()
  path: string;
}
