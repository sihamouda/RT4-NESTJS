import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cv } from './entities/cv.entity';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
  ) {}
  create(createCvDto: CreateCvDto) {
    const newCv = this.cvRepository.create(createCvDto);
    return this.cvRepository.save(newCv);
  }

  findAll() {
    return this.cvRepository.find();
  }

  findOne(id: number) {
    return this.cvRepository.findOne({ where: { id } });
  }

  update(id: number, updateCvDto: UpdateCvDto) {
    const currentCv = this.cvRepository.findOne({ where: { id } });
    const newCv = { ...currentCv, ...updateCvDto };
    return this.cvRepository.save(newCv);
  }

  remove(id: number) {
    return this.cvRepository.softDelete(id);
  }
}
