// Copy empat halaman Layanan dari docs/copy/layanan-*.md (SOH-142). Dibuat sekali dengan skrip
// dari markdown; ubah di sini dan di docs/copy bersamaan. `penanda` hanya tampil di staging.
import type { SlugLayanan } from '@/layanan'

type HalamanLayanan = {
  meta: { title: string; description: string }
  judul: string
  pengantar: string
  foto: { src: string; alt: string }
  masalah: { judul: string; butir: string[] }
  pendekatan: {
    judul: string
    langkah: { judul: string; isi: string }[]
    catatan?: string
    penanda?: string
  }
  cakupan: { judul: string; butir: string[]; penanda?: string }
  hasil: { pengantar: string; butir: string[]; catatan?: string }
  faq: ({ tanya: string; jawab: string } | { tanya: string; penanda: string })[]
  penutup: { judul: string; isi: string }
  pesanWhatsapp: string
}

export const halamanLayanan: Record<SlugLayanan, HalamanLayanan> = {
  'konsultasi-manajemen': {
    meta: {
      title: 'Konsultasi Manajemen: Strategi & Struktur Organisasi | RISE',
      description:
        'Pendampingan menyusun strategi, merapikan struktur organisasi, dan menyederhanakan proses bisnis untuk HR dan direksi. Jadwalkan konsultasi dengan RISE.',
    },
    judul: 'Organisasi yang bergerak ke arah yang sama.',
    pengantar:
      'Konsultasi Manajemen RISE membantu direksi dan HR menyusun strategi, merapikan struktur organisasi, dan menyederhanakan proses bisnis.',
    foto: {
      src: '/foto/layanan-konsultasi-manajemen.jpg',
      alt: 'Catatan tempel berwarna di papan perencanaan',
    },
    masalah: {
      judul: 'Tanda-tanda organisasi perlu ditata ulang',
      butir: [
        'Strategi sudah dirumuskan, tetapi tiap bagian menafsirkannya sendiri-sendiri.',
        'Pembagian peran dan tanggung jawab tumpang tindih atau tidak jelas.',
        'Keputusan sederhana harus melewati terlalu banyak tahap.',
        'Pertumbuhan perusahaan membuat struktur lama tidak lagi cocok.',
        'Proses kerja bergantung pada orang tertentu, belum pada sistem.',
      ],
    },
    pendekatan: {
      judul: 'Bagaimana RISE bekerja',
      langkah: [
        {
          judul: 'Memahami',
          isi: 'Kami mempelajari tujuan, kondisi, dan hambatan organisasi lewat diskusi dan telaah dokumen.',
        },
        {
          judul: 'Mendiagnosis',
          isi: 'Kami memetakan penyebab di balik gejala yang terlihat.',
        },
        {
          judul: 'Merancang',
          isi: 'Kami menyusun rekomendasi bersama tim Anda, sehingga hasilnya realistis dan dimiliki bersama.',
        },
        {
          judul: 'Mendampingi',
          isi: 'Kami membantu tim menerapkan rancangan dan menyesuaikannya bila diperlukan.',
        },
      ],
      penanda: 'PERLU DATA RISE: konfirmasi tahapan kerja sesuai metodologi RISE yang sebenarnya',
    },
    cakupan: {
      judul: 'Yang dapat kami bantu',
      butir: [
        'Perumusan atau penajaman strategi dan rencana kerja organisasi',
        'Perancangan atau penataan struktur organisasi dan pembagian peran',
        'Pemetaan dan perbaikan proses bisnis',
        'Penyusunan prosedur kerja dan indikator kinerja',
        'Pendampingan perubahan organisasi',
      ],
      penanda:
        'PERLU DATA RISE: konfirmasi daftar cakupan; tambah atau kurangi sesuai kapabilitas aktual',
    },
    hasil: {
      pengantar: 'Setelah pendampingan, organisasi Anda diharapkan memiliki',
      butir: [
        'Arah dan prioritas yang dipahami semua level',
        'Struktur dan peran yang jelas',
        'Proses kerja yang lebih ringkas dan terdokumentasi',
        'Tolok ukur untuk menilai kemajuan',
      ],
      catatan:
        'Hasil bergantung pada kondisi dan komitmen organisasi. Kami tidak menjanjikan angka tertentu sebelum memahami situasi Anda.',
    },
    faq: [
      {
        tanya: 'Apakah Layanan ini hanya untuk perusahaan besar?',
        jawab:
          'Tidak. Layanan ini cocok untuk organisasi yang membutuhkannya, berapa pun ukurannya. Diskusi awal akan membantu menilai apakah Layanan ini yang Anda perlukan.',
      },
      {
        tanya: 'Berapa lama pendampingannya?',
        jawab:
          'Tergantung ruang lingkup dan kompleksitas persoalan. Kami akan menyampaikan perkiraan setelah diskusi awal.',
      },
      {
        tanya: 'Bisakah dipadukan dengan Layanan RISE lain?',
        jawab:
          'Bisa. Misalnya, penataan struktur dapat dilanjutkan dengan asesmen SDM atau Training & Pengembangan.',
      },
    ],
    penutup: {
      judul: 'Mulai dari satu percakapan.',
      isi: 'Ceritakan kondisi organisasi Anda, dan kami bantu menentukan titik mulai yang tepat.',
    },
    pesanWhatsapp:
      'Halo RISE, saya tertarik dengan Layanan Konsultasi Manajemen dan ingin berdiskusi lebih lanjut.',
  },
  'psikologi-industri-organisasi': {
    meta: {
      title: 'Psikologi Industri & Organisasi: Asesmen & SDM | RISE',
      description:
        'Asesmen, rekrutmen, dan pengembangan SDM berbasis psikologi agar keputusan tentang orang lebih tepat. Layanan RISE untuk HR dan direksi. Konsultasi sekarang.',
    },
    judul: 'Keputusan tentang orang, berdasarkan data yang bisa dipertanggungjawabkan.',
    pengantar:
      'Layanan Psikologi Industri & Organisasi RISE membantu HR dan direksi dalam asesmen, rekrutmen, dan pengembangan SDM.',
    foto: {
      src: '/foto/layanan-psikologi-industri-organisasi.jpg',
      alt: 'Empat rekan kerja berdiskusi di meja kantor',
    },
    masalah: {
      judul: 'Tanda-tanda Anda memerlukan pendekatan psikologi',
      butir: [
        'Kandidat tampak meyakinkan saat wawancara, tetapi kinerjanya tidak sesuai harapan.',
        'Promosi atau mutasi diputuskan tanpa gambaran kompetensi yang objektif.',
        'Turnover tinggi dan penyebabnya belum jelas.',
        'Karyawan berpotensi tinggi belum teridentifikasi dan belum dikembangkan.',
        'Dinamika tim terasa kurang sehat, tetapi sulit dijelaskan sumbernya.',
      ],
    },
    pendekatan: {
      judul: 'Bagaimana RISE bekerja',
      langkah: [
        {
          judul: 'Menentukan kebutuhan',
          isi: 'Kami memahami peran, budaya, dan tujuan organisasi sebelum memilih alat ukur.',
        },
        {
          judul: 'Mengukur',
          isi: 'Kami memakai metode asesmen yang sesuai dengan tujuan, bukan satu paket untuk semua keperluan.',
        },
        {
          judul: 'Menafsirkan',
          isi: 'Hasil dianalisis dalam konteks pekerjaan dan organisasi, bukan sekadar skor.',
        },
        {
          judul: 'Menindaklanjuti',
          isi: 'Hasil dituangkan dalam rekomendasi yang bisa dijalankan HR dan atasan langsung.',
        },
      ],
      catatan: 'Kami menjaga kerahasiaan hasil asesmen dan menyampaikannya secara etis.',
      penanda:
        'PERLU DATA RISE: metode dan alat asesmen yang digunakan, serta status keprofesian psikolog yang menangani (misalnya terdaftar di HIMPSI / memiliki SIPP). Jangan ditayangkan tanpa konfirmasi.',
    },
    cakupan: {
      judul: 'Yang dapat kami bantu',
      butir: [
        'Asesmen kandidat untuk rekrutmen dan seleksi',
        'Asesmen karyawan untuk promosi, mutasi, dan pemetaan potensi',
        'Dukungan proses rekrutmen: profil jabatan, kriteria seleksi, wawancara terstruktur',
        'Perancangan program pengembangan SDM berdasarkan hasil asesmen',
        'Survei dan telaah kondisi organisasi, seperti keterlibatan karyawan dan iklim kerja',
      ],
      penanda:
        'PERLU DATA RISE: konfirmasi cakupan, termasuk apakah RISE juga menjalankan pencarian kandidat (headhunting) atau hanya asesmen',
    },
    hasil: {
      pengantar: 'Setelah bekerja sama, HR dan direksi diharapkan memiliki',
      butir: [
        'Gambaran kompetensi dan potensi yang objektif sebagai pendukung keputusan',
        'Proses seleksi yang lebih terstruktur',
        'Peta kekuatan dan area pengembangan tim',
        'Rencana pengembangan yang berpijak pada data',
      ],
      catatan: 'Asesmen adalah pendukung keputusan, bukan pengganti penilaian manajemen.',
    },
    faq: [
      {
        tanya: 'Apakah asesmen sama dengan psikotes?',
        jawab:
          'Psikotes adalah salah satu alat yang mungkin dipakai. Layanan kami mencakup lebih luas: menentukan tujuan, memilih metode yang sesuai, menafsirkan, lalu merumuskan tindak lanjut.',
      },
      {
        tanya: 'Bagaimana kerahasiaan hasilnya?',
        jawab:
          'Hasil asesmen dikelola secara rahasia dan hanya dibagikan kepada pihak yang berwenang sesuai kesepakatan.',
      },
      {
        tanya: 'Apakah bisa untuk jumlah peserta kecil?',
        penanda: 'PERLU DATA RISE: ketentuan minimum peserta, jika ada',
      },
    ],
    penutup: {
      judul: 'Bicarakan kebutuhan SDM Anda.',
      isi: 'Ceritakan peran atau tantangan yang sedang Anda hadapi, dan kami bantu menentukan pendekatan yang cocok.',
    },
    pesanWhatsapp:
      'Halo RISE, saya tertarik dengan Layanan Psikologi Industri & Organisasi dan ingin berdiskusi lebih lanjut.',
  },
  'konsultasi-bisnis': {
    meta: {
      title: 'Konsultasi Bisnis untuk Owner dan UMKM | RISE',
      description:
        'Pendampingan owner bisnis dan UMKM menata dan mengembangkan usaha dengan langkah yang realistis dan terukur. Jadwalkan konsultasi dengan RISE.',
    },
    judul: 'Usaha Anda sudah berjalan. Saatnya ditata agar bisa tumbuh.',
    pengantar:
      'Konsultasi Bisnis RISE mendampingi owner bisnis dan UMKM mengembangkan usahanya dengan langkah yang realistis.',
    foto: {
      src: '/foto/layanan-konsultasi-bisnis.jpg',
      alt: 'Pemilik toko tersenyum sambil memegang kunci di dalam tokonya',
    },
    masalah: {
      judul: 'Tantangan yang sering dihadapi owner',
      butir: [
        'Semua keputusan masih menunggu owner, sehingga usaha sulit bertumbuh.',
        'Penjualan ada, tetapi tidak jelas bagian mana yang benar-benar menguntungkan.',
        'Tim bertambah, tetapi tugas dan aturan main belum tertata.',
        'Ada banyak peluang, tetapi sulit menentukan prioritas.',
        'Keuangan usaha dan keuangan pribadi masih bercampur.',
      ],
    },
    pendekatan: {
      judul: 'Bagaimana RISE bekerja',
      langkah: [
        {
          judul: 'Mendengar',
          isi: 'Kami memahami usaha, tujuan, dan batas sumber daya Anda.',
        },
        {
          judul: 'Memetakan',
          isi: 'Kami melihat kondisi usaha secara menyeluruh untuk menemukan prioritas.',
        },
        {
          judul: 'Merencanakan',
          isi: 'Kami menyusun langkah bertahap yang sesuai kemampuan usaha.',
        },
        {
          judul: 'Mendampingi',
          isi: 'Kami menemani Anda menjalankannya dan menyesuaikan arah bila kondisi berubah.',
        },
      ],
      catatan:
        'Kami tidak menyodorkan rencana besar yang sulit dijalankan. Kami memilih langkah kecil yang konsisten.',
      penanda:
        'PERLU DATA RISE: konfirmasi pendekatan dan format pendampingan (tatap muka, daring, berkala)',
    },
    cakupan: {
      judul: 'Yang dapat kami bantu',
      butir: [
        'Penajaman model bisnis dan target pasar',
        'Penyusunan rencana pengembangan usaha',
        'Penataan peran, aturan main, dan pembagian tugas tim',
        'Penyusunan indikator sederhana untuk memantau kemajuan usaha',
        'Persiapan usaha untuk berkembang, termasuk pendelegasian',
      ],
      penanda:
        'PERLU DATA RISE: konfirmasi cakupan, misalnya apakah mencakup pemasaran, keuangan, atau pendampingan pembiayaan',
    },
    hasil: {
      pengantar: 'Setelah pendampingan, owner diharapkan memiliki',
      butir: [
        'Gambaran yang lebih jelas tentang kondisi dan arah usaha',
        'Prioritas pengembangan yang disepakati',
        'Tim dan proses yang tidak sepenuhnya bergantung pada owner',
        'Rencana langkah berikutnya yang bisa dijalankan',
      ],
    },
    faq: [
      {
        tanya: 'Apakah cocok untuk usaha yang masih kecil?',
        jawab:
          'Cocok. Layanan ini memang kami rancang untuk owner bisnis dan UMKM. Skala usaha menentukan ruang lingkup, bukan layak tidaknya Anda berkonsultasi.',
      },
      {
        tanya: 'Bedanya dengan Konsultasi Manajemen?',
        jawab:
          'Konsultasi Manajemen berfokus pada penataan strategi, struktur, dan proses di organisasi. Konsultasi Bisnis berfokus pada pendampingan owner dalam mengembangkan usahanya. Jika Anda ragu, pilih "Belum yakin / perlu diskusi" di form dan kami bantu menentukan.',
      },
      {
        tanya: 'Apakah ada jaminan omzet naik?',
        jawab:
          'Tidak ada konsultan yang bisa menjamin itu secara jujur. Yang kami tawarkan adalah analisis yang cermat dan langkah yang jelas.',
      },
    ],
    penutup: {
      judul: 'Ceritakan usaha Anda.',
      isi: 'Kami ingin tahu apa yang sudah Anda bangun dan ke mana Anda ingin membawanya.',
    },
    pesanWhatsapp:
      'Halo RISE, saya tertarik dengan Layanan Konsultasi Bisnis dan ingin berdiskusi lebih lanjut.',
  },
  'training-pengembangan': {
    meta: {
      title: 'Training & Pengembangan Kompetensi Karyawan | RISE',
      description:
        'Pelatihan dan program pengembangan kompetensi karyawan yang dirancang sesuai kebutuhan organisasi Anda, bukan paket seragam. Jadwalkan konsultasi.',
    },
    judul: 'Pelatihan yang berujung pada perubahan di tempat kerja.',
    pengantar:
      'Training & Pengembangan RISE merancang pelatihan dan program pengembangan kompetensi sesuai kebutuhan organisasi Anda.',
    foto: {
      src: '/foto/layanan-training-pengembangan.jpg',
      alt: 'Fasilitator memandu sesi pelatihan di depan peserta',
    },
    masalah: {
      judul: 'Tanda-tanda pelatihan belum berdampak',
      butir: [
        'Pelatihan rutin diadakan, tetapi sulit melihat perubahan di pekerjaan.',
        'Materi terasa umum dan kurang sesuai dengan tantangan nyata peserta.',
        'Kebutuhan pelatihan ditentukan berdasarkan permintaan, bukan analisis kesenjangan kompetensi.',
        'Atasan baru atau pemimpin tim belum siap memimpin.',
        'Anggaran pelatihan ada, tetapi sulit menilai hasilnya.',
      ],
    },
    pendekatan: {
      judul: 'Bagaimana RISE bekerja',
      langkah: [
        {
          judul: 'Menganalisis kebutuhan',
          isi: 'Kami mengidentifikasi kesenjangan kompetensi yang benar-benar memengaruhi kinerja.',
        },
        {
          judul: 'Merancang',
          isi: 'Materi dan metode disesuaikan dengan peserta, peran, dan konteks organisasi.',
        },
        {
          judul: 'Melaksanakan',
          isi: 'Sesi dirancang agar peserta aktif, dengan kasus yang dekat dengan pekerjaan mereka.',
        },
        {
          judul: 'Menindaklanjuti',
          isi: 'Kami membantu organisasi menilai hasil dan merencanakan penguatan lanjutan.',
        },
      ],
      penanda:
        'PERLU DATA RISE: konfirmasi alur dan metode, termasuk bentuk evaluasi dampak yang ditawarkan',
    },
    cakupan: {
      judul: 'Yang dapat kami bantu',
      butir: [
        'Analisis kebutuhan pelatihan',
        'Pelatihan kepemimpinan dan manajerial',
        'Pelatihan keterampilan interpersonal dan kerja sama tim',
        'Program pengembangan karyawan berpotensi atau calon pemimpin',
        'Penyusunan peta pengembangan kompetensi',
      ],
      penanda:
        'PERLU DATA RISE: daftar tema pelatihan yang benar-benar tersedia, format penyampaian (tatap muka/daring), dan kapasitas peserta',
    },
    hasil: {
      pengantar: 'Setelah program, organisasi diharapkan memiliki',
      butir: [
        'Peserta dengan pemahaman dan keterampilan yang sesuai kebutuhan peran',
        'Kebiasaan kerja yang mulai berubah dan bisa diamati',
        'Rencana tindak lanjut untuk menjaga dampaknya',
        'Dasar yang lebih baik untuk menentukan pelatihan berikutnya',
      ],
    },
    faq: [
      {
        tanya: 'Apakah materinya bisa disesuaikan dengan industri kami?',
        jawab:
          'Ya, itulah tujuan kami: materi dirancang mengikuti konteks dan tantangan organisasi Anda.',
      },
      {
        tanya: 'Apakah bisa untuk satu departemen saja?',
        jawab: 'Bisa. Ruang lingkup dapat disesuaikan, dari satu tim hingga seluruh organisasi.',
      },
      {
        tanya: 'Apakah tersedia secara daring?',
        penanda: 'PERLU DATA RISE: format penyampaian yang tersedia',
      },
    ],
    penutup: {
      judul: 'Rancang pelatihan yang tepat sasaran.',
      isi: 'Sampaikan tantangan kompetensi di tim Anda. Kami bantu merumuskan program yang sesuai.',
    },
    pesanWhatsapp:
      'Halo RISE, saya tertarik dengan Layanan Training & Pengembangan dan ingin berdiskusi lebih lanjut.',
  },
}
