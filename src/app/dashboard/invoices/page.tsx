import { PaginationComponent } from "@/components/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, routes } from "@/lib/utils";

const mockData = [
  {
    id: 1,
    title: "صورتحساب 1",
    amount: 100000,
    status: "paid",
    date: "2021-01-01",
    details: "شرح صورتحساب 1",
  },
  {
    id: 2,
    title: "صورتحساب 2",
    amount: 200000,
    status: "unpaid",
    date: "2021-01-02",
    details: "شرح صورتحساب 1",
  },
  {
    id: 3,
    title: "صورتحساب 3",
    amount: 300000,
    status: "paid",
    date: "2021-01-03",
    details: "شرح صورتحساب 1",
  },
  {
    id: 4,
    title: "صورتحساب 4",
    amount: 400000,
    status: "unpaid",
    date: "2021-01-04",
    details: "شرح صورتحساب 1",
  },
  {
    id: 5,
    title: "صورتحساب 5",
    amount: 500000,
    status: "paid",
    date: "2021-01-05",
    details: "شرح صورتحساب 1",
  },
  {
    id: 6,
    title: "صورتحساب 6",
    amount: 600000,
    status: "unpaid",
    date: "2021-01-06",
    details: "شرح صورتحساب 1",
  },
  {
    id: 7,
    title: "صورتحساب 7",
    amount: 700000,
    status: "paid",
    date: "2021-01-07",
    details: "شرح صورتحساب 1",
  },
  {
    id: 8,
    title: "صورتحساب 8",
    amount: 800000,
    status: "unpaid",
    date: "2021-01-08",
    details: "شرح صورتحساب 1",
  },
  {
    id: 9,
    title: "صورتحساب 9",
    amount: 900000,
    status: "paid",
    date: "2021-01-09",
    details: "شرح صورتحساب 1",
  },
  {
    id: 10,
    title: "صورتحساب 10",
    amount: 1000000,
    status: "unpaid",
    date: "2021-01-10",
    details: "شرح صورتحساب 1",
  },
];

const statuses = {
  paid: "پرداخت شده",
  unpaid: "پرداخت نشده",
};

export default async function page({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const { page } = await searchParams;

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="[&>th]:text-right">
            <TableHead>شناسه</TableHead>
            <TableHead>عنوان</TableHead>
            <TableHead>شرح صورت حساب</TableHead>
            <TableHead>مبلغ</TableHead>
            <TableHead>وضعیت</TableHead>
            <TableHead>تاریخ</TableHead>
            <TableHead>عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.details}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>
                <Badge className={cn(item.status === "paid" ? "bg-green-500" : "bg-red-500")}>
                  {statuses[item.status as keyof typeof statuses]}
                </Badge>
              </TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>
                <Button disabled={item.status === "paid"}>پرداخت</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationComponent
        url={routes.invoices}
        totalPages={10}
        currentPage={page ? parseInt(page) : 1}
      />
    </div>
  );
}
