# Sayakat.kg

Marketplace for verified tours and travel experiences in Kyrgyzstan.

## Stack

- Frontend: React 19, Vite, Lucide icons
- Backend: Django 5.2, Django REST Framework
- Admin: Jazzmin with the Sayakat light theme
- Database: SQLite for local development

## Local development

Install frontend dependencies:

```bash
cd frontend
npm install
```

Prepare the backend:

```bash
python3 -m pip install -r requirements.txt
python3 backend/manage.py migrate
python3 backend/manage.py seed_demo
```

Run the services in separate terminals:

```bash
npm run frontend
npm run backend
```

- Website: http://127.0.0.1:5173
- API: http://127.0.0.1:8000/api/
- Admin: http://127.0.0.1:8000/admin/

Create an admin account when needed:

```bash
python3 backend/manage.py createsuperuser
```
