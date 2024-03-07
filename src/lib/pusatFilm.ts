import { parseHTML } from "linkedom"
import { getHtml, getType, parseSlug, titleFromSlug } from "./parse"
import type { Movie, Series } from "./types"

export default class PusatFilm {
  url: string

  constructor() {
    this.url = "https://pf21.vip"
  }

  async getLastUpdate() {
    const html = await getHtml(this.url)
    const { document } = parseHTML(html)
    const wrapper = document.querySelectorAll<HTMLDivElement>("div.col-md-12 > div")
    const wrapperFilter = [wrapper[0], wrapper[2]]

    const result: Movie[] = []

    for (const grid of wrapperFilter) {
      const cards = grid.querySelectorAll<HTMLAnchorElement>(".col-md-125 > .gmr-item-modulepost > a")
      for (const card of cards) {
        const image = card.querySelector<HTMLImageElement>("img")?.src ?? ""
        const title = card.title.replace("Nonton Film", "").replace("Sub Indo", "").trim()
        const slug = card.href
        const type = getType(slug)
        result.push({ image, title, slug: parseSlug(slug), type })
      }
    }
    return result
  }

  async search(query: string | null) {
    if (!query) return []

    const html = await getHtml(`${this.url}?s=${query}&post_type%5B%5D=post&post_type%5B%5D=tv`)
    const { document } = parseHTML(html)
    const listCard = document.querySelectorAll(".row.grid-container > article > div")

    const result: Movie[] = []
    for (const card of listCard) {
      const title = card.querySelector<HTMLAnchorElement>(".entry-title > a")?.textContent ?? ""
      const a = card.querySelector<HTMLAnchorElement>(".content-thumbnail > a")
      const image = a?.querySelector<HTMLImageElement>("img")?.src ?? ""
      const slug = a?.href ?? ""
      const type = getType(slug)
      result.push({ title, image, slug: parseSlug(slug), type })
    }
    return result
  }

  async getSeries(slug: string): Promise<Series> {
    const html = await getHtml(`${this.url}/${slug}`);
    const { document } = parseHTML(html)

    const wrapper = document.querySelectorAll<HTMLDivElement>('div.custom-epslist.gmr-listseries');
    const titleMovie = titleFromSlug(slug)

    const epsLink = [];

    for (const item of wrapper) {
      const title = item.querySelector<HTMLHeadingElement>('h3');
      const links = item.querySelectorAll<HTMLAnchorElement>('a.button.s-eps');

      for (const link of links) {
        epsLink.push({
          episode: Number(link.textContent),
          season: Number(title?.textContent?.replace("Season", "").trim()),
          link: parseSlug(link.href)
        });
      }
    }

    return { title: titleMovie, episodeList: epsLink };
  }

  async getDetails(slug: string) {
    const html = await getHtml(`${this.url}/${slug}`);
    const { document } = parseHTML(html)
    const iframeSrc = document.querySelector<HTMLIFrameElement>(
      'div.gmr-embed-responsive > iframe'
    )?.src;

    if (!iframeSrc) return null;

    return this.getLinksIframe(iframeSrc);
  }

  async getLinksIframe(url: string) {
    const html = await getHtml(url);
    const { document } = parseHTML(html)

    const links = document.querySelectorAll<HTMLAnchorElement>('ul#dropdown-server > li > a');
    const streamLink = [];

    for (const link of links) {
      const linkSource = link.dataset.frame;
      const text = link.textContent;
      let linkDecode = atob(linkSource!);

      if (linkDecode.includes('uplayer')) {
        const key = btoa('https://pf21.vip/');
        linkDecode = `${linkDecode}&r=${key}`;
      }

      const stream = `/stream?url=${btoa(linkDecode)}`;

      streamLink.push({ text, link: linkDecode, stream });
    }

    return streamLink;
  }
}
