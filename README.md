
![Laravel](https://img.shields.io/badge/Laravel-12.x-red?logo=laravel)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Status](https://img.shields.io/badge/Status-Active-success)

# Perpustakaan Kelurahan Gunungpati

Perpustakaan Kelurahan Gunungpati adalah aplikasi manajemen perpustakaan modern yang dirancang untuk mempermudah pengelolaan buku, peminjaman, reservasi, dan denda. Dengan antarmuka yang minimalis dan responsif, aplikasi ini memberikan pengalaman pengguna yang nyaman dan efisien.

## ✨ Fitur Utama

- **Authentication**: Sistem login dan manajemen pengguna.
- **Catalog**: Menampilkan daftar buku dengan pencarian dan filter kategori.
- **Borrowing**: Meminjam buku secara langsung.
- **Reservation**: Reservasi buku yang sedang tidak tersedia.
- **Fine Management**: Mengelola denda keterlambatan.
- **Digital Book**: Membaca dan mengunduh e-book.
- **Responsive Design**: Antarmuka yang optimal di berbagai perangkat.

## 🛠️ Tech Stack

- **Backend**: Laravel 12
- **Frontend**: React + Inertia.js
- **Styling**: TailwindCSS
- **Database**: MySQL
- **Other Tools**: Vite, PestPHP

## 🚀 Instalasi

Ikuti langkah-langkah berikut untuk menjalankan proyek ini secara lokal:

1. **Clone repository**
    ```bash
    git clone https://github.com/rifqynrwndi/web-perpus-gunpat.git
    cd web-perpus-gunpat
    ```

2. **Install dependencies**
    ```bash
    composer install
    npm install
    ```

3. **Copy konfigurasi**
    ```bash
    cp .env.example .env
    ```

4. **Generate app key**
    ```bash
    php artisan key:generate
    ```

5. **Setup database**
    - Buat database baru di MySQL.
    - Update konfigurasi database di file `.env`.

6. **Import Database SQL**
    - Import `books.sql` ke Tabel `books`

7. **Run migrations dan seeder**
    ```bash
    php artisan migrate --seed
    ```

8. **Build assets**
    ```bash
    npm run build
    ```

9. **Run Storage link**
    ```bash
    php artisan storage:link
    ```

10. **Jalankan server**
    ```bash
    php artisan serve
    npm run dev
    ```

Akses aplikasi di [http://localhost:8000](http://localhost:8000).

## 📂 Struktur Folder

```
web-perpus-gunpat/
├── app/                # Backend logic (Controllers, Models, etc.)
├── resources/
│   ├── js/            # Frontend (React components)
│   ├── views/         # Blade templates
│   └── css/           # TailwindCSS styles
├── database/          # Migrations dan seeders
├── public/            # Public assets
├── routes/            # API dan web routes
├── tests/             # Unit dan feature tests
└── ...
```

## 🤝 Kontribusi

Kami menyambut kontribusi dari siapa pun! Ikuti langkah berikut untuk berkontribusi:

1. Fork repository ini.
2. Buat branch baru untuk fitur atau perbaikan Anda.
3. Lakukan perubahan dan commit.
4. Kirim pull request.

## 📜 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

Dibuat dengan ❤️ oleh [rifqynrwndi](https://github.com/rifqynrwndi).
