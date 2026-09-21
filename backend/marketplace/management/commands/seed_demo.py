from datetime import date, timedelta
from django.core.management.base import BaseCommand
from django.utils.text import slugify
from marketplace.models import Departure, Destination, Operator, Tour


class Command(BaseCommand):
    help = "Создаёт демо-данные Sayakat"

    def handle(self, *args, **options):
        operator, _ = Operator.objects.get_or_create(name="Nomad Trails", defaults={"city": "Бишкек", "verified": True, "rating": 4.9, "response_rate": 98})
        data = [
            ("Сон-Куль", "Нарынская область", "Июнь — сентябрь", "Конный маршрут к озеру Сон-Куль", 3, "medium", 18500, 4.9, 38),
            ("Ала-Арча", "Чуйская область", "Апрель — октябрь", "Ущелье Ала-Арча с местным гидом", 1, "easy", 3900, 4.8, 64),
            ("Каракол", "Иссык-Кульская область", "Круглый год", "Каньоны и горные озёра Каракола", 5, "medium", 46000, 5.0, 21),
        ]
        for index, (name, region, season, title, days, difficulty, price, rating, reviews) in enumerate(data):
            destination, _ = Destination.objects.get_or_create(name=name, defaults={"slug": slugify(name, allow_unicode=True), "region": region, "best_season": season, "is_featured": True})
            tour, _ = Tour.objects.get_or_create(title=title, defaults={"slug": slugify(title, allow_unicode=True), "destination": destination, "operator": operator, "summary": "Небольшая группа, местный гид и маршрут с понятной программой без скрытых доплат.", "duration_days": days, "difficulty": difficulty, "group_size": 8, "price": price, "rating": rating, "reviews_count": reviews, "featured": True})
            Departure.objects.get_or_create(tour=tour, starts_at=date.today() + timedelta(days=7 + index * 5), defaults={"seats_total": 8, "seats_available": 4 + index, "instant_booking": index == 2})
        self.stdout.write(self.style.SUCCESS("Демо-данные созданы"))
