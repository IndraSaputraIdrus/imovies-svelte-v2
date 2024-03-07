import PusatFilm from "$lib/pusatFilm";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ setHeaders }) => {
  setHeaders({
    'Access-Control-Allow-Origin': '*', // allow CORS
    'Cache-Control': `public, s-maxage=${60 * 60 * 12}` // 12 hour
  });

  const provider = new PusatFilm()
  const data = await provider.getLastUpdate()

  return {
    result: data
  }
}
