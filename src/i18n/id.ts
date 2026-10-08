const site = {
  name: 'RISE',
  legalName: 'Reformia Inspirasi Semesta',
  description:
    'RISE (Reformia Inspirasi Semesta) adalah mitra konsultan manajemen, psikologi industri & organisasi, konsultasi bisnis, serta training & pengembangan.',
}

export const id = {
  site,
  home: {
    placeholderTitle: `${site.name} — ${site.legalName}`,
    placeholderBody: 'Website kami sedang disiapkan. Nantikan segera.',
  },
  // Copy dari docs/copy/kontak.md (SOH-142).
  lead: {
    meta: {
      title: 'Jadwalkan Konsultasi dengan RISE | Kontak',
      description:
        'Ceritakan kebutuhan organisasi atau usaha Anda lewat form atau WhatsApp. Tim RISE akan menanggapi dan membantu menentukan langkah awal.',
    },
    judul: 'Jadwalkan konsultasi.',
    subjudul:
      'Ceritakan kebutuhan organisasi atau usaha Anda. Kami akan menanggapi dan membantu menentukan langkah awal yang tepat.',
    pengantar:
      'Isi form di bawah ini. Cukup informasi dasar, tidak perlu sempurna. Detailnya bisa kita bahas saat berdiskusi. Semua isian wajib, kecuali yang ditandai opsional.',
    label: {
      nama: 'Nama lengkap',
      perusahaan: 'Perusahaan / organisasi',
      jabatan: 'Jabatan',
      email: 'Email',
      telepon: 'Nomor telepon / WhatsApp',
      layanan: 'Layanan diminati',
      pesan: 'Ceritakan kebutuhan Anda',
      opsional: '(opsional)',
      pilihLayanan: 'Pilih Layanan',
    },
    placeholder: {
      nama: 'Nama Anda',
      perusahaan: 'Nama perusahaan atau usaha',
      jabatan: 'Contoh: HR Manager, Direktur, Owner',
      email: 'nama@perusahaan.com',
      telepon: '0812 3456 7890',
      pesan: 'Contoh: kami sedang menata ulang struktur organisasi dan ingin berdiskusi tentang langkah awalnya.',
    },
    bantuan: {
      email: 'Kami membalas ke alamat ini.',
      telepon: 'Isi bila Anda lebih nyaman dihubungi lewat telepon atau WhatsApp.',
      pesan: 'Beberapa kalimat sudah cukup.',
    },
    layanan: {
      'konsultasi-manajemen': 'Konsultasi Manajemen',
      'psikologi-industri-organisasi': 'Psikologi Industri & Organisasi',
      'konsultasi-bisnis': 'Konsultasi Bisnis',
      'training-pengembangan': 'Training & Pengembangan',
      'belum-yakin': 'Belum yakin / perlu diskusi',
    },
    persetujuan:
      'Saya menyetujui RISE memproses data pribadi yang saya isi pada form ini untuk menanggapi permintaan konsultasi saya, sesuai Kebijakan Privasi.',
    error: {
      namaKosong: 'Mohon isi nama Anda.',
      namaPanjang: 'Nama terlalu panjang. Mohon singkat hingga 100 karakter.',
      perusahaanKosong: 'Mohon isi nama perusahaan atau organisasi Anda.',
      jabatanKosong: 'Mohon isi jabatan Anda.',
      emailKosong: 'Mohon isi alamat email Anda.',
      emailFormat: 'Alamat email belum sesuai. Contoh yang benar: nama@perusahaan.com.',
      teleponFormat: 'Nomor telepon belum sesuai. Gunakan angka saja, misalnya 081234567890 atau +6281234567890.',
      layananKosong: 'Mohon pilih satu Layanan. Bila belum yakin, pilih "Belum yakin / perlu diskusi".',
      pesanKosong: 'Mohon ceritakan kebutuhan Anda secara singkat.',
      pesanPendek: 'Pesan terlalu singkat. Tambahkan beberapa kata agar kami memahami kebutuhan Anda.',
      pesanPanjang: 'Pesan terlalu panjang. Mohon ringkas hingga 2.000 karakter.',
      persetujuan: 'Untuk melanjutkan, mohon centang persetujuan pemrosesan data.',
      terlaluSering: 'Anda sudah mengirim beberapa kali dalam waktu singkat. Mohon tunggu beberapa menit, lalu coba lagi.',
      server: 'Maaf, pesan Anda belum terkirim. Silakan coba lagi sebentar lagi, atau hubungi kami lewat WhatsApp.',
      ringkasan: (n: number) => `Ada ${n} isian yang perlu diperbaiki. Periksa kolom yang ditandai.`,
    },
    tombol: { kirim: 'Kirim permintaan konsultasi', mengirim: 'Mengirim...' },
    labelHoneypot: 'Situs web',
    catatanPrivasi: 'Data Anda hanya kami gunakan untuk menanggapi permintaan ini.',
    sukses: {
      judul: 'Terima kasih, permintaan Anda sudah kami terima.',
      // Waktu respons belum ditetapkan RISE; jangan menjanjikan durasi sampai ada datanya.
      isi: 'Kami akan menghubungi Anda melalui email.',
    },
  },
}
