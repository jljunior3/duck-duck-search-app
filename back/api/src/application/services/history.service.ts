import { Injectable } from '@nestjs/common';
import { HistoryRepository } from '@application/ports/history.repository';
import History from '@domain/entity/History';

@Injectable()
export class HistoryService {
  constructor(private readonly historyRepository: HistoryRepository) {}

  async create(query: string): Promise<void> {
    const historyEntry = History.create(query);
    await this.historyRepository.saveQuery(historyEntry.query);
  }
}
