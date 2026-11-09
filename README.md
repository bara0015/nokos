# NokosStore — Website Jual Nokos (Siap Pakai)

Website lengkap jual nomor virtual dengan:

- ✅ User **wajib daftar + login**
- ✅ Sistem **saldo + top-up** via TemanQRIS (QRIS)
- ✅ Beli nomor → potong saldo → order ke **nokos.id**
- ✅ Halaman OTP update otomatis
- ✅ API Key diganti **hanya lewat file `.env`**

---

## Cara Pakai (Paling Sederhana)

### 1. Masuk folder

```bash
cd nokos-final
```

### 2. Copy environment

```bash
cp .env.example .env
```

### 3. Isi API Key kamu di `.env`

Buka file `.env` lalu ganti:

```env
NOKOS_API_KEY=isi_api_key_nokos_id_kamu
TEMANQRIS_API_KEY=isi_api_key_temanqris_kamu
TEMANQRIS_WEBHOOK_SECRET=isi_webhook_secret_temanqris
MARKUP_PERCENT=40
NEXTAUTH_SECRET=buat_string_random_panjang
```

> Ambil API Key nokos.id di: https://nokos.id/dashboard/api-keys  
> (wajib whitelist IP server kamu)

> Ambil API Key TemanQRIS di: https://temanqris.com

### 4. Install & Jalankan

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Buka: **http://localhost:3000**

---

## Alur User

1. Daftar / Login
2. Top-up saldo (bayar QRIS)
3. Setelah bayar → saldo otomatis bertambah
4. Pilih layanan → klik Beli
5. Saldo dipotong → nomor dipesan ke nokos.id
6. Lihat nomor + OTP di halaman order

---

## Deploy Production

1. Deploy ke Vercel / Railway / VPS
2. Ganti di `.env` (atau Environment Variables):

```env
NEXTAUTH_URL=https://domainkamu.com
TEMANQRIS_WEBHOOK_URL=https://domainkamu.com/api/webhooks/temanqris
NEXT_PUBLIC_APP_URL=https://domainkamu.com
```

3. **Whitelist IP** server di dashboard nokos.id

---

## File penting untuk ganti API Key

Semua key **hanya** diisi di file `.env`.  
Tidak perlu ubah kode.

| Key | Keterangan |
|-----|------------|
| `NOKOS_API_KEY` | API Key dari nokos.id |
| `TEMANQRIS_API_KEY` | API Key dari TemanQRIS |
| `TEMANQRIS_WEBHOOK_SECRET` | Secret webhook TemanQRIS |
| `MARKUP_PERCENT` | Markup harga jual (contoh 40) |

---

Selesai. Website siap dipakai.
