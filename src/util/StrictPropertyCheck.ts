/**
 * TにTExpectedに存在しないプロパティがあればnever型にするユーティリティ
 */
export type StrictPropertyCheck<T, TExpected> =
  Exclude<keyof T, keyof TExpected> extends never ? T : never;
