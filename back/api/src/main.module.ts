import { Module } from '@nestjs/common';
import DomainModule from './domain/domain.module';
import ApplicationModule from './application/application.module';
import InfraModule from '@infra/infra.module';

@Module({
  imports: [DomainModule, ApplicationModule, InfraModule.forRoot()],
  controllers: [],
  providers: [],
})
export class MainModule {}
