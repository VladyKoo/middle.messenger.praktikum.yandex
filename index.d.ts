declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.hbs' {
  function content(context: any, options?: any): string;
  export default content;
}
