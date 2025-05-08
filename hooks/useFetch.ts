import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useFetch = (url: string) => {
  return useSWR(url, fetcher);
};

export const usePokemon = (id: string) => {
  return useFetch(`https://api-rs.pokemonle.incubator4.com/v1/pokemons/${id}`);
};

export const usePokemonList = (page: number, per_page: number) => {
  return useFetch(
    `https://api-rs.pokemonle.incubator4.com/v1/pokemons?page=${page}&per_page=${per_page}`
  );
};

export const useResourceList = <T extends Resource>(
  resource: string,
  page: number = 1,
  per_page: number = 24
) => {
  return useSWR<PaginationResource<T>>(
    [`https://api-rs.pokemonle.incubator4.com/v1`, resource, page, per_page],
    ([url, resource, page, per_page]) =>
      fetcher(`${url}/${resource}?page=${page}&per_page=${per_page}`)
  );
};
