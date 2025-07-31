import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { Button } from "./ui/button";

type PaginationComponentProps = {
  totalPages: number;
  currentPage: number;
  url: string;
};

interface NumbersProps {
  currentPage: number;
  totalPages: number;
  beforeAfterCount?: number;
  url: string;
}

function Numbers({ beforeAfterCount = 2, currentPage, totalPages, url }: NumbersProps) {
  const from = currentPage - beforeAfterCount > 0 ? currentPage - beforeAfterCount : 1;
  const to =
    currentPage + beforeAfterCount <= totalPages ? currentPage + beforeAfterCount : totalPages;

  const arr = [];

  for (let i = from; i <= to; i++) {
    arr.push(
      <PaginationItem key={i}>
        <PaginationLink isActive={i === currentPage} href={`${url}?page=${i}`}>
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return arr;
}

export function PaginationComponent({ url, totalPages, currentPage }: PaginationComponentProps) {
  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <Button disabled={currentPage === 1} variant="outline">
            <PaginationPrevious href={`${url}?page=${currentPage - 1}`} />
          </Button>
        </PaginationItem>

        <Numbers url={url} currentPage={currentPage} totalPages={totalPages} />

        <PaginationItem>
          <Button disabled={currentPage === totalPages} variant="outline">
            <PaginationNext href={`${url}?page=${currentPage + 1}`} />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
