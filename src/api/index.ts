
const urlForQuery = (query: string) =>
  `https://api.npms.io/v2/search/suggestions?q=${query}`

export interface PackageSearchResult {
  package: {
    name: string
    version: string
    description: string
    date: string
    links: {
      npm: string
    }
    author: {
      name: string
      email: string
    }
    publisher: {
      username: string
      email: string
    }
    maintainers: Array<{
      username: string
      email: string
    }>
  }
}

export const search = async (query: string): Promise<Array<PackageSearchResult>> => {
  if (query === "fail") {
    throw new Error("This should fail")
  }
  const response = await fetch(urlForQuery(query))
  return await response.json()
}
