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
npm --prefix frontend install
```

Prepare the backend:

```bash
python3 -m pip install -r backend/requirements.txt
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

## Vercel deployment

The project is configured for one Vercel project with two production domains:

- Frontend: `sayakat.deo-core.codes`
- Backend/API/Admin: `sayakat.backend.deo-core.codes`

Use these Vercel settings:

- Framework preset: Other
- Install command: `npm --prefix frontend ci && pip install -r backend/requirements.txt`
- Build command: `npm --prefix frontend run build && python backend/manage.py migrate --noinput && python backend/manage.py collectstatic --noinput`
- Output directory: `frontend/dist`

Add both domains in Vercel project settings. If DNS is managed outside Vercel, point each hostname to Vercel using the DNS records Vercel shows after adding the domains.

Recommended production environment variables:

```bash
DJANGO_SECRET_KEY=<strong-random-secret>
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=sayakat.backend.deo-core.codes,.vercel.app
DJANGO_CORS_ALLOWED_ORIGINS=https://sayakat.deo-core.codes
DJANGO_CSRF_TRUSTED_ORIGINS=https://sayakat.deo-core.codes,https://sayakat.backend.deo-core.codes
FRONTEND_URL=https://sayakat.deo-core.codes
```

If the production backend must keep bookings and admin edits, add an external database and set:

```bash
DATABASE_URL=<postgres-or-other-database-url>
```
