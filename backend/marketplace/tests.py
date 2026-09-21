from datetime import date
from django.test import TestCase
from rest_framework.test import APIClient
from .models import Booking, Departure, Destination, Operator, Tour


class BookingApiTests(TestCase):
    def setUp(self):
        destination = Destination.objects.create(name="Сон-Куль", slug="son-kol")
        operator = Operator.objects.create(name="Nomad Trails", verified=True)
        tour = Tour.objects.create(
            title="Конный тур",
            slug="horse-tour",
            destination=destination,
            operator=operator,
            summary="Маршрут",
            price=10000,
        )
        self.departure = Departure.objects.create(tour=tour, starts_at=date.today(), seats_total=4, seats_available=4)
        self.client = APIClient()

    def test_booking_calculates_total_and_reserves_seats(self):
        response = self.client.post("/api/bookings/", {
            "departure": self.departure.id,
            "full_name": "Айжан Тестова",
            "email": "aizhan@example.com",
            "phone": "+996555000000",
            "guests": 2,
        }, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["total_price"], 20000)
        self.departure.refresh_from_db()
        self.assertEqual(self.departure.seats_available, 2)
        self.assertEqual(Booking.objects.count(), 1)

    def test_booking_rejects_too_many_guests(self):
        response = self.client.post("/api/bookings/", {
            "departure": self.departure.id,
            "full_name": "Айжан Тестова",
            "email": "aizhan@example.com",
            "phone": "+996555000000",
            "guests": 5,
        }, format="json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(Booking.objects.count(), 0)
