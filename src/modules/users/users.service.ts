import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({ data: createUserDto });
  }

  async get(id: number) {
    const users = await this.prisma.user.findUnique({ where: { id: id } });
    return { data: users };
  }

  async getAll() {
    return await this.prisma.user.findMany();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    console.log(id, updateUserDto);
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(idx: number) {
    console.log(idx);
    return await this.prisma.user.delete({ where: { id: idx } });
  }

  uploadFile(file) {
    fs.writeFile(`uploaded/${file.originalName}`, file.image, (err) => {
      if (err) return console.error(err);
      return { data: { status: 'File saved' } };
    });
  }

  async downloadFile(file) {
    /* const promise = fs.promises.readFile(join('uploaded/123.jpg'));
    let x;
    Promise.resolve(promise).then(function (buffer) {
      console.log(buffer.toJSON());
      buffer = x;
      console.log(x);
      return buffer;
    });*/
    const fileBuffer = await Buffer.from('uploaded/123.jpg', 'base64');
    console.log(fileBuffer);
    return fileBuffer;
  }
}
