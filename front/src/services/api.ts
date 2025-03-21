export type SearchResult = {
  url: string;
  title: string;
};

export type HistoryEntry = {
  query: string;
  timestamp: string;
};

const BASE_URL = 'http://localhost:3000';

export const searchQuery = async (query: string): Promise<SearchResult[]> => {
  const response = await fetch(`${BASE_URL}/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ term: query }),
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar os dados');
  }

  return response.json();
};

export const fetchHistory = async (): Promise<HistoryEntry[]> => {
  const response = await fetch(`${BASE_URL}/history`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar histórico');
  }

  return response.json();
};
