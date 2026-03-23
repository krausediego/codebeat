import en from "./locales/en/common.json";
import ptBR from "./locales/pt-BR/common.json";

export const locales = { en, "pt-BR": ptBR } as const;
export type Locale = keyof typeof locales;
export type TranslationKey = keyof typeof en.errors;

export function t(
  locale: Locale,
  key: string,
  params?: Record<string, string>
) {
  const keys = key.split(".");
  let value: any = locales[locale];
  for (const k of keys) value = value?.[k];
  if (!value) return key;
  if (params) {
    return Object.entries(params).reduce(
      (str, [k, v]) => str.replace(`{{${k}}}`, v),
      value
    );
  }
  return value as string;
}
