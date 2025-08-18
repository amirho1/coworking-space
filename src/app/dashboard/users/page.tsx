import axiosInstance from "@/api";
import { PaginationComponent } from "@/components/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Actions from "@/components/users/Actions";
import Search from "@/components/users/Search";
import apiRoutes from "@/lib/apiRoutes";
import { routes } from "@/lib/utils";

interface User {
  name: string;
  id: number;
  avatar: string;
  lastname: string;
  email: string;
  role: string;
  phoneNumber: string;
  nationalID: string;
  status: string;
}

interface Role {
  id: number;
  name: string;
  description: string;
}

interface Data {
  users: User[];
  roles: Role[];
  count: number;
  isSuccess: boolean;
  message: string;
}

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ page: string; search: string }>;
}) {
  const pageSize = 10;
  const { page, search } = await searchParams;
  let data: Data | undefined = undefined;
  try {
    data = (
      await axiosInstance.get(apiRoutes.users, {
        params: {
          pageNumber: page,
          pageSize,
        },
      })
    ).data;
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <Search defaultValue={search} />
      <Table className="mt-6">
        <TableHeader>
          <TableRow className="[&>th]:text-right">
            <TableHead>شناسه</TableHead>
            <TableHead>اسم</TableHead>
            <TableHead>نام خانوادگی</TableHead>
            <TableHead>ایمیل</TableHead>
            <TableHead>دسترسی</TableHead>
            <TableHead>شماره تماس</TableHead>
            <TableHead>کد ملی</TableHead>
            <TableHead>وضعیت</TableHead>
            <TableHead>اقدامات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.users?.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2 ">
                  <Avatar>
                    <AvatarImage src={item.avatar} alt={`${item.name} ${item.lastname}`} />
                    <AvatarFallback>
                      {item.name.charAt(0)}
                      {item.lastname.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {item.name}
                </div>
              </TableCell>
              <TableCell>{item.lastname}</TableCell>
              <TableCell>{item.email}</TableCell>

              <TableCell>{item.role}</TableCell>
              <TableCell>{item.phoneNumber}</TableCell>
              <TableCell>{item.nationalID}</TableCell>
              <TableCell>
                <Badge
                  className={
                    item.status === "confirmed"
                      ? "bg-green-500"
                      : item.status === "rejected"
                      ? "bg-red-600"
                      : "bg-gray-300"
                  }
                >
                  {item.status === "confirmed"
                    ? "تایید شده"
                    : item.status === "rejected"
                    ? "رد شده"
                    : "در انتظار تایید"}
                </Badge>
              </TableCell>
              <TableCell>
                <Actions id={item.id} name={item.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data?.count && (
        <PaginationComponent
          url={routes.users}
          count={data.count}
          pageSize={pageSize}
          currentPage={page ? parseInt(page) : 1}
        />
      )}
    </div>
  );
}
