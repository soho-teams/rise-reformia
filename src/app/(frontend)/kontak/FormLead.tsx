'use client'

import { useActionState } from 'react'

import { getMessages } from '@/i18n'
import { FIELD_HONEYPOT, LAYANAN_LEAD, type FieldLead } from '@/lead/periksa'
import { kirimLead, type StateFormLead } from './actions'

const t = getMessages().lead
const AWAL: StateFormLead = { status: 'awal', errors: {}, nilai: {}, percobaan: 0 }

type PropsIsian = {
  nama: Exclude<FieldLead, 'layanan' | 'pesan' | 'persetujuan'>
  tipe?: 'text' | 'email' | 'tel'
  autoComplete: string
  opsional?: boolean
  bantuan?: string
  state: StateFormLead
}

function Isian({ nama, tipe = 'text', autoComplete, opsional, bantuan, state }: PropsIsian) {
  const error = state.errors[nama]
  const idBantuan = bantuan ? `b-${nama}` : undefined
  const idError = error ? `e-${nama}` : undefined
  return (
    <div className="isian">
      <label htmlFor={`f-${nama}`}>
        {t.label[nama]} {opsional && <span className="opsional">{t.label.opsional}</span>}
      </label>
      <input
        id={`f-${nama}`}
        name={nama}
        type={tipe}
        autoComplete={autoComplete}
        placeholder={t.placeholder[nama]}
        defaultValue={state.nilai[nama] ?? ''}
        aria-invalid={error ? true : undefined}
        aria-describedby={[idBantuan, idError].filter(Boolean).join(' ') || undefined}
      />
      {bantuan && <p id={idBantuan} className="bantuan">{bantuan}</p>}
      {error && <p id={idError} className="error">{error}</p>}
    </div>
  )
}

export function FormLead() {
  const [state, aksi, mengirim] = useActionState(kirimLead, AWAL)

  if (state.status === 'sukses') {
    return (
      <div role="status" className="panel-sukses">
        <p className="judul-sukses">{t.sukses.judul}</p>
        <p>{t.sukses.isi}</p>
      </div>
    )
  }

  const jumlahError = Object.keys(state.errors).length
  const err = state.errors

  return (
    // key memaksa form dipasang ulang dengan isian terakhir setelah setiap kiriman.
    <form key={state.percobaan} action={aksi} noValidate className="form-lead">
      <p>{t.pengantar}</p>

      {jumlahError > 0 && (
        <div role="alert" className="ringkasan-error">
          {t.error.ringkasan(jumlahError)}
        </div>
      )}
      {state.pesan && (
        <div role="alert" className="ringkasan-error">
          {state.pesan}
        </div>
      )}

      <div className="grid-isian">
        <Isian nama="nama" autoComplete="name" state={state} />
        <Isian nama="perusahaan" autoComplete="organization" state={state} />
        <Isian nama="jabatan" autoComplete="organization-title" state={state} />
        <Isian nama="email" tipe="email" autoComplete="email" bantuan={t.bantuan.email} state={state} />
        <Isian nama="telepon" tipe="tel" autoComplete="tel" opsional bantuan={t.bantuan.telepon} state={state} />
        <div className="isian">
          <label htmlFor="f-layanan">{t.label.layanan}</label>
          <select
            id="f-layanan"
            name="layanan"
            defaultValue={state.nilai.layanan ?? ''}
            aria-invalid={err.layanan ? true : undefined}
            aria-describedby={err.layanan ? 'e-layanan' : undefined}
          >
            <option value="">{t.label.pilihLayanan}</option>
            {LAYANAN_LEAD.map((slug) => (
              <option key={slug} value={slug}>
                {t.layanan[slug]}
              </option>
            ))}
          </select>
          {err.layanan && <p id="e-layanan" className="error">{err.layanan}</p>}
        </div>
      </div>

      <div className="isian">
        <label htmlFor="f-pesan">{t.label.pesan}</label>
        <textarea
          id="f-pesan"
          name="pesan"
          rows={5}
          placeholder={t.placeholder.pesan}
          defaultValue={state.nilai.pesan ?? ''}
          aria-invalid={err.pesan ? true : undefined}
          aria-describedby={['b-pesan', err.pesan ? 'e-pesan' : ''].filter(Boolean).join(' ')}
        />
        <p id="b-pesan" className="bantuan">{t.bantuan.pesan}</p>
        {err.pesan && <p id="e-pesan" className="error">{err.pesan}</p>}
      </div>

      <div className="isian">
        <div className="persetujuan">
          <input
            id="f-persetujuan"
            name="persetujuan"
            type="checkbox"
            defaultChecked={state.nilai.persetujuan === 'on'}
            aria-invalid={err.persetujuan ? true : undefined}
            aria-describedby={err.persetujuan ? 'e-persetujuan' : undefined}
          />
          <label htmlFor="f-persetujuan">{t.persetujuan}</label>
        </div>
        {err.persetujuan && <p id="e-persetujuan" className="error">{err.persetujuan}</p>}
      </div>

      {/* Honeypot: tersembunyi dari pengunjung dan pembaca layar, hanya diisi bot. */}
      <div aria-hidden="true" className="honeypot">
        <label htmlFor="f-situs">{t.labelHoneypot}</label>
        <input id="f-situs" name={FIELD_HONEYPOT} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="aksi-form">
        <button type="submit" disabled={mengirim}>
          {mengirim ? t.tombol.mengirim : t.tombol.kirim}
        </button>
        <p className="bantuan">{t.catatanPrivasi}</p>
      </div>
    </form>
  )
}
