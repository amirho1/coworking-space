import { PaginationComponent } from "@/components/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { routes } from "@/lib/utils";

const userMockData = [
  {
    type: "daily",
    id: 1,
    price: 100000,
    date: "2021-01-01",
  },
  {
    type: "daily",
    id: 2,
    price: 100000,
    date: "2021-01-01",
  },
  {
    type: "daily",
    id: 3,
    price: 100000,
    date: "2021-01-01",
  },
  {
    type: "daily",
    id: 4,
    price: 100000,
    date: "2021-01-01",
  },
  {
    type: "daily",
    id: 5,
    price: 100000,
    date: "2021-01-01",
  },
  {
    type: "daily",
    id: 6,
    price: 100000,
    date: "2021-01-01",
  },
  {
    type: "daily",
    id: 7,
    price: 100000,
    date: "2021-01-01",
  },
  {
    type: "daily",
    id: 8,
    price: 100000,
    date: "2021-01-01",
  },
];

export default async function page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: Promise<{ page: string }>;
}) {
  const { id } = await params;
  const { page } = await searchParams;

  return (
    <div>
      <Table className="mt-6">
        <TableHeader>
          <TableRow className="[&>th]:text-right">
            <TableHead>شناسه</TableHead>
            <TableHead>نوع</TableHead>
            <TableHead>قیمت</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userMockData.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>

              <TableCell>{item.type === "daily" ? "روزانه" : "ماهانه"}</TableCell>
              <TableCell>{item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationComponent
        url={routes.userServices(+id)}
        totalPages={10}
        currentPage={page ? parseInt(page) : 1}
      />
    </div>
  );
}
