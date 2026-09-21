import os
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
BACKEND_DIR = BASE_DIR / "backend"

sys.path.insert(0, str(BACKEND_DIR))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

import django

django.setup()

try:
    from django.core.management import call_command

    call_command("migrate", interactive=False, no_input=True, verbosity=0)
except Exception as exc:
    import traceback

    traceback.print_exc()

from django.core.wsgi import get_wsgi_application

app = get_wsgi_application()
