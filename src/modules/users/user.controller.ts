import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserRequest } from './interfaces/users.pb';
import { FileUploadDto } from './dto/file-upload.dto';
import { RemoveUserDto } from './dto/remove-user.dto';
import { FileDownloadDto } from './dto/file-download.dto';
import { join } from 'path';

@Controller()
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UsersService', 'createUser')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @GrpcMethod('UsersService', 'getUser')
  get(data: GetUserRequest) {
    // return { status: 1, data: { id: data.id } };
    return this.usersService.get(data.id);
  }

  @GrpcMethod('UsersService', 'getAll')
  getAll() {
    return this.usersService.getAll();
  }

  @GrpcMethod('UsersService', 'updateUser')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @GrpcMethod('UsersService', 'deleteUser')
  remove(@Payload() removeUserDto: RemoveUserDto) {
    return this.usersService.remove(removeUserDto.id);
  }

  @GrpcMethod('UsersService', 'uploadFile')
  uploadFile(@Payload() file: FileUploadDto) {
    return this.usersService.uploadFile(file);
  }

  @GrpcMethod('UsersService', 'downloadFile')
  downloadFile(@Payload() fileDownloadDto: FileDownloadDto) {
    const filepath = join(__dirname, './uploaded/123.jpg');
    const fileBuffer = Buffer.from(filepath, 'base64');
    console.log(fileBuffer);
    return { data: fileBuffer.toJSON() };
  }
}
