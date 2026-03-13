import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

type PrismaError = {
  code: string;
  meta: {
    modelName?: string;
    driverAdapterError?: {
      name?: string;
      cause?: {
        originalCode?: string;
        originalMessage?: string;
        kind?: string;
        constraint?: {
          fields?: string[];
        };
      };
    };
  };
};

// AI generated response for Prisma error messages
const prismaKnownErrorMsg: Record<string, (err: PrismaError) => string> = {
  P2000: (err) => {
    const model = err.meta?.modelName ?? "data";
    return `Nilai yang diberikan terlalu panjang untuk salah satu kolom pada ${model}. Periksa kembali panjang data yang dikirim.`;
  },

  P2001: (err) => {
    const model = err.meta?.modelName ?? "data";
    return `Data ${model} yang dicari tidak ditemukan. Pastikan parameter pencarian benar.`;
  },

  P2002: (err) => {
    const field = err.meta?.driverAdapterError?.cause?.constraint?.fields?.join(", ") ?? "field";

    const model = err.meta?.modelName ?? "data";

    return `Nilai pada field '${field}' sudah digunakan pada ${model}. Gunakan nilai lain yang unik.`;
  },

  P2003: (err) => {
    const model = err.meta?.modelName ?? "data";
    return `Relasi data tidak valid pada ${model}. Pastikan data yang direferensikan sudah ada.`;
  },

  P2004: (err) => {
    const msg = err.meta?.driverAdapterError?.cause?.originalMessage;
    return `Operasi database gagal karena melanggar constraint. ${
      msg ?? "Periksa kembali data yang dikirim."
    }`;
  },

  P2005: (err) => {
    const msg = err.meta?.driverAdapterError?.cause?.originalMessage;
    return `Nilai yang tersimpan di database tidak sesuai dengan tipe field. ${msg ?? ""}`;
  },

  P2006: (err) => {
    const model = err.meta?.modelName ?? "data";
    return `Nilai yang diberikan tidak valid untuk salah satu field pada ${model}.`;
  },

  P2007: (err) => {
    const msg = err.meta?.driverAdapterError?.cause?.originalMessage;
    return `Terjadi kesalahan validasi data pada database. ${msg ?? ""}`;
  },

  P2008: () => `Query database tidak dapat diproses karena formatnya tidak valid.`,

  P2009: () => `Query database tidak valid. Periksa kembali parameter query.`,

  P2010: (err) => {
    const msg = err.meta?.driverAdapterError?.cause?.originalMessage;
    return `Eksekusi query database gagal. ${msg ?? ""}`;
  },

  P2011: () =>
    `Field yang wajib diisi menerima nilai null. Pastikan semua field wajib memiliki nilai.`,

  P2012: () =>
    `Terdapat nilai wajib yang tidak dikirim dalam request. Periksa kembali payload request.`,

  P2013: () => `Argumen yang diperlukan tidak diberikan dalam query database.`,

  P2014: () => `Operasi ini melanggar relasi yang wajib antara dua model.`,

  P2015: () => `Data relasi yang dibutuhkan tidak ditemukan di database.`,

  P2016: () => `Terjadi kesalahan saat menginterpretasi query database.`,

  P2017: () => `Relasi antara dua data tidak terhubung.`,

  P2018: () => `Data relasi yang diperlukan tidak ditemukan.`,

  P2019: () => `Terjadi kesalahan pada input yang diberikan.`,

  P2020: () => `Nilai yang diberikan berada di luar jangkauan tipe data.`,

  P2021: () => `Tabel yang diminta tidak ditemukan di database.`,

  P2022: () => `Kolom yang diminta tidak ditemukan di database.`,

  P2023: () => `Data kolom pada database tidak konsisten.`,

  P2024: () => `Database membutuhkan waktu terlalu lama untuk memberikan koneksi.`,

  P2025: (err) => {
    const model = err.meta?.modelName ?? "data";
    return `Operasi gagal karena ${model} yang dibutuhkan tidak ditemukan.`;
  },

  P2026: () => `Fitur query yang digunakan tidak didukung oleh database saat ini.`,

  P2027: () => `Terjadi beberapa kesalahan pada database saat menjalankan query.`,

  P2028: () => `Terjadi kesalahan pada transaksi database.`,

  P2029: () => `Jumlah parameter query melebihi batas yang diperbolehkan.`,

  P2030: () => `Index fulltext yang dibutuhkan untuk pencarian tidak ditemukan.`,

  P2031: () => `MongoDB harus dijalankan sebagai replica set untuk mendukung transaksi.`,

  P2033: () => `Nilai angka terlalu besar untuk tipe integer yang digunakan.`,

  P2034: () => `Transaksi gagal karena konflik penulisan atau deadlock. Silakan coba lagi.`,

  P2035: () => `Terjadi pelanggaran assertion pada database.`,

  P2036: () => `Terjadi kesalahan pada konektor eksternal database.`,

  P2037: () => `Jumlah koneksi database yang dibuka melebihi batas.`,
};

// AI generated mapping of Prisma error codes to HTTP status codes
const prismaHttpStatus: Record<string, number> = {
  P2000: 400,
  P2001: 404,
  P2002: 409,
  P2003: 409,
  P2004: 400,
  P2005: 400,
  P2006: 400,
  P2007: 400,
  P2008: 400,
  P2009: 400,
  P2010: 400,
  P2011: 400,
  P2012: 400,
  P2013: 400,
  P2014: 409,
  P2015: 404,
  P2016: 400,
  P2017: 409,
  P2018: 404,
  P2019: 400,
  P2020: 400,
  P2021: 500,
  P2022: 500,
  P2023: 500,
  P2024: 503,
  P2025: 404,
  P2026: 400,
  P2027: 500,
  P2028: 500,
  P2029: 400,
  P2030: 500,
  P2031: 500,
  P2033: 400,
  P2034: 409,
  P2035: 500,
  P2036: 500,
  P2037: 503,
};

export { prisma, prismaKnownErrorMsg, prismaHttpStatus, PrismaError };
