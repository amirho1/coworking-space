import axiosInstance from "@/api";
import { PaginationComponent } from "@/components/pagination";

import Search from "@/components/users/Search";
import UserTable from "@/components/UserTable";
import apiRoutes from "@/lib/apiRoutes";
import { routes } from "@/lib/utils";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  displayName: string;
  avatar: string;
  email: string;
  nationalCode: string;
  phoneNumber: string;
  isActive: boolean;
  lastLoggedIn: string;
  lockoutEnabled: boolean;
  lockoutEnd: string;
  roles: [
    {
      id: number;
      name: string;
      description: string;
    }
  ];
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
          search,
        },
      })
    ).data.data;
  } catch (error: any) {
    console.error(error?.response?.data);
  }

  return (
    <div>
      <Search defaultValue={search} />
      <UserTable users={data?.users} />

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
