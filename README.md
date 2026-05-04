# React + Supabase + Trivia API

Nowoczesna aplikacja typu Quiz stworzona w **React**, zintegrowana z bazą danych **Supabase**. Projekt obejmuje system autoryzacji, dynamiczne pobieranie pytań oraz globalny ranking użytkowników.

## 🚀 Funkcje

- **Autoryzacja użytkowników**: Logowanie i rejestracja poprzez Supabase Auth.
- **Dynamiczny Quiz**: System losowania pytań i zliczania punktów.
- **Globalny Ranking**: Tabela liderów wyświetlająca wyniki wszystkich graczy.
- **Bezpieczeństwo (RLS)**: Zabezpieczona baza danych (Row Level Security), uniemożliwiająca manipulację wynikami innych użytkowników.
- **Responsive Design**: W pełni responsywny interfejs użytkownika.

## 🛠️ Technologie

- **Frontend**: React.js
- **Backend/Database**: Supabase (PostgreSQL)
- **API**: Trivia API

## 📦 Instalacja i konfiguracja

- **Sklonuj repozytorium**

```bash
git clone [https://github.com/specsxc/quiz_app.git](https://github.com/specsxc/quiz_app.git)
cd quiz_app
```

- **Zainstaluj zależności**

```bash
npm install
```

- **Skonfiguruj zmienne środowiskowe**

Utwórz plik .env w głównym katalogu i dodaj swoje klucze Supabase (tak jak w .env.example):

```bash
VITE_SUPABASE_URL=YOUR_PROJECT_URL
VITE_SUPABASE_ANON_KEY=YOUR_PUBLISHABLE_KEY
```

- **Uruchom aplikację**

```bash
npm run dev
```

## 🛠 Konfiguracja Supabase

- **Konfiguracja bazy danych (SQL Editor)**

Aplikacja wymaga określonych tabel i funkcji do przechowywania punktów oraz profili użytkowników.

1. Przejdź do swojego panelu sterowania (Dashboard) Supabase.

2. Z paska bocznego po lewej stronie wybierz SQL Editor.

3. Kliknij "New query".

4. Skopiuj całą zawartość pliku database.sql (znajdującego się w tym repozytorium).

5. Wklej ją do edytora i kliknij Run.

- **Wyłączenie potwierdzania e-mail**

Domyślnie Supabase wymaga od użytkowników potwierdzenia adresu e-mail przy rejestracji. Aby ułatwić testowanie w fazie deweloperskiej:

1. Przejdź do sekcji Authentication > Sign In / Providers > User Signups.

2. Znajdź przełącznik Confirm email i ustaw go w pozycji OFF.

3. Przewiń w dół i kliknij Save.
