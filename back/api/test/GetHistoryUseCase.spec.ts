import { Test } from '@nestjs/testing';
import { GetHistoryUseCase } from '@application/usecases/get-history.uc';
import { HistoryRepository } from '@application/ports/history.repository';
import History from '@domain/entity/History';

describe('GetHistoryUseCase', () => {
  let getHistoryUseCase: GetHistoryUseCase;
  let historyRepository: HistoryRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetHistoryUseCase,
        {
          provide: HistoryRepository,
          useValue: { getHistory: jest.fn() }, // 🔥 Mockamos o método `getHistory`
        },
      ],
    }).compile();

    getHistoryUseCase = module.get<GetHistoryUseCase>(GetHistoryUseCase);
    historyRepository = module.get<HistoryRepository>(HistoryRepository);
  });

  it('should return history when called', async () => {
    const mockHistory: History[] = [
      History.create('search1'),
      History.create('search2'),
    ];

    jest.spyOn(historyRepository, 'getHistory').mockResolvedValue(mockHistory);

    const result = await getHistoryUseCase.execute();

    expect(result).toEqual(mockHistory);
    expect(historyRepository.getHistory).toHaveBeenCalledTimes(1);
  });
});
