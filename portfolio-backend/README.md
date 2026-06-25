# Portfolio Backend

## Setup

```bash
npm install

# .env file create karo (pehle se .env.example hai)
cp .env.example .env

npm run dev
# Runs on http://localhost:5000
```

## Test karo
Browser mein open karo: http://localhost:5000
Yeh dikhna chahiye: {"message":"Portfolio API Running ✓"}

## Admin register karo (pehli baar)
POST http://localhost:5000/api/admin/register
Body: { "email": "admin@email.com", "password": "yourpassword" }
