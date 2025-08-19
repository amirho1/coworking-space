import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableProps,
  TableRow,
} from "./ui/table";

export interface RenderItemProps<DataType, SortKeys = keyof DataType> {
  item: DataType;
  key: SortKeys;
  index: number;
  sort: SortKeys[];
}

export type RenderItem<DataType> = (param: RenderItemProps<DataType>) => any;

interface AutomateTableProps<DataType extends Record<string, any>, SortKeys = keyof DataType>
  extends TableProps {
  heads: string[];
  data: DataType[];
  sort: SortKeys[];
  renderItem?: RenderItem<DataType>;
}

export default function AutomateTable<
  DataType extends Record<string, any>,
  SortKeys = keyof DataType
>({ heads, data, sort, renderItem, ...props }: AutomateTableProps<DataType, SortKeys>) {
  const tableHeads = heads.map((name, index) => <TableHead key={index}> {name}</TableHead>);

  const keys = sort;

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

                return (
                  <TableCell key={index}>
                    {renderItem ? renderItem(params) : item[key as keyof DataType]}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
