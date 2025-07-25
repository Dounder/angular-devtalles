import { Gif, GiphyItem } from '../interfaces';

export class GifMapper {
  static fromGiphyResponse(gif: GiphyItem): Gif {
    return {
      id: gif.id,
      title: gif.title,
      url: gif.images.original.url,
    };
  }

  static fromGiphyResponseArray(items: GiphyItem[]): Gif[] {
    return items.map(GifMapper.fromGiphyResponse);
  }
}
