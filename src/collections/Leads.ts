import { APIError, type CollectionConfig, type Where } from 'payload'

import { minimal, punyaPeran } from '@/access/peran'
import { KOLOM_PENCARIAN_LEAD, PILIHAN_STATUS_NOTIFIKASI, PILIHAN_STATUS_TINDAK_LANJUT } from '@/lead/daftarAdmin'
import { eksporLeadCsv } from '@/lead/ekspor'
import { BATAS_LEAD, PILIHAN_LAYANAN } from '@/lead/periksa'

/** Permintaan konsultasi dari website. Berisi data pribadi (UU PDP): hanya Admin yang mengakses. */
export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Lead', plural: 'Lead' },
  admin: {
    useAsTitle: 'nama',
    defaultColumns: ['createdAt', 'nama', 'perusahaan', 'layanan', 'statusTindakLanjut', 'statusNotifikasi'],
    listSearchableFields: [...KOLOM_PENCARIAN_LEAD],
    components: { beforeListTable: ['@/components/admin/TombolEksporLead#TombolEksporLead'] },
    hidden: ({ user }) => !punyaPeran(user, 'admin'),
  },
  access: {
    read: minimal('admin'),
    update: minimal('admin'),
    delete: minimal('admin'),
    // Lead hanya dibuat lewat submitLead (server), tidak lewat REST atau GraphQL.
    create: () => false,
  },
  defaultSort: '-createdAt',
  endpoints: [
    {
      // GET /api/leads/ekspor-csv?where[...]: saringan sama dengan query daftar Lead di admin.
      path: '/ekspor-csv',
      method: 'get',
      handler: async (req) => {
        let csv: string
        try {
          // Pemeriksaan Admin ada di eksporLeadCsv; error Payload diteruskan sebagai status HTTP-nya
          // (403 untuk bukan Admin, 400 untuk saringan yang salah bentuk).
          csv = await eksporLeadCsv(req.payload, {
            user: req.user,
            where: req.query?.where as Where | undefined,
            cari: typeof req.query?.search === 'string' ? req.query.search : undefined,
          })
        } catch (err) {
          if (err instanceof APIError) return Response.json({ message: err.message }, { status: err.status })
          throw err
        }
        const tanggal = new Date().toISOString().slice(0, 10)
        return new Response(csv, {
          headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': `attachment; filename="lead-rise-${tanggal}.csv"`,
            'Cache-Control': 'no-store',
          },
        })
      },
    },
  ],
  fields: [
    { name: 'nama', type: 'text', required: true, maxLength: BATAS_LEAD.nama },
    { name: 'perusahaan', type: 'text', required: true },
    { name: 'jabatan', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'telepon', type: 'text' },
    { name: 'layanan', label: 'Layanan diminati', type: 'select', required: true, options: PILIHAN_LAYANAN },
    { name: 'pesan', type: 'textarea', required: true, maxLength: BATAS_LEAD.pesanMaks },
    {
      type: 'row',
      fields: [
        // Bukti persetujuan (UU PDP): ditulis sekali oleh submitLead, tidak bisa diubah siapa pun.
        {
          name: 'persetujuanPdp',
          label: 'Persetujuan data pribadi',
          type: 'checkbox',
          required: true,
          access: { update: () => false },
        },
        {
          name: 'waktuPersetujuan',
          type: 'date',
          required: true,
          access: { update: () => false },
          admin: { date: { pickerAppearance: 'dayAndTime' } },
        },
      ],
    },
    {
      name: 'statusTindakLanjut',
      label: 'Status tindak lanjut',
      type: 'select',
      required: true,
      defaultValue: 'baru',
      index: true,
      options: [...PILIHAN_STATUS_TINDAK_LANJUT],
      admin: { position: 'sidebar' },
    },
    {
      name: 'statusNotifikasi',
      type: 'select',
      required: true,
      defaultValue: 'gagal',
      options: [...PILIHAN_STATUS_NOTIFIKASI],
      admin: { position: 'sidebar' },
    },
  ],
}
