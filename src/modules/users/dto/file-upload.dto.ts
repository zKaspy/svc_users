import * as Buffer from 'buffer';

export interface FileUploadDto {
  image: Buffer;
  originalName: string;
}
