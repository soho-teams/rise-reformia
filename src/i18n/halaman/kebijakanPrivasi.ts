// Copy dari docs/copy/kebijakan-privasi.md (SOH-142), dibuat sekali dengan skrip dari markdown.
// Teks memakai **tebal** dan `[PERLU DATA RISE: ...]`, dirender oleh TeksInline.
// Status DRAF: selama `draf` terisi, banner dan penanda tampil di semua environment, karena
// banyak penanda berada di tengah kalimat. Kosongkan `draf` setelah teks disetujui RISE (syarat go-live).

type Blok = { jenis: 'h2'; teks: string } | { jenis: 'p'; teks: string } | { jenis: 'ul' | 'ol'; butir: string[] }

export const kebijakanPrivasi: {
  meta: { title: string; description: string }
  judul: string
  draf?: string
  info: { label: string; isi: string }[]
  blok: Blok[]
} = {
  meta: {
    title: 'Kebijakan Privasi | RISE',
    description:
      'Cara RISE (Reformia Inspirasi Semesta) mengumpulkan, memakai, dan melindungi data pribadi Anda, mengacu pada UU No. 27 Tahun 2022 tentang PDP.',
  },
  judul: 'Kebijakan Privasi',
  draf: 'DRAF, menunggu tinjauan RISE dan penasihat hukum. Bagian bertanda [PERLU DATA RISE] masih harus dilengkapi.',
  info: [
    {
      label: 'Berlaku sejak',
      isi: '`[PERLU DATA RISE: tanggal berlaku]`',
    },
    {
      label: 'Pembaruan terakhir',
      isi: '`[PERLU DATA RISE: tanggal]`',
    },
  ],
  blok: [
    {
      jenis: 'h2',
      teks: 'Pengantar',
    },
    {
      jenis: 'p',
      teks: 'Kami di RISE (Reformia Inspirasi Semesta) menghargai kepercayaan Anda. Kebijakan ini menjelaskan data pribadi apa yang kami kumpulkan melalui situs ini, untuk apa kami menggunakannya, berapa lama kami menyimpannya, dan hak apa yang Anda miliki. Kami menyusunnya mengacu pada Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).',
    },
    {
      jenis: 'h2',
      teks: '1. Pengendali data pribadi',
    },
    {
      jenis: 'p',
      teks: 'Pengendali data pribadi adalah: `[PERLU DATA RISE: nama badan hukum lengkap, misalnya PT ..., dan alamat terdaftar]`',
    },
    {
      jenis: 'p',
      teks: 'Kontak untuk urusan data pribadi: `[PERLU DATA RISE: email khusus privasi dan/atau nama pejabat/petugas pelindungan data pribadi]`',
    },
    {
      jenis: 'h2',
      teks: '2. Data yang kami kumpulkan',
    },
    {
      jenis: 'p',
      teks: '**Data yang Anda berikan lewat form konsultasi:**',
    },
    {
      jenis: 'ul',
      butir: [
        'Nama lengkap',
        'Nama perusahaan atau organisasi',
        'Jabatan',
        'Alamat email',
        'Nomor telepon (jika Anda mengisinya)',
        'Layanan yang diminati',
        'Isi pesan yang Anda tulis',
      ],
    },
    {
      jenis: 'p',
      teks: '**Data yang Anda berikan lewat WhatsApp atau email:** Nomor telepon, nama profil, dan isi percakapan saat Anda menghubungi kami.',
    },
    {
      jenis: 'p',
      teks: '**Data teknis yang terkumpul otomatis:** `[PERLU DATA RISE: konfirmasi data teknis yang dikumpulkan, misalnya alamat IP, jenis peramban, halaman yang dikunjungi, serta apakah memakai cookie atau layanan analitik (mis. Google Analytics). Sesuaikan bagian ini dengan konfigurasi situs yang sebenarnya.]`',
    },
    {
      jenis: 'p',
      teks: 'Kami tidak meminta data pribadi yang bersifat spesifik, seperti data kesehatan atau biometrik, melalui form ini. Mohon tidak mencantumkannya pada kolom pesan.',
    },
    {
      jenis: 'h2',
      teks: '3. Tujuan penggunaan data',
    },
    {
      jenis: 'p',
      teks: 'Kami menggunakan data Anda untuk:',
    },
    {
      jenis: 'ol',
      butir: [
        'Menanggapi permintaan konsultasi dan menghubungi Anda.',
        'Menjajaki kebutuhan dan menyusun usulan kerja sama.',
        'Mengelola hubungan dengan calon Klien dan Klien.',
        'Menjaga keamanan dan kinerja situs.',
        'Memenuhi kewajiban hukum, bila ada.',
      ],
    },
    {
      jenis: 'p',
      teks: '`[PERLU DATA RISE: konfirmasi bila data juga dipakai untuk mengirim newsletter atau Insight. Bila ya, perlu persetujuan terpisah dan tambahan opsi berhenti berlangganan.]`',
    },
    {
      jenis: 'p',
      teks: 'Kami tidak menjual data pribadi Anda.',
    },
    {
      jenis: 'h2',
      teks: '4. Dasar pemrosesan',
    },
    {
      jenis: 'p',
      teks: 'Kami memproses data Anda berdasarkan **persetujuan yang sah** yang Anda berikan dengan mencentang kotak persetujuan pada form. Untuk komunikasi lanjutan dalam rangka penjajakan atau pelaksanaan kerja sama, dasar pemrosesan dapat pula berupa **pemenuhan kewajiban perjanjian** atau **kepentingan yang sah**, sebagaimana dimungkinkan UU PDP.',
    },
    {
      jenis: 'p',
      teks: '`[PERLU DATA RISE: penasihat hukum perlu mengonfirmasi dasar pemrosesan yang paling tepat untuk setiap tujuan]`',
    },
    {
      jenis: 'h2',
      teks: '5. Pihak yang dapat menerima data',
    },
    {
      jenis: 'p',
      teks: 'Data Anda dapat diakses oleh:',
    },
    {
      jenis: 'ul',
      butir: [
        'Tim RISE yang berwenang menangani permintaan konsultasi (Admin);',
        'Penyedia layanan teknologi yang membantu kami mengoperasikan situs, seperti hosting, email, dan analitik `[PERLU DATA RISE: nama penyedia layanan]`;',
        'Pihak berwenang, bila diwajibkan oleh peraturan perundang-undangan.',
      ],
    },
    {
      jenis: 'p',
      teks: 'Penyedia layanan hanya boleh memakai data untuk keperluan yang kami tetapkan.',
    },
    {
      jenis: 'p',
      teks: '`[PERLU DATA RISE: apakah data disimpan atau diproses di luar wilayah Indonesia? Bila ya, jelaskan.]`',
    },
    {
      jenis: 'h2',
      teks: '6. Masa simpan',
    },
    {
      jenis: 'p',
      teks: 'Data Lead disimpan selama `[PERLU DATA RISE: masa simpan, misalnya 24 bulan sejak kontak terakhir]` atau selama diperlukan untuk tujuan di atas. Setelah itu, data kami hapus atau anonimkan, kecuali peraturan mewajibkan penyimpanan lebih lama.',
    },
    {
      jenis: 'h2',
      teks: '7. Keamanan data',
    },
    {
      jenis: 'p',
      teks: 'Kami menerapkan langkah teknis dan organisasi yang wajar untuk melindungi data Anda dari akses, pengubahan, atau pengungkapan tanpa izin. Akses ke data Lead dibatasi hanya untuk Admin yang berwenang.',
    },
    {
      jenis: 'p',
      teks: 'Bila terjadi kegagalan pelindungan data pribadi, kami akan menyampaikan pemberitahuan kepada Anda dan lembaga terkait sesuai ketentuan UU PDP.',
    },
    {
      jenis: 'p',
      teks: '`[PERLU DATA RISE: penasihat hukum perlu memastikan rincian prosedur dan tenggat pemberitahuan sesuai ketentuan yang berlaku]`',
    },
    {
      jenis: 'h2',
      teks: '8. Hak Anda sebagai subjek data pribadi',
    },
    {
      jenis: 'p',
      teks: 'Sesuai UU PDP, Anda berhak untuk:',
    },
    {
      jenis: 'ul',
      butir: [
        'Mendapatkan informasi tentang kejelasan identitas, dasar hukum, tujuan, dan akuntabilitas pihak yang meminta data;',
        'Melengkapi dan memperbarui data pribadi Anda;',
        'Mengakses dan memperoleh salinan data pribadi Anda;',
        'Mengakhiri pemrosesan, menghapus, dan/atau memusnahkan data pribadi Anda;',
        'Menarik kembali persetujuan yang telah diberikan;',
        'Mengajukan keberatan atas pemrosesan tertentu, serta menunda atau membatasi pemrosesan;',
        'Menggugat dan menerima ganti rugi atas pelanggaran pemrosesan data, sesuai peraturan.',
      ],
    },
    {
      jenis: 'p',
      teks: '**Cara menggunakan hak Anda:** kirim permintaan ke `[PERLU DATA RISE: email privasi]` dengan menyebutkan nama dan alamat email yang Anda gunakan pada form. Kami akan menanggapi dalam `[PERLU DATA RISE: jangka waktu, usulan: 3 x 24 jam untuk konfirmasi dan paling lambat 14 hari kerja untuk pelaksanaan]`.',
    },
    {
      jenis: 'p',
      teks: 'Menarik persetujuan tidak memengaruhi pemrosesan yang sudah berlangsung sebelumnya.',
    },
    {
      jenis: 'h2',
      teks: '9. Cookie',
    },
    {
      jenis: 'p',
      teks: '`[PERLU DATA RISE: jelaskan jenis cookie yang dipakai situs dan cara mengaturnya. Bila memakai cookie non-esensial, perlu banner persetujuan. Isi setelah developer mengonfirmasi cookie dan alat analitik yang dipakai.]`',
    },
    {
      jenis: 'h2',
      teks: '10. Tautan ke situs lain',
    },
    {
      jenis: 'p',
      teks: 'Situs ini dapat memuat tautan ke situs pihak lain, termasuk WhatsApp. Kebijakan privasi pihak tersebut berlaku di luar kendali kami.',
    },
    {
      jenis: 'h2',
      teks: '11. Perubahan kebijakan',
    },
    {
      jenis: 'p',
      teks: 'Kami dapat memperbarui kebijakan ini. Perubahan penting akan kami tandai di halaman ini dengan tanggal pembaruan terbaru.',
    },
    {
      jenis: 'h2',
      teks: '12. Hubungi kami',
    },
    {
      jenis: 'p',
      teks: 'Pertanyaan atau permintaan terkait data pribadi dapat disampaikan ke:',
    },
    {
      jenis: 'ul',
      butir: ['Email: `[PERLU DATA RISE: email privasi]`', 'Alamat: `[PERLU DATA RISE: alamat]`'],
    },
  ],
}
