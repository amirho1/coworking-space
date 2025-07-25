import { routes } from "@/lib/utils";
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
};

interface NumbersProps {
  currentPage: number;
  totalPages: number;
  beforeAfterCount?: number;
}

function Numbers({ beforeAfterCount = 2, currentPage, totalPages }: NumbersProps) {
  const from = currentPage - beforeAfterCount > 0 ? currentPage - beforeAfterCount : 1;
  const to =
    currentPage + beforeAfterCount <= totalPages ? currentPage + beforeAfterCount : totalPages;

  const arr = [];

  for (let i = from; i <= to; i++) {
    arr.push(
      <PaginationItem key={i}>
        <PaginationLink isActive={i === currentPage} href={`${routes.invoices}?page=${i}`}>
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return arr;
}

export function PaginationComponent({ totalPages, currentPage }: PaginationComponentProps) {
  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <Button disabled={currentPage === 1} variant="outline">
            <PaginationPrevious
              href={`${routes.invoices}?page=${currentPage - 1}`}
            />
          </Button>
        </PaginationItem>

        <Numbers currentPage={currentPage} totalPages={totalPages} />

        <PaginationItem>
          <Button disabled={currentPage === totalPages} variant="outline">
            <PaginationNext
              href={`${routes.invoices}?page=${currentPage + 1}`}
            />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
