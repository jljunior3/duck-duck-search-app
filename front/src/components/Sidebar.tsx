import { HistoryEntry } from '../services/api';

interface SidebarProps {
  isLoadingHistory: boolean;
  history: HistoryEntry[];
  handleEnterPress: (query: string) => void;
}

const Sidebar = ({ isLoadingHistory, history, handleEnterPress }: SidebarProps) => {
  return (
    <div className="w-64 bg-gray-600 text-white transition-all duration-300 ease-in-out">
      <nav className="mt-6">
        <div className="px-4 py-2">
          <h1 className="space-y-2 p-2 font-bold text-xl">Histórico</h1>
          <ul className="space-y-2">
            {isLoadingHistory && (
              <li>
                <span className="flex items-center p-2 rounded-md">Carregando histórico...</span>
              </li>
            )}
            {!isLoadingHistory && history.length === 0 && (
              <li>
                <span className="flex items-center p-2 rounded-md">Nenhum histórico ainda</span>
              </li>
            )}
            {!isLoadingHistory &&
              history.length > 0 &&
              history.map((item, index) => (
                <li className="p-2 hover:bg-gray-700 cursor-pointer" key={index}
                    onClick={() => handleEnterPress(item.query)}>
                  <span className="ml-3">{item.query}</span>
                </li>
              ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
