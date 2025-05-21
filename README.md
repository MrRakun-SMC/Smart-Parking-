# Sistem Monitoring Parkir Otomatis

## Deskripsi Proyek

Sistem ini dirancang untuk mendeteksi secara otomatis status slot parkir menggunakan kamera dan menampilkan status secara real-time melalui dashboard web. Status ini juga dikirim ke cloud menggunakan layanan **ThingSpeak** agar bisa diakses secara online maupun lokal.

---

## Struktur File

- `deteksi_parkir.py`: Script Python utama untuk mendeteksi kondisi parkir menggunakan kamera, memperbarui file status lokal (`status_parkir.json`), dan mengirim data ke ThingSpeak.
- `index.html`: Halaman utama dashboard web untuk menampilkan status parkir.
- `script.js`: Script JavaScript yang mengambil data dari ThingSpeak dan memperbarui tampilan dashboard.
- `style.css`: File styling untuk memperindah tampilan dashboard.
- `status_parkir.json`: File lokal yang menyimpan status terkini slot parkir untuk versi lokal (non-online) agar update lokal lebih cepat.

---

## Library yang Digunakan

### Python (`deteksi_parkir.py`)
- `opencv-python` (cv2)
- `numpy`
- `requests`
- `datetime`
- `threading`
- `json`
- `os`
- `time`

### Frontend (`index.html`, `script.js`)
- HTML
- CSS
- JavaScript (tanpa framework)

---

## Konfigurasi ThingSpeak

Script Python dan JavaScript telah dikonfigurasi dengan API Key dan Channel ID. ThingSpeak digunakan untuk menyimpan data status secara online.

Data dikirim ke 6 field:
1. **Field 1**: Total slot terisi
2. **Field 2**: Total slot kosong
3. **Field 3**: Total mobil (dianggap sama dengan slot terisi)
4. **Field 4**: Status slot parkir 1 (0 = Kosong, 1 = Terisi)
5. **Field 5**: Status slot parkir 2
6. **Field 6**: Status slot parkir 3

---

## Cara Menjalankan Sistem

### 1. Menjalankan Deteksi Parkir (Python)
Pastikan kamera sudah terhubung ke komputer/server.

Install dependensi:
```
pip install opencv-python numpy requests
```

Jalankan script (pastikan semua file berada dalam 1 folder, dan path terminal sudah berada di folder tersebut):
```
python deteksi_parkir.py
```

Fungsi:
- Mendeteksi kondisi 3 slot parkir secara real-time.
- Menyimpan status ke file `status_parkir.json` untuk akses lokal cepat.
- Mengirim data ke ThingSpeak setiap beberapa detik.

---

### 2. Menjalankan Dashboard Web

Letakkan `index.html`, `script.js`, dan `style.css` dalam satu folder. Buka `index.html` di browser.

Dashboard akan memperbarui status parkir setiap 3 detik.

---

## Versi Web Online vs Versi Lokal

- **Versi Online**: 
  - Mengambil data dari ThingSpeak menggunakan JavaScript.
  - Cocok untuk akses publik atau jarak jauh.
  - Terdapat delay 5–15 detik karena pembaruan data cloud.

- **Versi Lokal**: 
  - Mengambil data langsung dari file `status_parkir.json`.
  - Lebih cepat, tanpa delay.
  - Tidak menabrak data ThingSpeak (aman untuk testing atau display lokal tanpa memengaruhi data publik).

---

## Fitur Utama

- Deteksi otomatis isi/kosong pada 3 slot parkir menggunakan kamera.
- Pengiriman data real-time ke cloud (ThingSpeak).
- Dashboard web (online dan lokal) dengan update status, statistik, dan waktu.
- Mode override (opsional) dari web admin.
- Kompatibel untuk sistem publik dan lokal.

---

## Catatan Tambahan

- Pastikan koneksi internet aktif jika menggunakan ThingSpeak.
- Tekan `q` pada jendela deteksi untuk keluar dari aplikasi Python.
- Tekan:
  - `c`: Untuk mengambil screenshot.
  - `r`: Untuk reset background subtractor.
  - `a/s`: Untuk penyesuaian sensitivitas deteksi.

---
