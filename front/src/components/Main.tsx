import { SearchResult } from '../services/api';
import { useEffect, useState } from 'react';
import Pagination from './Pagination.tsx';

interface MainProps {
  isLoading: boolean;
  hasSearched: boolean;
  data: SearchResult[];
  searchTerm: string;
}

const Main = ({ isLoading, hasSearched, data, searchTerm = '' }: MainProps) => {
  const SIZE_PAGINATION = 5;
  const [page, setPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState<SearchResult[]>([]);
  const [occurrences, setOccurrences] = useState(0);

  useEffect(() => {
    const startIndex = (page - 1) * SIZE_PAGINATION;
    const endIndex = startIndex + SIZE_PAGINATION;
    setResultsPerPage(data.slice(startIndex, endIndex));
  }, [page, data]);

  useEffect(() => {
    setPage(1);
  }, [data]);

  const totalPages = Math.ceil(data.length / SIZE_PAGINATION);

  const highlightText = (text: string, term: string) => {
    if (!term.trim()) return text;

    const words = term.trim().split(/\s+/);
    const regex = new RegExp(`(${words.join('|')})`, 'gi');

    return text.replace(
      regex,
      `<span class="bg-yellow-300 text-black px-1 rounded">$1</span>`,
    );
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
      setOccurrences(0);
      return;
    }

    const words = searchTerm.trim().split(/\s+/);
    const count = data.reduce((acc, result) => {
      return acc + words.reduce((wordCount, word) => {
        return wordCount + (result.title.match(new RegExp(word, 'gi')) || []).length;
      }, 0);
    }, 0);

    setOccurrences(count);
  }, [searchTerm, data]);

  return (
    <main className="p-6">
      <div className="bg-white rounded-lg shadow p-6">
        {isLoading && <h3 className="text-lg font-medium mb-4">Carregando...</h3>}

        {!isLoading && hasSearched && searchTerm.trim() && occurrences > 0 && (
          <h3 className="text-lg font-medium mb-4">
            Encontrado <strong>{occurrences}</strong> ocorrência(s) para "
            <span className="font-bold">{searchTerm}</span>"
          </h3>
        )}

        {!isLoading && data.length > 0 && (
          <>
            <h3 className="text-lg font-medium mb-4">Resultados da busca</h3>
            <ul className="space-y-2">
              {resultsPerPage.map((result, index) => (
                <li key={result.url || index}>
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-2 rounded-md hover:bg-gray-100"
                  >
                    <span
                      className="ml-3"
                      dangerouslySetInnerHTML={{
                        __html: highlightText(result.title, searchTerm),
                      }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}

        {!isLoading && hasSearched && data.length === 0 && (
          <h3 className="text-lg font-medium mb-4">Nenhum resultado encontrado.</h3>
        )}
      </div>

      {data.length > SIZE_PAGINATION && (
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      )}
    </main>
  );
};

export default Main;

