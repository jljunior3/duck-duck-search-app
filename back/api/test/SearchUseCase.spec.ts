import { Test } from '@nestjs/testing';
import { HttpClient } from '@application/clients/http.client';
import { HistoryService } from '@application/services/history.service';
import { SearchUseCase } from '@application/usecases/search.uc';

describe('SearchUseCase', () => {
  let searchUseCase: SearchUseCase;
  let httpClient: HttpClient;
  let historyService: HistoryService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SearchUseCase,
        { provide: HttpClient, useValue: { get: jest.fn() } },
        { provide: HistoryService, useValue: { create: jest.fn() } },
      ],
    }).compile();

    searchUseCase = module.get<SearchUseCase>(SearchUseCase);
    httpClient = module.get<HttpClient>(HttpClient);
    historyService = module.get<HistoryService>(HistoryService);
  });

  it('should return a list of search results when the API is called successfully', async () => {
    const term = 'test';
    const apiResponse = {
      RelatedTopics: [
        { FirstURL: 'https://example.com', Text: 'Example' },
        { FirstURL: 'https://example2.com', Text: 'Example 2' },
      ],
    };

    jest.spyOn(httpClient, 'get').mockResolvedValue(apiResponse);

    const result = await searchUseCase.execute(term);

    expect(result).toEqual([
      { url: 'https://example.com', title: 'Example' },
      { url: 'https://example2.com', title: 'Example 2' },
    ]);
  });

  it('should throw an error when the API returns an error', async () => {
    const term = 'test';

    jest
      .spyOn(httpClient, 'get')
      .mockRejectedValue(new Error('Error fetching data'));
    jest.spyOn(historyService, 'create').mockResolvedValue(Promise.resolve());

    await expect(searchUseCase.execute(term)).rejects.toThrow(
      'Search API failed',
    );
  });

  it('should update the search history correctly', async () => {
    const term = 'test';

    const apiResponse = {
      RelatedTopics: [{ FirstURL: 'https://example.com', Text: 'Example' }],
    };

    jest.spyOn(httpClient, 'get').mockResolvedValue(apiResponse);
    jest.spyOn(historyService, 'create').mockResolvedValue(Promise.resolve());

    await searchUseCase.execute(term);

    expect(historyService.create).toHaveBeenCalledTimes(1);
    expect(historyService.create).toHaveBeenCalledWith(term);
  });
});
