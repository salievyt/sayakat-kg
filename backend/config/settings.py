import os
from pathlib import Path

import dj_database_url

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "dev-only-change-before-production")
DEBUG = os.environ.get("DJANGO_DEBUG", "False").lower() in {"1", "true", "yes", "on"}
ALLOWED_HOSTS = [
    host.strip()
    for host in os.environ.get(
        "DJANGO_ALLOWED_HOSTS",
        "localhost,127.0.0.1,sayakat.backend.deo-core.codes,.vercel.app",
    ).split(",")
    if host.strip()
]

INSTALLED_APPS = [
    "jazzmin",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "rest_framework",
    "marketplace",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"
TEMPLATES = [{
    "BACKEND": "django.template.backends.django.DjangoTemplates",
    "DIRS": [],
    "APP_DIRS": True,
    "OPTIONS": {"context_processors": [
        "django.template.context_processors.request",
        "django.contrib.auth.context_processors.auth",
        "django.contrib.messages.context_processors.messages",
    ]},
}]
WSGI_APPLICATION = "config.wsgi.application"

DATABASES = {
    "default": dj_database_url.config(
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
        conn_max_age=600,
    )
}
AUTH_PASSWORD_VALIDATORS = []
LANGUAGE_CODE = "ru-ru"
TIME_ZONE = "Asia/Bishkek"
USE_I18N = True
USE_TZ = True
STATIC_URL = "static/"
STATICFILES_DIRS = [BASE_DIR / "static"]
STATIC_ROOT = BASE_DIR / "staticfiles"
STORAGES = {
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedStaticFilesStorage",
    },
}
MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
CORS_ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.environ.get(
        "DJANGO_CORS_ALLOWED_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173,https://sayakat.deo-core.codes",
    ).split(",")
    if origin.strip()
]
CSRF_TRUSTED_ORIGINS = [
    origin.strip()
    for origin in os.environ.get(
        "DJANGO_CSRF_TRUSTED_ORIGINS",
        "https://sayakat.deo-core.codes,https://sayakat.backend.deo-core.codes",
    ).split(",")
    if origin.strip()
]
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.AllowAny"],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 12,
}

JAZZMIN_SETTINGS = {
    "site_title": "Sayakat Admin",
    "site_header": "Sayakat.kg",
    "site_brand": "Sayakat.kg",
    "site_logo": "img/sayakat-admin.svg",
    "login_logo": "img/sayakat-admin.svg",
    "welcome_sign": "Управление путешествиями",
    "copyright": "Sayakat.kg",
    "search_model": ["marketplace.Tour", "marketplace.Booking"],
    "topmenu_links": [
        {"name": "Сайт", "url": os.environ.get("FRONTEND_URL", "http://localhost:5173"), "new_window": True},
        {"model": "marketplace.Booking"},
    ],
    "icons": {
        "marketplace": "fas fa-route",
        "marketplace.destination": "fas fa-map-marked-alt",
        "marketplace.operator": "fas fa-user-check",
        "marketplace.tour": "fas fa-hiking",
        "marketplace.departure": "fas fa-calendar-alt",
        "marketplace.booking": "fas fa-ticket-alt",
        "marketplace.sitecontent": "fas fa-pen-nib",
        "marketplace.galleryslide": "fas fa-images",
    },
    "show_ui_builder": False,
    "changeform_format": "horizontal_tabs",
    "custom_css": "css/sayakat-admin.css",
}

JAZZMIN_UI_TWEAKS = {
    "theme": "flatly",
    "dark_mode_theme": None,
    "navbar": "navbar-white navbar-light",
    "accent": "accent-primary",
    "sidebar": "sidebar-light-primary",
    "sidebar_nav_child_indent": True,
    "sidebar_disable_expand": False,
    "brand_colour": "navbar-white",
    "button_classes": {
        "primary": "btn-primary",
        "secondary": "btn-outline-secondary",
        "info": "btn-info",
        "warning": "btn-warning",
        "danger": "btn-danger",
        "success": "btn-success",
    },
}
