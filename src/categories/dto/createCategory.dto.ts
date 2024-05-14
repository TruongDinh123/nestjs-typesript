import { IsString } from 'class-validator';

export class CeateCategoryDTO {
  @IsString()
  name: string;
}
