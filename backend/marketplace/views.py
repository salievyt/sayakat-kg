from django.db.models import Count
from rest_framework import filters, generics, viewsets
from .models import Booking, Destination, SiteContent, Tour
from .serializers import BookingSerializer, DestinationSerializer, SiteContentSerializer, TourSerializer


class DestinationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = DestinationSerializer
    queryset = Destination.objects.annotate(tours_count=Count("tours")).all()


class TourViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TourSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "summary", "destination__name"]
    ordering_fields = ["price", "rating", "duration_days"]

    def get_queryset(self):
        queryset = Tour.objects.filter(active=True).select_related("destination", "operator").prefetch_related("departures")
        destination = self.request.query_params.get("destination")
        featured = self.request.query_params.get("featured")
        if destination:
            queryset = queryset.filter(destination__slug=destination)
        if featured in {"1", "true"}:
            queryset = queryset.filter(featured=True)
        return queryset


class BookingCreateView(generics.CreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer


class SiteContentView(generics.RetrieveAPIView):
    serializer_class = SiteContentSerializer

    def get_object(self):
        return SiteContent.objects.first() or SiteContent.objects.create()
