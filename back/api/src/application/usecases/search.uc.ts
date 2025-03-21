import { Injectable } from '@nestjs/common';
import { HttpClient } from '@application/clients/http.client';
import Search from '@domain/entity/search';
import { HistoryService } from '@application/services/history.service';

interface Icon {
  Height: number;
  URL: string;
  Width: number;
}

interface ResultItem {
  FirstURL: string;
  Icon: Icon;
  Result: string;
  Text: string;
}

interface ApiResponse {
  Results: ResultItem[];
  RelatedTopics: ResultItem[];
}

@Injectable()
export class SearchUseCase {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly historyService: HistoryService,
  ) {}

  async execute(term: string): Promise<Search[]> {
    this.historyService.create(term);
    try {
      const result = await this.httpClient.get<ApiResponse>(
        `https://api.duckduckgo.com/?q=${term}&format=json`,
      );

      if (result && result.RelatedTopics) {
        return result.RelatedTopics.map((item) => ({
          url: item.FirstURL,
          title: item.Text,
        })).filter((item) => item.url && item.title);
      } else {
        throw new Error('Invalid response from API');
      }
    } catch (error) {
      throw new Error('Search API failed');
    }
  }
}
