import { BaseFilter, Item } from "https://deno.land/x/ddc_vim@v3.2.0/types.ts";
import { FilterArguments } from "https://deno.land/x/ddc_vim@v3.2.0/base/filter.ts";

type Params = Record<string, number>;

export class Filter extends BaseFilter<Params> {
  override filter(args: FilterArguments<Params>): Promise<Item<unknown>[]> {
    return Promise.resolve(args.items.sort((a, b) => {
      if (a.abbr && b.abbr) {
        return a.abbr.length - b.abbr.length;
      }
      return a.word.length - b.word.length;
    }));
  }
  override params(): Params {
    return {};
  }
}
