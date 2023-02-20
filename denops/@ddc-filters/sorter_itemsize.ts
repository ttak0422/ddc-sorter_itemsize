import { BaseFilter, Item } from "https://deno.land/x/ddc_vim@v3.2.0/types.ts";
import { FilterArguments } from "https://deno.land/x/ddc_vim@v3.2.0/base/filter.ts";

type Params = {
  sameWordOnly: boolean;
};

export class Filter extends BaseFilter<Params> {
  override filter(
    { items, filterParams }: FilterArguments<Params>,
  ): Promise<Item<unknown>[]> {
    if (filterParams.sameWordOnly) {
      return Promise.resolve(items.sort((a, b) => {
        if (a.word === b.word && a.abbr && b.abbr) {
          return a.abbr.length - b.abbr.length;
        } else {
          return 0;
        }
      }));
    }

    return Promise.resolve(items.sort((a, b) => {
      if (a.abbr && b.abbr) {
        return a.abbr.length - b.abbr.length;
      }
      return a.word.length - b.word.length;
    }));
  }

  override params(): Params {
    return {
      sameWordOnly: false,
    };
  }
}
