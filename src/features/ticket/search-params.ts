import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const searchParamsCache = createSearchParamsCache({
  search: parseAsString.withDefault(""),
  sort: parseAsString.withDefault("newest"),
});

export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;

// export type SearchParams = {
//   search: string | string[] | undefined;
//   sort: string | string[] | undefined;
// };

// export type SearchParams = Record<string, string | string[] | undefined>;
// This type represents the possible shapes of search parameters in the URL.
// Examples include:
//  `?search=hello` (string)
//  `?search[]=hello&search[]=world` (array)
//  `?search` (undefined)
