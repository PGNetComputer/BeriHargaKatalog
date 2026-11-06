// Alamat web app Apps Script "Input Harga" (berakhiran /exec).
// File ini cukup diisi sekali. Saat index.html diperbarui, file ini tidak perlu diganti.
var API_URL = 'https://script.google.com/macros/s/AKfycbxELJE7Qyw7ecpHMhtmpEny7HJHt674S0vlnurSdeZruKPf7UA205xtVNOj4pUbUHMbEQ/exec';

// --- Notifikasi jam 21.00 (Firebase). Salin dari Firebase console:
// Setelan proyek (gerigi) -> Umum -> Aplikasi Anda -> Web -> "firebaseConfig"
var FIREBASE = {
  apiKey: 'AIzaSyCuM0gBtUEZcxT6AeiDD_AVydDuEI2ILUg',
  authDomain: 'dashboard-katalog.firebaseapp.com',
  projectId: 'dashboard-katalog',
  messagingSenderId: '793804538158',
  appId: '1:793804538158:web:9e7e7d7ae17784cac07abf'
};
// Setelan proyek -> Cloud Messaging -> Konfigurasi web -> Sertifikat push web -> "Pasangan kunci"
var VAPID_KEY = 'BG-boWYnWkCQqy5piyCr29FaWq5DfNAxY5Fc5bJm-nq0eA-jMY3x3SkdwaBLR9a_huDBGStOhKMUGzGTgjrZNPE';
