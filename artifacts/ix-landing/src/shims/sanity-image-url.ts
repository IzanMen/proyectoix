import type { SanityClient } from "./sanity-client";

interface ImageSource {
  asset?: { _ref?: string; url?: string };
  url?: string;
  _ref?: string;
}

class ImageUrlBuilder {
  private _source: ImageSource;
  private _projectId: string;
  private _dataset: string;
  private _width?: number;
  private _height?: number;
  private _fit?: string;
  private _auto?: string;

  constructor(source: ImageSource, projectId: string, dataset: string) {
    this._source = source;
    this._projectId = projectId;
    this._dataset = dataset;
  }

  width(w: number): this {
    this._width = w;
    return this;
  }

  height(h: number): this {
    this._height = h;
    return this;
  }

  fit(f: string): this {
    this._fit = f;
    return this;
  }

  auto(a: string): this {
    this._auto = a;
    return this;
  }

  url(): string {
    if (this._source?.url) return this._source.url;

    const ref = this._source?.asset?._ref ?? this._source?.asset?.url ?? "";
    if (!ref || !this._projectId || !this._dataset) return "";

    const match = ref.match(/^image-([a-zA-Z0-9]+)-(\d+x\d+)-(\w+)$/);
    if (!match) return "";

    const [, id, , ext] = match;
    let url = `https://cdn.sanity.io/images/${this._projectId}/${this._dataset}/${id}.${ext}`;
    const params: string[] = [];
    if (this._width) params.push(`w=${this._width}`);
    if (this._height) params.push(`h=${this._height}`);
    if (this._fit) params.push(`fit=${this._fit}`);
    if (this._auto) params.push(`auto=${this._auto}`);
    if (params.length) url += `?${params.join("&")}`;
    return url;
  }
}

interface Builder {
  image(source: ImageSource): ImageUrlBuilder;
}

export default function createImageUrlBuilder(client: SanityClient): Builder {
  const config = client.config();
  const projectId = config.projectId ?? "";
  const dataset = config.dataset ?? "";

  return {
    image: (source: ImageSource) =>
      new ImageUrlBuilder(source, projectId, dataset),
  };
}
