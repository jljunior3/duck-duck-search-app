import { ReactNode } from 'react';

interface ButtonPageProps {
  children?: ReactNode;
  onClick: () => void;
}

const ButtonPage = ({ children, onClick }: ButtonPageProps) => {
  return (
    <button
      className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonPage;