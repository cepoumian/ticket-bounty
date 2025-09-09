import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type PageAndSize = {
  page: number;
  size: number;
};

type PaginationProps = {
  pagination: PageAndSize;
  onPagination: (pagination: PageAndSize) => void;
  paginatedMetadata: {
    count: number;
    hasNextPage: boolean;
  };
};

const Pagination = ({
  pagination,
  onPagination,
  paginatedMetadata,
}: PaginationProps) => {
  const { count, hasNextPage } = paginatedMetadata;

  const startOffset = pagination.page * pagination.size + 1;
  const endOffset = startOffset - 1 + pagination.size;
  const actualEndOffset = Math.min(endOffset, count);

  const label = `${startOffset} - ${actualEndOffset} of ${count}`;

  const handlePreviousPage = () => {
    onPagination({ ...pagination, page: pagination.page - 1 });
  };

  const handleNextPage = () => {
    onPagination({ ...pagination, page: pagination.page + 1 });
  };

  const previousButton = (
    <Button
      variant="outline"
      size="sm"
      disabled={pagination.page < 1}
      onClick={handlePreviousPage}
    >
      Previous
    </Button>
  );

  const nextButton = (
    <Button
      variant="outline"
      size="sm"
      disabled={!hasNextPage}
      onClick={handleNextPage}
    >
      Next
    </Button>
  );

  const handleChangeSize = (value: string) => {
    onPagination({ ...pagination, page: 0, size: Number(value) });
  };

  const sizeButton = (
    <Select
      defaultValue={String(pagination.size)}
      onValueChange={handleChangeSize}
    >
      <SelectTrigger className="h-[36px]">
        <SelectValue placeholder={String(pagination.size)} />
      </SelectTrigger>
      <SelectContent>
        {[5, 10, 25, 50, 100].map((sizeOption) => (
          <SelectItem
            key={sizeOption}
            value={String(sizeOption)}
            onClick={() => {
              onPagination({ page: 0, size: sizeOption });
            }}
          >
            {sizeOption}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <div className="flex w-full justify-between">
      <p className="text-muted-foreground text-sm">{label}</p>
      <div className="flex gap-x-2">
        {sizeButton}
        {previousButton}
        {nextButton}
      </div>
    </div>
  );
};

export { Pagination };
