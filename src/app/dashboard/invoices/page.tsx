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

interface Invoice {
  id: 1;
  title: string;
  amount: number;
  status: string;
  date: string;
  details: string;
}

const statuses = {
  paid: "پرداخت شده",
  unpaid: "پرداخت نشده",
};

export default async function page({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const { page } = await searchParams;
  const invoices: Invoice[] = [];
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
          {invoices.map(item => (
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

      {!!invoices.length || <div className="m-auto mt-4 w-fit">هیچ صورت حسابی ندارید.</div>}

      <PaginationComponent
        url={routes.invoices}
        count={0}
        pageSize={10}
        currentPage={page ? parseInt(page) : 1}
      />
    </div>
  );
}
