declare module 'translatte' {
  interface TranslateOptions {
    from?: string;
    to: string;
  }

  interface TranslateResult {
    text: string;
    from: string;
    to: string;
  }

  const translatte: (text: string, options: TranslateOptions) => Promise<TranslateResult>;

  export default translatte;
}
