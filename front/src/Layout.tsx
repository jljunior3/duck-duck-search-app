import { useCallback, useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import { fetchHistory, HistoryEntry, searchQuery, SearchResult } from './services/api';
import Header from './components/Header.tsx';
import Main from './components/Main.tsx';

const Layout = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [data, setData] = useState<SearchResult[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLoadingHistory, setLoadingHistory] = useState<boolean>(false);

  const loadHistory = useCallback(async () => {
    setLoadingHistory(true);
    try {
      const historyData = await fetchHistory();
      setHistory(historyData);
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
    } finally {
      setLoadingHistory(false);
    }
  }, []);

  const handleEnterPress = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    if (!inputValue) setInputValue(query);

    try {
      const results = await searchQuery(query);
      setData(results);
      await loadHistory();
    } catch (error) {
      console.error('Erro na busca:', error);
    } finally {
      setLoading(false);
    }
  }, [loadHistory]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isLoadingHistory={isLoadingHistory} history={history} handleEnterPress={handleEnterPress} />

      <div className="flex-1 overflow-auto">
        <Header inputValue={inputValue} setInputValue={setInputValue} handleEnterPress={handleEnterPress} />
        <Main isLoading={isLoading} hasSearched={hasSearched} data={data} searchTerm={inputValue} />
      </div>
    </div>
  );
};

export default Layout;
