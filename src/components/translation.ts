// @ts-ignore: Webpack-specific require.context
declare var require: {
  (path: string): any;
  context(directory: string, useSubdirectories: boolean, regExp: RegExp): any;
};

export default class TranslationHandler {
  readonly availableLanguages: string[];
  private translations: any;

  constructor(languages?: string[]) {
    const languageFiles: Record<string, any> = {};
    const context = require.context("../../languages", false, /\.json$/);
    context.keys().forEach((key: string) => {
      const langCode = key.replace("./", "").replace(".json", "");
      languageFiles[langCode] = context(key);
    });
    const supportedLanguages = Object.keys(languageFiles);
    this.availableLanguages = languages ?? supportedLanguages;

    this.translations = {};
    for (const l of this.availableLanguages) {
      if (languageFiles[l]) {
        this.initLanguage(l, languageFiles[l]);
      }
    }
  }

  initLanguage(key: string, language: object): void {
    this.translations[key] = language;
  }

  checkRegex(value: string): boolean {
    return /^[a-z]{2}_[A-Z]{2}$/.test(value);
  }

  getLanguage(language: string): object {
    if (!this.checkRegex(language)) return this.translations["en_EN"];
    return this.translations[language];
  }

  get(language: string, path: string, data: Record<string, any> = {}): string {
    if (!language) language = "en_EN";
    const l: Record<string, any> = this.getLanguage(language);
    const p = path.split(".");
    let c = null;
    if (p.length > 0) {
      for (const i of p) {
        try {
          if (!c) {
            if (!l?.hasOwnProperty(i)) break;
            c = l[i];
          } else {
            if (!c?.hasOwnProperty(i)) break;
            c = c[i];
          }
        } catch (err) {
          console.log(err);
          break;
        }
      }
    } else {
      return path;
    }
    if (!c) return path;
    if (data) {
      if (!c || typeof c !== "string") {
        console.error(`Translation ${path} not found`);
        return `Error`;
      }
      return c?.replace(
        /{(\w+)}/g,
        (match: string, key: string) => data[key] ?? match
      );
    }
    return c;
  }
}
