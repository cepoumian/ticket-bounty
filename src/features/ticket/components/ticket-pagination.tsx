"use client";

import { useQueryState, useQueryStates } from "nuqs";
import { useEffect } from "react";
import { Pagination } from "@/components/pagination";
import { PaginatedData } from "@/types/pagination";
import {
  paginationOptions,
  paginationParser,
  searchParser,
} from "../search-params";
import { TicketWithMetadata } from "../types";

type TicketPaginationProps = {
  paginatedTicketMetadata: PaginatedData<TicketWithMetadata>["metadata"];
};

const TicketPagination = ({
  paginatedTicketMetadata,
}: TicketPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions,
  );

  const [search] = useQueryState("search", searchParser);

  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: 0 }));
  }, [search, setPagination]);

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginatedMetadata={paginatedTicketMetadata}
    />
  );
};

export { TicketPagination };
