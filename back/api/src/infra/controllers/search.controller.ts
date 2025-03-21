import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SearchRequest } from './req/search.req';
import { SearchUseCase } from '@application/usecases/search.uc';

@Controller('search')
export class SearchController {
  constructor(private readonly searchUseCase: SearchUseCase) {}

  @Post()
  @HttpCode(200)
  search(@Body() request: SearchRequest) {
    return this.searchUseCase.execute(request.term);
  }
}
