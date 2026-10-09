import { umum } from './umum'

/**
 * Hanya teks umum, untuk komponen client ('use client') dan modul yang mereka impor. Modul ini
 * sengaja tidak mengimpor kamus lengkap (./id), supaya copy semua halaman tidak ikut ke browser.
 * Impor dari '@/i18n/klien', bukan dari '@/i18n'.
 */
export type MessagesUmum = typeof umum

export const getMessagesUmum = (): MessagesUmum => umum
