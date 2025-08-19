import AutomateTable, { RenderItemProps } from "@/components/AutomateTable";
import { PaginationComponent } from "@/components/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, routes } from "@/lib/utils";

interface Invoice {
  id: 1;
  title: string;
  amount: number;
  status: string;
  date: string;
  details: string;
}

type columns = keyof Invoice | "payment";

const statuses = {
  paid: "پرداخت شده",
  unpaid: "پرداخت نشده",
};

const tableHeads = ["شناسه", "عنوان", "شرح صورت حساب", "مبلغ", "وضعیت", "تاریخ", "عملیات"];
const sort: columns[] = ["id", "title", "details", "amount", "status", "payment"];

export default async function page({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const { page } = await searchParams;
  const invoices: Invoice[] = [];

  function renderItem({ key, item }: RenderItemProps<Invoice, columns>) {
    switch (key) {
      case "status":
        return (
          <Badge className={cn(item.status === "paid" ? "bg-green-500" : "bg-red-500")}>
            {statuses[item.status as keyof typeof statuses]}
          </Badge>
        );
      case "payment":
        return <Button disabled={item.status === "paid"}>پرداخت</Button>;
      default:
        return item[key];
    }
  }

  return (
    <div>
      <AutomateTable data={invoices} heads={tableHeads} renderItem={renderItem} sort={sort} />

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
