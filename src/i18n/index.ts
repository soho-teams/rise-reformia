import { id } from './id'

/**
 * Semua string UI publik lewat modul ini. Fase 1 hanya `id` tanpa prefix URL;
 * locale `en` cukup ditambah sebagai kamus baru dengan bentuk yang sama.
 */
export type Messages = typeof id

export const defaultLocale = 'id' as const
export type Locale = typeof defaultLocale

const dictionaries: Record<Locale, Messages> = { id }

export const getMessages = (locale: Locale = defaultLocale): Messages => dictionaries[locale]
