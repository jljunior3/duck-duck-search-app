import History from '@domain/entity/History';

export abstract class HistoryRepository {
  abstract saveQuery(query: string): Promise<void>;

  abstract getHistory(): Promise<History[]>;
}
