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
import { routes } from "@/lib/utils";

const userMockData = [
  {
    id: 1,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "علی",
    lastname: "محمدی",
    role: "admin",
    email: "ali.mohammadi@gmail.com",
    phonenumber: "09121234567",
    nationalID: "0012345678",
    approve_status: "confirmed",
  },
  {
    id: 2,
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    name: "زهرا",
    lastname: "حسینی",
    role: "user",
    email: "zahra.hosseini@gmail.com",
    phonenumber: "09123456789",
    nationalID: "0023456789",
    approve_status: "rejected",
  },
  {
    id: 3,
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "مهدی",
    lastname: "کریمی",
    role: "user",
    email: "mahdi.karimi@gmail.com",
    phonenumber: "09124567890",
    nationalID: "0034567890",
    approve_status: "pending",
  },
  {
    id: 4,
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    name: "سارا",
    lastname: "رضایی",
    role: "user",
    email: "sara.rezaei@gmail.com",
    phonenumber: "09125678901",
    nationalID: "0045678901",
    approve_status: "pending",
  },
  {
    id: 5,
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    name: "حسین",
    lastname: "جعفری",
    role: "user",
    email: "hossein.jafari@gmail.com",
    phonenumber: "09126789012",
    nationalID: "0056789012",
    approve_status: "pending",
  },
  {
    id: 6,
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "مریم",
    lastname: "کاظمی",
    role: "admin",
    email: "maryam.kazemi@gmail.com",
    phonenumber: "09127890123",
    nationalID: "0067890123",
    approve_status: "pending",
  },
  {
    id: 7,
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "رضا",
    lastname: "صادقی",
    role: "user",
    email: "reza.sadeghi@gmail.com",
    phonenumber: "09128901234",
    nationalID: "0078901234",
    approve_status: "pending",
  },
  {
    id: 8,
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "فاطمه",
    lastname: "عباسی",
    role: "user",
    email: "fatemeh.abbasi@gmail.com",
    phonenumber: "09129012345",
    nationalID: "0089012345",
    approve_status: "pending",
  },
  {
    id: 9,
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "امیر",
    lastname: "نعمتی",
    role: "user",
    email: "amir.nemati@gmail.com",
    phonenumber: "09120123456",
    nationalID: "0090123456",
    approve_status: "pending",
  },
  {
    id: 10,
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    name: "نگین",
    lastname: "قاسمی",
    role: "user",
    email: "negin.ghasemi@gmail.com",
    phonenumber: "09121234568",
    nationalID: "0101234567",
    approve_status: "pending",
  },
];

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ page: string; search: string }>;
}) {
  const { page, search } = await searchParams;

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
          {userMockData.map(item => (
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
              <TableCell>{item.phonenumber}</TableCell>
              <TableCell>{item.nationalID}</TableCell>
              <TableCell>
                <Badge
                  className={
                    item.approve_status === "confirmed"
                      ? "bg-green-500"
                      : item.approve_status === "rejected"
                      ? "bg-red-600"
                      : "bg-gray-300"
                  }
                >
                  {item.approve_status === "confirmed"
                    ? "تایید شده"
                    : item.approve_status === "rejected"
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

      <PaginationComponent
        url={routes.users}
        totalPages={10}
        currentPage={page ? parseInt(page) : 1}
      />
    </div>
  );
}
