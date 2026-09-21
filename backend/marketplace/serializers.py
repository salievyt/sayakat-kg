from django.db import transaction
from rest_framework import serializers
from .models import Booking, Departure, Destination, GallerySlide, Operator, SiteContent, Tour


class DestinationSerializer(serializers.ModelSerializer):
    tours_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Destination
        fields = ["id", "name", "slug", "region", "description", "best_season", "image", "tours_count"]


class OperatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operator
        fields = ["id", "name", "city", "verified", "rating", "response_rate"]


class DepartureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departure
        fields = ["id", "starts_at", "seats_available", "instant_booking"]


class TourSerializer(serializers.ModelSerializer):
    destination = DestinationSerializer(read_only=True)
    operator = OperatorSerializer(read_only=True)
    departures = DepartureSerializer(many=True, read_only=True)
    difficulty_label = serializers.CharField(source="get_difficulty_display", read_only=True)

    class Meta:
        model = Tour
        fields = ["id", "title", "slug", "destination", "operator", "summary", "duration_days", "difficulty", "difficulty_label", "group_size", "price", "rating", "reviews_count", "image", "featured", "departures"]


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ["id", "departure", "full_name", "email", "phone", "guests", "total_price", "status", "created_at"]
        read_only_fields = ["total_price", "status", "created_at"]

    def validate(self, attrs):
        if attrs["guests"] > attrs["departure"].seats_available:
            raise serializers.ValidationError({"guests": "Недостаточно свободных мест."})
        return attrs

    @transaction.atomic
    def create(self, validated_data):
        departure = Departure.objects.select_for_update().get(pk=validated_data["departure"].pk)
        guests = validated_data["guests"]
        if guests > departure.seats_available:
            raise serializers.ValidationError({"guests": "Свободные места только что закончились."})
        departure.seats_available -= guests
        departure.save(update_fields=["seats_available"])
        validated_data["departure"] = departure
        return super().create(validated_data)


class GallerySlideSerializer(serializers.ModelSerializer):
    image_src = serializers.SerializerMethodField()

    class Meta:
        model = GallerySlide
        fields = ["id", "title", "subtitle", "image_src", "order"]

    def get_image_src(self, obj):
        if obj.image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return obj.image_url


class SiteContentSerializer(serializers.ModelSerializer):
    gallery = serializers.SerializerMethodField()

    class Meta:
        model = SiteContent
        fields = ["hero_eyebrow", "hero_title", "hero_subtitle", "hero_image", "intro_label", "intro_title", "intro_text", "gallery_label", "gallery_title", "trips_label", "trips_title", "promise_label", "promise_title", "places_label", "places_title", "partner_title", "partner_text", "gallery", "updated_at"]

    def get_gallery(self, obj):
        slides = GallerySlide.objects.filter(active=True)
        return GallerySlideSerializer(slides, many=True, context=self.context).data
