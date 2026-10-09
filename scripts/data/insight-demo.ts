/**
 * Tujuh Insight contoh untuk demo, mengikuti mockup daftar Insight yang disetujui RISE.
 * Artikel pertama berasal dari mockup detail Insight; enam lainnya ditulis Soho Digital dari judul
 * dan ringkasan di mockup. Semuanya perlu ditinjau tim RISE sebelum dianggap tulisan resmi.
 *
 * Format `isi`: paragraf dipisah baris kosong, `## ` untuk subjudul, `1. ` daftar bernomor,
 * `- ` daftar butir, `> ` kutipan sorotan.
 */
import type { SlugLayanan } from '../../src/layanan'

export type InsightDemo = {
  judul: string
  ringkasan: string
  kategori: SlugLayanan
  sampul: { berkas: string; alt: string }
  isi: string
}

export const INSIGHT_DEMO: InsightDemo[] = [
  {
    judul: 'Merapikan struktur organisasi dimulai dari daftar keputusan',
    ringkasan:
      'Bagan organisasi menunjukkan siapa melapor kepada siapa. Kebingungan sehari-hari lebih sering muncul dari pertanyaan lain: siapa yang boleh memutuskan apa.',
    kategori: 'konsultasi-manajemen',
    sampul: { berkas: 'sampul-1-struktur.jpg', alt: 'Catatan tempel berwarna di papan perencanaan' },
    isi: `Banyak organisasi merapikan struktur dengan cara yang sama: memperbarui bagan, menambah kotak untuk jabatan baru, lalu membagikannya ke seluruh karyawan. Beberapa minggu kemudian, keluhan lama muncul lagi. Pekerjaan tertahan menunggu persetujuan yang tidak jelas datang dari siapa, dan dua manajer sama-sama merasa berwenang atas urusan yang sama.

Bagan itu tidak keliru. Bagan memang hanya dibuat untuk menjawab satu jenis pertanyaan.

## Yang dijawab bagan, dan yang tidak

Bagan organisasi menjelaskan garis pelaporan: siapa atasan siapa. Informasi ini penting untuk urusan kepegawaian. Dalam pekerjaan sehari-hari, orang lebih sering bertanya hal lain. Siapa yang menyetujui potongan harga untuk pelanggan ini? Siapa yang boleh mengubah jadwal produksi? Kalau dua tim berbeda pendapat, siapa yang memutuskan?

Ketika jawaban atas pertanyaan seperti itu tidak tertulis, setiap orang mengisinya dengan dugaan masing-masing. Keputusan kecil terus naik ke pimpinan, atau justru diambil oleh orang yang belum tentu berwenang.

## Petakan keputusannya lebih dulu

Cara yang lebih praktis adalah memulai dari keputusan yang rutin terjadi, lalu menyusun struktur di sekitarnya. Anda bisa memulainya dalam satu sesi kerja bersama para kepala bagian:

1. Kumpulkan keputusan yang muncul berulang dalam sebulan terakhir, misalnya persetujuan pembelian, perubahan harga, penerimaan karyawan, atau penanganan keluhan pelanggan.
1. Untuk setiap keputusan, tulis siapa yang memutuskan, siapa yang perlu dimintai pendapat, dan siapa yang cukup diberi tahu.
1. Tandai keputusan yang selama ini dijawab berbeda oleh orang yang berbeda. Kebingungan biasanya berasal dari sana.
1. Sepakati batas kewenangan yang jelas, misalnya nilai pembelian yang boleh disetujui kepala bagian tanpa menunggu direksi.

> Bagan memberi tahu siapa melapor kepada siapa. Daftar keputusan memberi tahu siapa yang boleh bergerak.

Setelah daftar ini tersusun, bagan organisasi sering ikut berubah. Ada jabatan yang ternyata perlu wewenang lebih besar. Ada juga dua fungsi yang selalu berebut keputusan dan lebih baik berada di bawah satu kepala bagian.

## Langkah yang bisa dimulai minggu ini

Anda tidak perlu menunggu proyek restrukturisasi. Pilih satu proses yang paling sering tersendat, misalnya pengadaan barang. Tuliskan setiap titik keputusan di proses itu beserta jabatan yang memegangnya. Bagikan tulisan itu ke tim yang terlibat, lalu minta mereka menandai bagian yang berbeda dari praktik sebenarnya.

Daftar keputusan yang ditulis dan disepakati bersama membuat struktur lebih mudah dijalankan. Setiap orang tahu kapan boleh langsung bergerak dan kapan perlu bertanya dulu.`,
  },
  {
    judul: 'Wawancara terstruktur membantu pewawancara menilai kandidat dengan lebih adil',
    ringkasan:
      'Pertanyaan yang sama, urutan yang sama, dan cara menilai yang disepakati sejak awal memudahkan tim membandingkan kandidat.',
    kategori: 'psikologi-industri-organisasi',
    sampul: { berkas: 'sampul-2-wawancara.jpg', alt: 'Tangan memegang CV di meja wawancara' },
    isi: `Dua pewawancara bisa keluar dari ruangan yang sama dengan kesimpulan yang berbeda tentang satu kandidat. Yang satu terkesan dengan cara kandidat bercerita, yang lain merasa jawabannya kurang dalam. Keduanya jujur. Masalahnya, mereka bertanya hal yang berbeda dan menilai dengan ukuran masing-masing.

Wawancara terstruktur mengurangi selisih seperti ini dengan menyepakati tiga hal sebelum wawancara dimulai.

## Pertanyaan disusun dari kebutuhan jabatan

Mulailah dari kebutuhan jabatan. Tuliskan beberapa kemampuan yang paling menentukan keberhasilan di jabatan itu, misalnya menyusun prioritas, menangani pelanggan yang kecewa, atau memimpin tim kecil. Untuk setiap kemampuan, siapkan pertanyaan yang meminta contoh nyata dari pengalaman kandidat, seperti "Ceritakan saat Anda harus memilih antara dua tugas yang sama-sama mendesak."

Pertanyaan berbasis pengalaman cenderung menghasilkan jawaban yang bisa diperiksa: apa situasinya, apa yang dilakukan, dan apa hasilnya.

## Semua kandidat mendapat pertanyaan yang sama

Kandidat yang ditanya hal berbeda sulit dibandingkan. Gunakan daftar pertanyaan yang sama dengan urutan yang sama untuk semua kandidat di satu posisi. Pewawancara tetap boleh menggali lebih dalam, selama pertanyaan intinya tidak berubah.

## Cara menilai disepakati sebelum wawancara

Siapkan skala sederhana untuk setiap kemampuan, lengkap dengan gambaran jawaban yang lemah, cukup, dan kuat. Setiap pewawancara mengisi nilainya sendiri sebelum berdiskusi, supaya pendapat orang yang paling senior tidak langsung memengaruhi yang lain.

> Wawancara yang adil bergantung pada aturan main yang sama untuk semua kandidat.

## Yang perlu disiapkan tim HR

- Daftar kemampuan utama untuk setiap jabatan yang sering direkrut.
- Bank pertanyaan berbasis pengalaman untuk setiap kemampuan.
- Lembar penilaian dengan skala dan contoh jawaban.
- Waktu singkat bagi pewawancara untuk menyamakan cara menilai sebelum musim rekrutmen.

Wawancara terstruktur tidak membuat keputusan rekrutmen menjadi otomatis. Keputusan tetap di tangan tim. Bedanya, diskusi tim kini berpijak pada catatan yang bisa dibandingkan antarkandidat.`,
  },
  {
    judul: 'Tanda usaha Anda mulai tertahan karena semua keputusan menunggu owner',
    ringkasan:
      'Kapan owner perlu mulai mendelegasikan keputusan, dan bagaimana melepasnya secara bertahap tanpa kehilangan kendali.',
    kategori: 'konsultasi-bisnis',
    sampul: { berkas: 'sampul-3-owner.jpg', alt: 'Pemilik toko menyodorkan kunci' },
    isi: `Di awal usaha, owner memegang hampir semua keputusan, dan itu wajar. Owner yang paling paham produk, pelanggan, dan uang yang tersedia. Seiring usaha bertambah besar, pola yang sama perlahan menjadi penghambat. Pekerjaan berhenti setiap kali owner sedang di luar kota, dan tim terbiasa menunggu.

## Tanda-tanda yang perlu diperhatikan

- Karyawan sering menelepon owner untuk hal yang sebenarnya sudah berulang kali terjadi.
- Pelanggan menunggu jawaban karena harga atau jadwal harus disetujui owner lebih dulu.
- Owner tidak sempat memikirkan arah usaha karena waktunya habis untuk urusan harian.
- Karyawan yang cakap memilih pindah karena merasa tidak diberi kepercayaan.

Kalau beberapa tanda ini terasa akrab, usaha Anda mungkin sudah siap untuk pembagian keputusan yang lebih jelas.

## Mulai dari keputusan yang paling sering terjadi

Melepas keputusan tidak harus sekaligus. Catat keputusan yang Anda ambil selama dua minggu, lalu kelompokkan. Biasanya ada keputusan yang muncul setiap hari dengan risiko kecil, misalnya mengganti jadwal pengiriman atau memberi potongan kecil untuk pelanggan tetap. Kelompok inilah yang paling aman untuk didelegasikan lebih dulu.

## Lepaskan dengan batas yang jelas

Delegasi berjalan lebih baik jika batasnya tertulis. Contohnya:

1. Kepala toko boleh memberi potongan harga sampai batas tertentu tanpa bertanya.
1. Di atas batas itu, kepala toko mengusulkan dan owner yang memutuskan.
1. Setiap akhir minggu, kepala toko melaporkan keputusan yang sudah diambil.

> Delegasi yang tertulis memberi tim keberanian untuk bergerak, dan memberi owner cara untuk tetap memantau.

## Kendali tetap ada, bentuknya yang berubah

Owner tidak kehilangan kendali ketika mendelegasikan. Kendali berpindah dari menyetujui setiap keputusan menjadi menetapkan aturan dan memeriksa hasilnya secara berkala. Waktu yang terbebas bisa dipakai untuk hal yang hanya bisa dikerjakan owner: menentukan arah usaha, menjaga hubungan dengan mitra penting, dan menyiapkan orang-orang kunci untuk tumbuh bersama usaha.`,
  },
  {
    judul: 'Pelatihan yang terasa di tempat kerja disiapkan sebelum kelas dibuka',
    ringkasan:
      'Tujuan yang jelas, atasan peserta yang dilibatkan, dan rencana praktik membuat materi pelatihan lebih mungkin dipakai.',
    kategori: 'training-pengembangan',
    sampul: { berkas: 'sampul-4-pelatihan.jpg', alt: 'Peserta mendengarkan pemateri di ruang pelatihan' },
    isi: `Peserta pulang dari pelatihan dengan semangat baru dan catatan yang rapi. Seminggu kemudian, pekerjaan berjalan seperti biasa. Hal ini jarang disebabkan oleh materi yang buruk. Lebih sering, pelatihan dirancang sebagai acara satu hari, padahal perubahan cara kerja butuh persiapan sebelum dan dukungan sesudahnya.

## Sebelum kelas: rumuskan perubahan yang diharapkan

Mulailah dengan pertanyaan sederhana: setelah pelatihan, apa yang ingin dilihat atasan dari peserta dalam pekerjaan sehari-hari? Jawaban seperti "lebih komunikatif" terlalu luas. Jawaban seperti "memimpin rapat tim mingguan dengan agenda tertulis dan catatan tindak lanjut" lebih mudah dirancang dan dinilai.

## Libatkan atasan peserta sejak awal

Atasan langsung adalah orang yang paling menentukan apakah materi pelatihan dipakai. Ajak atasan berbicara singkat dengan peserta sebelum kelas tentang apa yang ingin dicoba, lalu setelah kelas tentang kesempatan untuk mempraktikkannya. Percakapan pendek ini sering lebih berpengaruh daripada tambahan satu sesi materi.

## Siapkan kesempatan praktik

Keterampilan baru perlu dicoba di situasi nyata. Rancang tugas kecil yang bisa dikerjakan peserta dalam beberapa minggu setelah pelatihan, misalnya:

- Menjalankan satu rapat tim dengan format yang dipelajari.
- Memberikan umpan balik kepada satu anggota tim memakai kerangka yang diajarkan.
- Menyusun rencana kerja bulanan bersama atasan.

> Pelatihan memberi pengetahuan. Praktik yang didampingi mengubahnya menjadi kebiasaan.

## Setelah kelas: tindak lanjut yang ringan

Tindak lanjut tidak harus rumit. Pertemuan singkat beberapa minggu setelah pelatihan untuk membahas apa yang sudah dicoba, apa yang berhasil, dan apa yang masih sulit sudah memberi gambaran yang berguna. Catatan dari pertemuan ini juga membantu organisasi menentukan pelatihan berikutnya berdasarkan kebutuhan yang terlihat di lapangan.`,
  },
  {
    judul: 'Asesmen karyawan: apa yang bisa dan tidak bisa dijawabnya',
    ringkasan:
      'Hasil asesmen membantu memahami potensi dan kebutuhan pengembangan. Asesmen tidak dirancang untuk menggantikan penilaian kinerja.',
    kategori: 'psikologi-industri-organisasi',
    sampul: { berkas: 'sampul-5-asesmen.jpg', alt: 'Lembar jawaban asesmen' },
    isi: `Asesmen karyawan sering diminta ketika organisasi akan mengambil keputusan penting tentang orang: memilih calon pemimpin, menyusun program pengembangan, atau menata ulang tim. Hasilnya berguna jika semua pihak memahami pertanyaan apa yang memang bisa dijawab asesmen, dan pertanyaan apa yang perlu dijawab dengan cara lain.

## Yang bisa dijawab asesmen

Asesmen dirancang untuk menggambarkan kecenderungan dan potensi seseorang. Beberapa pertanyaan yang bisa dibantu jawabannya:

- Kemampuan apa yang menonjol, dan mana yang perlu dikembangkan?
- Bagaimana seseorang cenderung bekerja di bawah tekanan atau dalam tim?
- Seberapa siap seseorang untuk peran dengan tanggung jawab yang lebih besar?
- Program pengembangan seperti apa yang paling sesuai untuk kelompok tertentu?

## Yang tidak bisa dijawab asesmen

Asesmen tidak menggantikan catatan kinerja. Hasil asesmen tidak menunjukkan apakah target tahun lalu tercapai, bagaimana seseorang diperlakukan rekan kerjanya, atau apakah ia sedang menghadapi situasi pribadi yang memengaruhi pekerjaan. Informasi seperti itu datang dari atasan, data kinerja, dan percakapan langsung.

> Asesmen paling berguna ketika diletakkan di samping data kinerja dan penilaian atasan, sebagai salah satu sumber pertimbangan.

## Supaya hasilnya bisa dipakai

1. Tentukan tujuan sebelum memilih alat ukur. Asesmen untuk promosi berbeda dengan asesmen untuk pengembangan.
1. Sampaikan kepada peserta untuk apa asesmen dilakukan dan siapa yang akan melihat hasilnya.
1. Bahas hasil bersama peserta, supaya hasilnya benar-benar dipakai sebagai bahan pengembangan.
1. Jaga kerahasiaan hasil dan batasi aksesnya pada pihak yang memang berwenang.

Dengan tujuan yang jelas dan cara pemakaian yang disepakati, asesmen membantu organisasi mengambil keputusan tentang orang dengan pertimbangan yang lebih lengkap.`,
  },
  {
    judul: 'Rapat koordinasi mingguan tanpa menghabiskan setengah hari',
    ringkasan:
      'Rapat koordinasi kembali berguna ketika agendanya tetap dan keputusannya dicatat lalu dibagikan setelah rapat selesai.',
    kategori: 'konsultasi-manajemen',
    sampul: { berkas: 'sampul-6-rapat.jpg', alt: 'Ruang rapat dengan kursi tertata di sekeliling meja' },
    isi: `Rapat koordinasi mingguan dimulai dengan niat baik: memastikan semua bagian bergerak searah. Lama-lama rapat menjadi tempat setiap orang melaporkan semua kegiatannya, diskusi melebar ke topik yang hanya melibatkan dua orang, dan peserta keluar tanpa tahu apa yang sudah diputuskan.

## Agenda yang sama setiap minggu

Rapat koordinasi lebih mudah dijalankan dengan agenda tetap. Peserta tahu apa yang perlu disiapkan, dan pemimpin rapat punya alasan untuk menghentikan pembahasan yang keluar jalur. Contoh susunan yang bisa dicoba:

1. Tindak lanjut keputusan minggu lalu: selesai, berjalan, atau terhambat.
1. Hal yang membutuhkan bantuan bagian lain.
1. Keputusan yang perlu diambil bersama minggu ini.
1. Rangkuman keputusan dan penanggung jawabnya.

## Laporan rutin dibaca sebelum rapat

Laporan kegiatan yang sifatnya informasi bisa dikirim tertulis sehari sebelumnya. Waktu rapat dipakai untuk hal yang memang membutuhkan diskusi: masalah yang melibatkan lebih dari satu bagian dan keputusan yang perlu disepakati.

> Rapat koordinasi berguna ketika fokusnya pada hal yang memerlukan kesepakatan bersama.

## Pembahasan dua orang dipindah ke luar rapat

Jika sebuah topik hanya melibatkan dua bagian, catat topiknya dan minta keduanya membahasnya setelah rapat. Hasilnya cukup dilaporkan di rapat berikutnya.

## Keputusan dicatat dan dibagikan

Tunjuk satu orang untuk mencatat setiap keputusan, penanggung jawab, dan tenggatnya. Bagikan catatan itu pada hari yang sama. Catatan inilah yang menjadi bahan agenda pertama di rapat berikutnya, sehingga setiap keputusan punya tindak lanjut yang jelas.

Perubahan kecil seperti ini sering cukup untuk membuat rapat lebih singkat. Yang lebih penting, peserta keluar dari ruangan dengan pemahaman yang sama tentang apa yang harus dikerjakan.`,
  },
  {
    judul: 'Periksa arus kas sebelum memutuskan ekspansi',
    ringkasan:
      'Usaha yang untung di atas kertas tetap bisa kesulitan membayar tagihan. Sebelum membuka cabang atau menambah karyawan, pelajari dulu pola arus kas Anda.',
    kategori: 'konsultasi-bisnis',
    sampul: { berkas: 'sampul-7-aruskas.jpg', alt: 'Kalkulator dan pena di atas catatan keuangan' },
    isi: `Penjualan sedang bagus dan laporan laba rugi menunjukkan untung. Rasanya ini saat yang tepat untuk membuka cabang baru atau menambah karyawan. Sebelum memutuskan, ada satu hal yang perlu diperiksa: kapan uang benar-benar masuk dan kapan uang harus keluar.

## Untung dan uang tunai adalah dua hal berbeda

Laporan laba rugi mencatat penjualan saat transaksi terjadi, walaupun pembayarannya baru diterima beberapa minggu kemudian. Sementara itu, gaji, sewa, dan pembayaran ke pemasok harus dibayar tepat waktu. Usaha yang untung bisa tetap kesulitan membayar tagihan jika uangnya masih tertahan di piutang atau stok.

## Pola yang perlu dipelajari

Ambil catatan keuangan beberapa bulan terakhir dan perhatikan:

- Berapa lama rata-rata pelanggan membayar setelah barang atau jasa diterima.
- Kapan pengeluaran besar biasanya jatuh tempo dalam sebulan.
- Bulan-bulan ketika penjualan turun atau pengeluaran naik.
- Berapa lama stok tersimpan sebelum terjual.

Dari pola ini, Anda bisa melihat apakah usaha punya cadangan uang yang cukup untuk menanggung biaya tambahan dari ekspansi.

> Ekspansi memperbesar pengeluaran lebih dulu. Pemasukan dari cabang atau karyawan baru biasanya datang belakangan.

## Hitung masa tunggu ekspansi

Cabang baru membutuhkan biaya sebelum menghasilkan, mulai dari sewa, renovasi, stok awal, hingga gaji. Buat perkiraan sederhana:

1. Total biaya sebelum cabang mulai berjualan.
1. Biaya bulanan cabang selama penjualan belum stabil.
1. Perkiraan waktu sampai cabang bisa menutup biayanya sendiri.
1. Cadangan uang untuk menanggung semua itu tanpa mengganggu usaha yang sudah berjalan.

Jika cadangan belum cukup, ekspansi tidak harus dibatalkan. Bisa jadi yang dibutuhkan adalah menata penagihan piutang lebih dulu, menyesuaikan jadwal pembayaran ke pemasok, atau memulai dari skala yang lebih kecil. Keputusan yang diambil setelah melihat arus kas memberi usaha ruang untuk tumbuh dengan lebih tenang.`,
  },
]
