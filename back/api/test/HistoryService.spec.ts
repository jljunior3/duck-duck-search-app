import { Test } from '@nestjs/testing';
import { HistoryService } from '@application/services/history.service';
import { HistoryRepository } from '@application/ports/history.repository';

describe('HistoryService', () => {
  let historyService: HistoryService;
  let historyRepository: HistoryRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        HistoryService,
        {
          provide: HistoryRepository,
          useValue: { saveQuery: jest.fn() },
        },
      ],
    }).compile();

    historyService = module.get<HistoryService>(HistoryService);
    historyRepository = module.get<HistoryRepository>(HistoryRepository);
  });

  it('should create a new history entry and save it', async () => {
    const query = 'test search';

    jest
      .spyOn(historyRepository, 'saveQuery')
      .mockResolvedValue(Promise.resolve());

    await historyService.create(query);

    expect(historyRepository.saveQuery).toHaveBeenCalledTimes(1);
    expect(historyRepository.saveQuery).toHaveBeenCalledWith(query);
  });
});
