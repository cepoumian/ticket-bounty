import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const searchParser = parseAsString.withDefault("").withOptions({
  shallow: false,
  clearOnDefault: true,
});

export const sortParser = parseAsString.withDefault("newest").withOptions({
  shallow: false,
  clearOnDefault: true,
});

export const searchParamsCache = createSearchParamsCache({
  search: searchParser,
  sort: sortParser,
});

export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;

// * Previous to using Nuqs we had this --- IGNORE ---
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
