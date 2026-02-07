# Authentication Token App

Bu proje, React Native ve Expo kullanılarak geliştirilmiş, token tabanlı kimlik doğrulama (authentication) işlemlerini yöneten kapsamlı bir mobil uygulamadır. Kullanıcı kayıt, giriş, otomatik oturum açma ve güvenli çıkış işlemlerini **Context API** ve **AsyncStorage** kullanarak gerçekleştirir. Backend servisi olarak Firebase Authentication REST API kullanılmıştır.

## 🚀 Özellikler

- **Kullanıcı Kaydı (Sign Up):** Yeni kullanıcılar e-posta ve şifre ile sisteme kayıt olabilir.
- **Kullanıcı Girişi (Login):** Kayıtlı kullanıcılar hesaplarına giriş yapabilir ve bir kimlik doğrulama token'ı (auth token) alırlar.
- **Otomatik Giriş (Auto Login):** Kullanıcı uygulamayı kapatsa bile, token cihaz hafızasında (AsyncStorage) saklandığı için tekrar açtığında otomatik olarak giriş yapmış sayılır.
- **Güvenli Çıkış (Logout):** Kullanıcı çıkış yaptığında token cihazdan silinir ve giriş ekranına yönlendirilir.
- **Korumalı Rotalar (Protected Routes):** Giriş yapmamış kullanıcılar sadece giriş/kayıt ekranlarını görürken, giriş yapmış kullanıcılar ana sayfaya erişebilir.
- **Hata Yönetimi:** Yanlış şifre veya kayıtlı olmayan e-posta gibi durumlarda kullanıcıya uygun uyarılar gösterilir.
- **Yükleniyor Durumu:** İşlemler sırasında kullanıcıya loading indikatörü gösterilir.

## 🛠 Kullanılan Teknolojiler

- **React Native & Expo:** Mobil uygulama geliştirme platformu.
- **React Navigation (Native Stack):** Sayfalar arası geçiş ve navigasyon yönetimi.
- **Context API:** Uygulama genelinde kimlik doğrulama durumunu (state) yönetmek için.
- **AsyncStorage:** Token'ı cihazda kalıcı olarak saklamak için.
- **Axios:** HTTP istekleri (Firebase API ile iletişim) için.
- **Firebase Authentication:** Backend kimlik doğrulama servisi olarak.

## 📂 Proje Yapısı

```
Authentication-Token-App/
├── assets/             # Görsel ve statik dosyalar
├── components/         # Tekrar kullanılabilir UI bileşenleri (AuthForm, Loading vb.)
├── screens/            # Uygulama ekranları (Login, Signup, Home)
├── store/              # Context API ve durum yönetimi (authContext.js)
├── util/               # Yardımcı fonksiyonlar ve API istekleri (auth.js)
├── App.js              # Ana uygulama dosyası ve navigasyon yapılandırması
└── package.json        # Bağımlılıklar ve scriptler
```

## kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1.  **Projeyi Klonlayın:**

    ```bash
    git clone <proje-url>
    cd Authentication-Token-App
    ```

2.  **Bağımlılıkları Yükleyin:**

    ```bash
    npm install
    ```

3.  **Uygulamayı Başlatın:**

    ```bash
    npx expo start
    ```

4.  **Uygulamayı Test Edin:**
    - Terminalde çıkan QR kodu Expo Go uygulaması (Android/iOS) ile taratın.
    - Veya `a` tuşuna basarak Android emülatörde, `i` tuşuna basarak iOS simülatörde çalıştırın.

## 🔑 Önemli Kod Bölümleri

### Auth Context (`store/authContext.js`)

Uygulamanın kalbi burasıdır. Token durumu burada tutulur ve `AsyncStorage` ile senkronize edilir.

- `authenticate(token)`: Token'ı state'e ve hafızaya kaydeder.
- `logout()`: Token'ı siler ve oturumu kapatır.

### Navigasyon (`App.js`)

Kullanıcının giriş yapıp yapmadığına göre (`isAuthenticated`) farklı ekran yığınları (Stack) gösterilir:

- **NormalStack:** Login ve Signup ekranları.
- **AfterAuthenticatedStack:** Home ekranı.

### API İstekleri (`util/auth.js`)

Firebase Auth API'sine `axios` kullanarak istek atar. `API_KEY` burada tanımlıdır (Not: Prodüksiyon ortamında API anahtarlarını `.env` dosyasında saklamak daha güvenlidir).

## 📝 Notlar

- API Key `util/auth.js` dosyasında bulunmaktadır. Kendi Firebase projenizi kullanmak isterseniz bu anahtarı güncelleyebilirsiniz.
- Android emülatörde ağ isteklerinin çalışması için internet bağlantınızın olduğundan emin olun.
