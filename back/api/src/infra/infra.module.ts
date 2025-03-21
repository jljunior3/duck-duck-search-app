import { DynamicModule, Module } from '@nestjs/common';
import { SearchController } from './controllers/search.controller';
import ApplicationModule from '../application/application.module';
import { HistoryRepository } from '@application/ports/history.repository';
import JsonFileHistoryAdapter from '@infra/adapters/json-file-history.adapter';
import DomainModule from '@domain/domain.module';
import { HistoryController } from '@infra/controllers/history.controller';

@Module({})
export default class InfraModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: InfraModule,
      imports: [ApplicationModule, DomainModule],
      providers: [
        {
          provide: HistoryRepository,
          useClass: JsonFileHistoryAdapter,
        },
      ],
      exports: [HistoryRepository],
      controllers: [SearchController, HistoryController],
    };
  }
}
