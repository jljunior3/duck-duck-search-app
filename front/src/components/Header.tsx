import { SearchIcon } from 'lucide-react';

interface HeaderProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleEnterPress: (value: string) => void;
}

const Header = ({ inputValue, setInputValue, handleEnterPress }: HeaderProps) => {
  return (
    <header className="bg-white shadow p-6">
      <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-slate-700">
        <SearchIcon className="text-gray-400" />
        <input
          type="text"
          className="w-full outline-none border-none pl-1 focus:ring-0"
          placeholder="Pesquisar..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleEnterPress(inputValue)}
        />
      </div>
    </header>
  );
};
export default Header;