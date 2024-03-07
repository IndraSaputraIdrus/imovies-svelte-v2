import type { MovieType } from "./types"

export async function getHtml(url: string) {
  const res = await fetch(url, {
    cache: "force-cache",
    headers: {
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
    }
  })
  return res.text()
}

export function getType(slug: string): MovieType {
  const regex = /\b(season|tvseries|movie|tv)/i
  const match = slug.match(regex)
  if (!match) return "movie"
  return match[0].toLowerCase() as MovieType
}

export function parseSlug(slug: string) {
  const result = slug.match(/\/([^/]+)(?=\/$|$)/);
  if (!result) return ""

  return result[0].slice(1)
}

export function titleFromSlug(slug: string) {
  return slug
    .split('-') // Memisahkan string berdasarkan tanda hubung ("-")
    .map((word) => capitalize(word)) // Mengonversi setiap kata menjadi huruf kapital
    .join(' '); // Menggabungkan kembali kata-kata dengan spasi di antara
}

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1); // Mengonversi huruf pertama ke huruf kapital
}
