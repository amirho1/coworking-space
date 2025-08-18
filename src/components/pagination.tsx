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
  currentPage: number;
  url: string;
  pageSize: number;
  count: number;
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

export function PaginationComponent({
  url,
  currentPage,
  count,
  pageSize,
}: PaginationComponentProps) {
  const totalPages = count && count < 10 ? 1 : Math.ceil(count / pageSize);

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <Button disabled={currentPage === 1 || !count} variant="outline">
            <PaginationPrevious href={`${url}?page=${currentPage - 1}`} />
          </Button>
        </PaginationItem>

        <Numbers url={url} currentPage={currentPage} totalPages={totalPages} />

        <PaginationItem>
          <Button disabled={currentPage === totalPages || !count} variant="outline">
            <PaginationNext href={`${url}?page=${currentPage + 1}`} />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
