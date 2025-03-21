import { ArrowLeft, ArrowRight } from 'lucide-react';
import ButtonPage from './ButtonPage.tsx';

interface PaginationProps {
  page: number;
  setPage: (page: number | ((prev: number) => number)) => void;
  totalPages: number;
}

const Pagination = ({ page, setPage, totalPages }: PaginationProps) => {
  return (
    <div className="flex w-full justify-center gap-2 p-2">
      {page > 1 && (
        <ButtonPage onClick={() => setPage((prev) => prev - 1)}>
          <ArrowLeft />
        </ButtonPage>
      )}

      <span className="px-4 py-2 font-semibold">Page {page} of {totalPages}</span>

      {page < totalPages && (
        <ButtonPage onClick={() => setPage((prev) => prev + 1)}>
          <ArrowRight />
        </ButtonPage>
      )}
    </div>
  );
};
export default Pagination;