import { JSX } from "react/jsx-runtime";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableProps,
  TableRow,
} from "./ui/table";

export interface RenderItemProps<DataType> {
  item: DataType;
  key: keyof DataType;
  index: number;
  sort: (keyof DataType)[];
}

export type RenderItem<DataType> = (param: RenderItemProps<DataType>) => any;

interface AutoMateTableProps<DataType extends Record<string, any>> extends TableProps {
  heads: string[];
  data: DataType[];
  sort?: (keyof DataType)[];
  renderItem?: RenderItem<DataType>;
}

export default function AutomateTable<DataType extends Record<string, any>>({
  heads,
  data,
  sort,
  renderItem,
  ...props
}: AutoMateTableProps<DataType>) {
  const tableHeads = heads.map((name, index) => <TableHead key={index}> {name}</TableHead>);

  const keys = sort || (data[0] ? Object.keys(data[0]) : []);

  return (
    <Table className="mt-6" {...props}>
      <TableHeader>
        <TableRow className="[&>th]:text-right">{tableHeads}</TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item, index) => {
          return (
            <TableRow key={index}>
              {keys?.map((key, index, sort) => {
                const params = { item, key, index, sort };

                return renderItem ? (
                  <TableCell key={index}>{renderItem(params)}</TableCell>
                ) : (
                  item[key]
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
