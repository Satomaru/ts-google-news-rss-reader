import Parser from 'rss-parser';

const parser = new Parser();

function getCategoryTopicsUrl(category: string): string {
  return 'https://news.google.com' +
    '/news/rss/headlines/section/topic/' + category +
    '?hl=ja&gl=JP&ceid=JP:ja';
}

export class Topic {

  private category = '';
  private items: Parser.Item[] = [];
  private index = 0;

  get size(): number {
    return this.items.length;
  }

  get remain(): number {
    return (this.size === 0) ? 0 : this.size - this.index - 1;
  }

  get current(): Parser.Item | null {
    return (this.index >= 0 && this.index < this.size) ? this.items[this.index] : null;
  }

  isEnd(): boolean {
    return this.remain === 0;
  }

  isDownloaded(): boolean {
    return this.category !== '';
  }

  describe(): string {
    if (this.isDownloaded()) {                        
      const json = JSON.stringify(this.current, ['title', 'pubDate'], 2);
      return `${this.category} #${this.index} ${json}`;
    } else {
      return '(not downloaded)';
    }
  }

  reset(): void {
    this.category = '';
    this.items = [];
    this.index = 0;
  }

  download(category: string): Promise<Topic> {
    this.reset();

    return parser.parseURL(getCategoryTopicsUrl(category))
      .then((feed: Parser.Output) => {
        this.items = (feed.items) ? feed.items : [];
        this.category = category;
        return this;
      });
  }

  jump(index: number): boolean {
    if (index < 0 || index >= this.size) {
      return false;
    }

    this.index = index;
    return true;
  }

  move(offset: number): boolean {
    return this.jump(this.index + offset);
  }
}
