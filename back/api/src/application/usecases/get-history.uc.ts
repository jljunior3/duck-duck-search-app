import { Injectable } from '@nestjs/common';
import { HistoryRepository } from '@application/ports/history.repository';
import History from '@domain/entity/History';

@Injectable()
export class GetHistoryUseCase {
  constructor(private readonly historyRepository: HistoryRepository) {}

  async execute(): Promise<History[]> {
    return this.historyRepository.getHistory();
  }
}
