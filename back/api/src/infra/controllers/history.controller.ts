import { Controller, Get, HttpCode } from '@nestjs/common';
import { GetHistoryUseCase } from '@application/usecases/get-history.uc';

@Controller('history')
export class HistoryController {
  constructor(private readonly getHistoryUseCase: GetHistoryUseCase) {}

  @Get()
  @HttpCode(200)
  getAll() {
    return this.getHistoryUseCase.execute();
  }
}
