import PusatFilm from "$lib/pusatFilm";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ depends, url, setHeaders }) => {
  setHeaders({
    'Access-Control-Allow-Origin': '*', // allow CORS
    'Cache-Control': `public, s-maxage=${60 * 60 * 12}` // 12 hour
  });

  depends("search:data")

  const search = url.searchParams.get("q") || null

  const provider = new PusatFilm()
  const data = await provider.search(search)

  return {
    result: data
  }
}
