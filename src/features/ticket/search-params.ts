export type SearchParams = {
  search: string | string[] | undefined;
  sort: string | string[] | undefined;
};

// * `?search=hello` (string)
// * `?search[]=hello&search[]=world` (array)
// * `?search` (undefined)
