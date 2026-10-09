// Copy dari docs/copy/beranda.md (SOH-142), headline rekomendasi A. `penanda` hanya tampil di staging.
export const beranda = {
  meta: {
    title: 'RISE | Konsultan Manajemen, SDM, dan Bisnis untuk Organisasi',
    description:
      'RISE mendampingi HR, direksi, dan owner bisnis menata strategi, orang, dan usaha lewat empat Layanan konsultasi dan pengembangan. Jadwalkan konsultasi.',
  },
  hero: {
    judul: 'Bisnis yang bertumbuh dimulai dari organisasi yang tertata.',
    pengantar:
      'RISE mendampingi HR, direksi, dan owner bisnis menyelesaikan persoalan organisasi, mulai dari strategi dan struktur, penilaian dan pengembangan SDM, hingga pengembangan usaha dan kompetensi tim.',
    ctaKedua: 'Kenali Layanan kami',
    foto: { src: '/foto/beranda-diskusi.jpg', alt: 'Lima orang berdiskusi di ruang rapat yang terang, duduk mengelilingi meja putih' },
  },
  sorotan: ['Empat Layanan, satu mitra', 'Dimulai dari memahami kondisi Anda', 'Konsultasi awal untuk menjajaki kebutuhan'],
  penandaSorotan: 'PERLU DATA RISE: apakah konsultasi awal gratis atau berbayar',
  layanan: {
    judul: 'Empat Layanan untuk persoalan yang berbeda',
    pengantar:
      'Setiap organisasi punya titik mulai yang berbeda. Pilih Layanan yang paling dekat dengan kebutuhan Anda, atau ceritakan situasinya dan kami bantu memetakan.',
    ringkasan: {
      'konsultasi-manajemen':
        'Pendampingan menyusun strategi, merapikan struktur organisasi, dan menyederhanakan proses bisnis agar organisasi bergerak searah.',
      'psikologi-industri-organisasi':
        'Asesmen, rekrutmen, dan pengembangan SDM berbasis psikologi, supaya keputusan tentang orang didasari data, bukan firasat.',
      'konsultasi-bisnis':
        'Pendampingan bagi owner bisnis dan UMKM untuk menata dan mengembangkan usaha dengan langkah yang realistis.',
      'training-pengembangan':
        'Pelatihan dan program pengembangan kompetensi karyawan yang dirancang sesuai kebutuhan organisasi Anda.',
    },
  },
  persoalan: {
    judul: 'Mungkin ini terdengar akrab',
    kutipan: [
      'Tim bertambah, tetapi alur kerja dan pembagian tanggung jawab makin kabur.',
      'Rekrutmen sudah berjalan, tetapi sulit memastikan kandidat benar-benar cocok.',
      'Usaha berjalan, tetapi keputusan masih bergantung pada owner seorang.',
      'Pelatihan sudah diadakan, tetapi perubahan di tempat kerja tidak terasa.',
    ],
    penutup: 'Kalau salah satunya mirip dengan situasi Anda, percakapan singkat bisa jadi awal yang baik.',
  },
  alasan: {
    judul: 'Mengapa organisasi bekerja sama dengan RISE',
    pengantar:
      'Kami ingin pendampingan terasa seperti bekerja dengan mitra, bukan menerima laporan tebal yang berakhir di laci.',
    butir: [
      {
        judul: 'Satu mitra, empat sudut pandang',
        isi: 'Persoalan organisasi jarang berdiri sendiri. Strategi, orang, usaha, dan kompetensi saling berkaitan, dan keempat Layanan RISE dapat dipadukan sesuai kebutuhan.',
      },
      {
        judul: 'Memahami dulu, merekomendasikan kemudian',
        isi: 'Kami mulai dari mendengar kondisi dan tujuan Anda, lalu menyusun rekomendasi yang sesuai dengan konteks organisasi, bukan templat yang sama untuk semua.',
      },
      {
        judul: 'Profesional, tetapi manusiawi',
        isi: 'Kami bekerja dengan standar profesional dan komunikasi yang terbuka. Pendekatan kami melibatkan orang-orang di organisasi Anda, karena perubahan hanya bertahan kalau dijalani bersama.',
      },
      {
        judul: 'Rekomendasi yang bisa dijalankan',
        isi: 'Hasil kerja kami dirancang agar bisa langsung dipakai oleh tim Anda, dengan langkah yang jelas dan urutan prioritas.',
      },
    ],
    penanda:
      'PERLU DATA RISE: keunggulan nyata yang dapat dibuktikan, misalnya pengalaman Konsultan, jumlah Klien, sertifikasi, atau metodologi khas',
  },
  memulai: {
    judul: 'Bagaimana kita memulai',
    langkah: [
      { judul: 'Ceritakan kebutuhan Anda', isi: 'Isi form atau hubungi kami lewat WhatsApp.' },
      { judul: 'Diskusi awal', isi: 'Kami mendengar situasi Anda dan menjajaki apakah serta bagaimana RISE dapat membantu.' },
      { judul: 'Usulan pendampingan', isi: 'Anda menerima usulan ruang lingkup dan langkah kerja untuk dipertimbangkan.' },
    ],
    penanda: 'PERLU DATA RISE: konfirmasi alur ini sesuai praktik RISE',
  },
  insight: {
    judul: 'Insight dari tim RISE',
    pengantar: 'Tulisan singkat tentang strategi, SDM, dan pengembangan usaha, ditulis oleh tim kami.',
    kosong: 'Insight pertama kami sedang disiapkan. Sambil menunggu, silakan ceritakan kebutuhan Anda.',
    kosongTautan: 'Ceritakan kebutuhan Anda',
  },
  // Judul bagian Klien dan testimoni tidak ada di copy; ditulis netral dan baru tampil bila Admin menyalakannya.
  klien: { judul: 'Organisasi yang pernah bekerja dengan RISE' },
  testimoni: { judul: 'Kata Klien kami' },
  penutup: {
    judul: 'Siap membicarakan kebutuhan organisasi Anda?',
    isi: 'Ceritakan tantangan yang sedang dihadapi. Kami akan menanggapi dan membantu menentukan langkah awal yang paling masuk akal.',
  },
}
