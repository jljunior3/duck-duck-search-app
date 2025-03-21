import { Injectable } from '@nestjs/common';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { HistoryRepository } from '@application/ports/history.repository';
import History from '@domain/entity/History';

@Injectable()
export default class JsonFileHistoryAdapter implements HistoryRepository {
  private readonly historyFile = join(__dirname, '../../../history.json');
  private history: History[] = [];

  constructor() {
    this.loadHistory();
  }

  async saveQuery(query: string): Promise<void> {
    if (!query || this.history.some((h) => h.query === query)) return;

    this.history.push(History.create(query));
    this.saveHistory();
  }

  async getHistory(): Promise<History[]> {
    return this.history;
  }

  private saveHistory(): void {
    writeFileSync(
      this.historyFile,
      JSON.stringify(this.history, null, 2),
      'utf8',
    );
  }

  private loadHistory(): void {
    if (existsSync(this.historyFile)) {
      const fileContent = readFileSync(this.historyFile, 'utf8');
      this.history = JSON.parse(fileContent);
    } else {
      this.history = [];
      this.saveHistory();
    }
  }
}
