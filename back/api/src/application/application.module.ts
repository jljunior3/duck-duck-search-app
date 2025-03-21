import { Module } from '@nestjs/common';
import DomainModule from '../domain/domain.module';
import { SearchUseCase } from './usecases/search.uc';
import { HttpClient } from './clients/http.client';
import { HistoryService } from '@application/services/history.service';
import { GetHistoryUseCase } from '@application/usecases/get-history.uc';

@Module({
  imports: [DomainModule],
  providers: [HttpClient, SearchUseCase, HistoryService, GetHistoryUseCase],
  exports: [HttpClient, SearchUseCase, HistoryService, GetHistoryUseCase],
})
export default class ApplicationModule {}
