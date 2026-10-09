'use client'

import Link from 'next/link'
import { useActionState, useState } from 'react'

import { Centang, Isian } from '@/components/Isian'
import { kelasTombol } from '@/components/Tombol'
import { getMessages } from '@/i18n'
import { RUTE } from '@/situs/rute'
import { FIELD_HONEYPOT, LAYANAN_LEAD, type FieldLead, type LayananLead } from '@/lead/periksa'
import { kirimLead, type StateFormLead } from './actions'

const t = getMessages().lead
const AWAL: StateFormLead = { status: 'awal', errors: {}, nilai: {}, percobaan: 0 }

type PropsTeks = {
  nama: Exclude<FieldLead, 'layanan' | 'pesan' | 'persetujuan'>
  tipe?: 'text' | 'email' | 'tel'
  autoComplete: string
  opsional?: boolean
  bantuan?: string
  state: StateFormLead
}

function IsianTeks({ nama, tipe = 'text', autoComplete, opsional, bantuan, state }: PropsTeks) {
  return (
    <Isian
      id={`f-${nama}`}
      label={t.label[nama]}
      penanda={opsional ? t.label.opsional : undefined}
      bantuan={bantuan}
      error={state.errors[nama]}
    >
      {(kontrol) => (
        <input
          {...kontrol}
          name={nama}
          type={tipe}
          autoComplete={autoComplete}
          placeholder={t.placeholder[nama]}
          defaultValue={state.nilai[nama] ?? ''}
        />
      )}
    </Isian>
  )
}

type PropsForm = {
  /** Slug Layanan dari `?layanan=` (CTA halaman Layanan), langsung terpilih di isian Layanan diminati. */
  layananAwal?: LayananLead
  /** Tautan wa.me dari Pengaturan Situs; tanpa nomor, tombol WhatsApp di panel sukses tidak tampil. */
  tautanWhatsapp?: string
  /** Staging menampilkan penanda data yang belum dikirim RISE (lihat PenandaData). */
  tampilkanPenanda?: boolean
}

export function FormLead({ layananAwal, tautanWhatsapp, tampilkanPenanda }: PropsForm) {
  const [state, aksi, mengirim] = useActionState(kirimLead, {
    ...AWAL,
    nilai: layananAwal ? { layanan: layananAwal } : {},
  })
  const [offline, setOffline] = useState(false)

  if (state.status === 'sukses') {
    return (
      <div role="status" className="panel-sukses">
        <p className="judul-sukses">{t.sukses.judul}</p>
        <p>{t.sukses.isi}</p>
        {tampilkanPenanda && <p className="penanda-data">[{t.sukses.penandaWaktu}]</p>}
        {tautanWhatsapp && <p className="teks-redup">{t.sukses.penutup}</p>}
        <div className="panel-sukses__aksi">
          {tautanWhatsapp && (
            <a href={tautanWhatsapp} className={kelasTombol('whatsapp')} rel="noopener" target="_blank">
              {t.sukses.tombolWhatsapp}
            </a>
          )}
          <Link href={RUTE.beranda} className={kelasTombol('teks')}>
            {t.sukses.kembali}
          </Link>
        </div>
      </div>
    )
  }

  const jumlahError = Object.keys(state.errors).length
  const err = state.errors

  return (
    // key memaksa form dipasang ulang dengan isian terakhir setelah setiap kiriman.
    <form
      key={state.percobaan}
      action={aksi}
      noValidate
      aria-labelledby="judul-form"
      className="form-lead"
      onSubmit={(e) => {
        // Tanpa koneksi, server action gagal tanpa pesan; isian tetap utuh dan pengunjung diberi tahu.
        const putus = !navigator.onLine
        setOffline(putus)
        if (putus) e.preventDefault()
      }}
    >
      <div className="form-lead__kepala">
        <h2 id="judul-form">{t.judulForm}</h2>
        <p className="teks-redup">{t.pengantar}</p>
      </div>

      {jumlahError > 0 && (
        <div role="alert" className="ringkasan-error">
          {t.error.ringkasan(jumlahError)}
        </div>
      )}
      {offline && (
        <div role="alert" className="ringkasan-error">
          {t.error.offline}
        </div>
      )}
      {state.pesan && (
        <div role="alert" className="ringkasan-error">
          {state.pesan}
        </div>
      )}

      <div className="grid-isian">
        <IsianTeks nama="nama" autoComplete="name" state={state} />
        <IsianTeks nama="perusahaan" autoComplete="organization" state={state} />
        <IsianTeks nama="jabatan" autoComplete="organization-title" state={state} />
        <IsianTeks nama="email" tipe="email" autoComplete="email" bantuan={t.bantuan.email} state={state} />
        <IsianTeks nama="telepon" tipe="tel" autoComplete="tel" opsional bantuan={t.bantuan.telepon} state={state} />
        <Isian id="f-layanan" label={t.label.layanan} error={err.layanan}>
          {(kontrol) => (
            <select {...kontrol} name="layanan" defaultValue={state.nilai.layanan ?? ''}>
              <option value="">{t.label.pilihLayanan}</option>
              {LAYANAN_LEAD.map((slug) => (
                <option key={slug} value={slug}>
                  {t.layanan[slug]}
                </option>
              ))}
            </select>
          )}
        </Isian>
      </div>

      <Isian id="f-pesan" label={t.label.pesan} bantuan={t.bantuan.pesan} error={err.pesan}>
        {(kontrol) => (
          <textarea {...kontrol} name="pesan" rows={5} placeholder={t.placeholder.pesan} defaultValue={state.nilai.pesan ?? ''} />
        )}
      </Isian>

      <Centang
        id="f-persetujuan"
        name="persetujuan"
        label={
          <>
            {t.persetujuan.awal}
            <Link href={RUTE.kebijakanPrivasi}>{t.persetujuan.tautan}</Link>
            {t.persetujuan.akhir}
          </>
        }
        error={err.persetujuan}
        defaultChecked={state.nilai.persetujuan === 'on'}
      />

      {/* Honeypot: tersembunyi dari pengunjung dan pembaca layar, hanya diisi bot. */}
      <div aria-hidden="true" className="honeypot">
        <label htmlFor="f-situs">{t.labelHoneypot}</label>
        <input id="f-situs" name={FIELD_HONEYPOT} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="aksi-form">
        <button type="submit" disabled={mengirim} className={kelasTombol('utama')}>
          {mengirim ? t.tombol.mengirim : t.tombol.kirim}
        </button>
        <p>
          {t.catatanPrivasi}
          <Link href={RUTE.kebijakanPrivasi}>{t.persetujuan.tautan}</Link>.
        </p>
      </div>
    </form>
  )
}
