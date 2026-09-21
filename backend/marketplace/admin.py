from django.contrib import admin
from .models import Booking, Departure, Destination, GallerySlide, Operator, SiteContent, Tour


class DepartureInline(admin.TabularInline):
    model = Departure
    extra = 1


@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ["name", "region", "best_season", "is_featured"]
    list_filter = ["is_featured", "region"]
    search_fields = ["name", "region"]
    prepopulated_fields = {"slug": ["name"]}


@admin.register(Operator)
class OperatorAdmin(admin.ModelAdmin):
    list_display = ["name", "city", "verified", "rating", "response_rate"]
    list_filter = ["verified", "city"]
    search_fields = ["name"]


@admin.register(Tour)
class TourAdmin(admin.ModelAdmin):
    list_display = ["title", "destination", "operator", "price", "rating", "featured", "active"]
    list_filter = ["active", "featured", "difficulty", "destination"]
    search_fields = ["title", "summary"]
    prepopulated_fields = {"slug": ["title"]}
    inlines = [DepartureInline]


@admin.register(Departure)
class DepartureAdmin(admin.ModelAdmin):
    list_display = ["tour", "starts_at", "seats_available", "seats_total", "instant_booking"]
    list_filter = ["starts_at", "instant_booking"]


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ["id", "full_name", "departure", "guests", "total_price", "status", "created_at"]
    list_filter = ["status", "created_at"]
    search_fields = ["full_name", "email", "phone"]
    readonly_fields = ["total_price", "created_at"]


@admin.register(SiteContent)
class SiteContentAdmin(admin.ModelAdmin):
    fieldsets = [
        ("Первый экран", {"fields": ["hero_eyebrow", "hero_title", "hero_subtitle", "hero_image"]}),
        ("О проекте", {"fields": ["intro_label", "intro_title", "intro_text"]}),
        ("Карусель", {"fields": ["gallery_label", "gallery_title"]}),
        ("Каталог", {"fields": ["trips_label", "trips_title"]}),
        ("Преимущества", {"fields": ["promise_label", "promise_title"]}),
        ("Направления", {"fields": ["places_label", "places_title"]}),
        ("Партнёрам", {"fields": ["partner_title", "partner_text"]}),
    ]

    def has_add_permission(self, request):
        return not SiteContent.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(GallerySlide)
class GallerySlideAdmin(admin.ModelAdmin):
    list_display = ["title", "subtitle", "order", "active"]
    list_editable = ["order", "active"]
    search_fields = ["title", "subtitle"]
