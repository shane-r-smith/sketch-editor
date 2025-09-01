export type Dictionary<TKey extends string | number | symbol, TValue> = {
  [Key in TKey]: TValue;
};
