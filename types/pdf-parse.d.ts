declare module "pdf-parse" {
  interface PDFData {
    numpages: number;
    numrender: number;
    info: Record<string, unknown>;
    metadata: Record<string, unknown>;
    text: string;
    version: string;
  }

  interface PDFParseOptions {
    max?: number;
    min?: number;
    version?: string;
    ignoreencryption?: boolean;
    forceggs?: boolean;
    isEvalFn?: boolean;
    useWorker?: boolean;
    suppressLogs?: boolean;
    useSystemFonts?: boolean;
    fontTimeout?: number;
  }

  function pdfParse(
    buffer: Buffer,
    options?: PDFParseOptions
  ): Promise<PDFData>;

  export default pdfParse;
}

