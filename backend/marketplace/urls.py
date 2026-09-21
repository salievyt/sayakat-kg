from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import BookingCreateView, DestinationViewSet, SiteContentView, TourViewSet

router = DefaultRouter()
router.register("destinations", DestinationViewSet, basename="destination")
router.register("tours", TourViewSet, basename="tour")

urlpatterns = [
    path("", include(router.urls)),
    path("bookings/", BookingCreateView.as_view(), name="booking-create"),
    path("site-content/", SiteContentView.as_view(), name="site-content"),
]
