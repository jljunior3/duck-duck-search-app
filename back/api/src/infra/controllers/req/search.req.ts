import { IsNotEmpty, IsString } from 'class-validator';

export class SearchRequest {
  @IsNotEmpty()
  @IsString()
  term: string;
}
