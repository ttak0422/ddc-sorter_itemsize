import { BaseFilter, FilterArguments, Item } from "../deps.ts";

type Params = {
  sameWordOnly: boolean;
};

/** minimal. */
type LeanUserData = {
  lspitem: string;
  // ...
};

function isLeanUserData(val: unknown): val is LeanUserData {
  return (
    typeof val === "object" &&
    val !== null &&
    typeof (val as LeanUserData).lspitem === "string"
  );
}

export class Filter extends BaseFilter<Params> {
  override filter(
    { items, filterParams }: FilterArguments<Params>,
  ): Promise<Item<unknown>[]> {
    if (filterParams.sameWordOnly) {
      Promise.resolve(items.sort((a, b) => {
        if (a.word === b.word) {
          return this.compareDetail(a, b);
        } else {
          return 0;
        }
      }));
    }
    return Promise.resolve(items.sort(this.compareDetail));
  }

  private compareDetail(a: Item, b: Item): number {
    if (isLeanUserData(a.user_data) && isLeanUserData(b.user_data)) {
      const itemA = JSON.parse(a.user_data.lspitem);
      const itemB = JSON.parse(b.user_data.lspitem);
      const detailLengthA = itemA["detail"]?.length;
      const detailLengthB = itemB["detail"]?.length;
      if (detailLengthA != undefined && detailLengthB != undefined) {
        return detailLengthA - detailLengthB;
      } else {
        return 0;
      }
    }
    return 0;
  }

  override params(): Params {
    return {
      sameWordOnly: false,
    };
  }
}
