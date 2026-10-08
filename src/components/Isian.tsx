import type { ReactNode } from 'react'

export type AtributKontrol = {
  id: string
  'aria-invalid'?: true
  'aria-describedby'?: string
}

/**
 * Kerangka satu isian form: label, teks bantuan, dan pesan error yang terhubung ke kontrolnya
 * lewat aria-describedby. Kontrolnya (input, select, textarea) diberikan lewat `children`.
 */
export function Isian({
  id,
  label,
  penanda,
  bantuan,
  error,
  children,
}: {
  id: string
  label: ReactNode
  /** Teks kecil setelah label, misalnya "(opsional)". */
  penanda?: string
  bantuan?: string
  error?: string
  children: (kontrol: AtributKontrol) => ReactNode
}) {
  const idBantuan = bantuan ? `${id}-bantuan` : undefined
  const idError = error ? `${id}-error` : undefined
  const describedBy = [idBantuan, idError].filter(Boolean).join(' ') || undefined
  return (
    <div className="isian">
      <label htmlFor={id} className="isian__label">
        {label} {penanda && <span className="isian__penanda">{penanda}</span>}
      </label>
      {children({ id, 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy })}
      {bantuan && (
        <p id={idBantuan} className="isian__bantuan">
          {bantuan}
        </p>
      )}
      {error && (
        <p id={idError} className="isian__error">
          {error}
        </p>
      )}
    </div>
  )
}

/** Kotak centang dengan label di sampingnya, misalnya persetujuan data pribadi. */
export function Centang({
  id,
  name,
  label,
  error,
  defaultChecked,
}: {
  id: string
  name: string
  label: ReactNode
  error?: string
  defaultChecked?: boolean
}) {
  const idError = error ? `${id}-error` : undefined
  return (
    <div className="isian">
      <div className="centang">
        <input
          id={id}
          name={name}
          type="checkbox"
          defaultChecked={defaultChecked}
          aria-invalid={error ? true : undefined}
          aria-describedby={idError}
        />
        <label htmlFor={id}>{label}</label>
      </div>
      {error && (
        <p id={idError} className="isian__error">
          {error}
        </p>
      )}
    </div>
  )
}
