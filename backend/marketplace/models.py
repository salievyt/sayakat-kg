from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class Destination(models.Model):
    name = models.CharField("Название", max_length=120)
    slug = models.SlugField("Slug", unique=True)
    region = models.CharField("Регион", max_length=120, blank=True)
    description = models.TextField("Описание", blank=True)
    best_season = models.CharField("Лучший сезон", max_length=120, blank=True)
    image = models.ImageField("Изображение", upload_to="destinations/", blank=True)
    is_featured = models.BooleanField("Показывать на главной", default=False)

    class Meta:
        verbose_name = "Направление"
        verbose_name_plural = "Направления"
        ordering = ["name"]

    def __str__(self):
        return self.name


class Operator(models.Model):
    name = models.CharField("Название", max_length=160)
    city = models.CharField("Город", max_length=100, default="Бишкек")
    description = models.TextField("О команде", blank=True)
    verified = models.BooleanField("Проверен", default=False)
    rating = models.DecimalField("Рейтинг", max_digits=2, decimal_places=1, default=5.0)
    response_rate = models.PositiveSmallIntegerField("Ответы вовремя, %", default=100)
    phone = models.CharField("Телефон", max_length=40, blank=True)

    class Meta:
        verbose_name = "Организатор"
        verbose_name_plural = "Организаторы"

    def __str__(self):
        return self.name


class Tour(models.Model):
    class Difficulty(models.TextChoices):
        EASY = "easy", "Лёгкий"
        MEDIUM = "medium", "Средний"
        HARD = "hard", "Сложный"

    title = models.CharField("Название", max_length=180)
    slug = models.SlugField("Slug", unique=True)
    destination = models.ForeignKey(Destination, verbose_name="Направление", on_delete=models.PROTECT, related_name="tours")
    operator = models.ForeignKey(Operator, verbose_name="Организатор", on_delete=models.PROTECT, related_name="tours")
    summary = models.TextField("Краткое описание")
    duration_days = models.PositiveSmallIntegerField("Дней", default=1)
    difficulty = models.CharField("Сложность", max_length=12, choices=Difficulty.choices, default=Difficulty.EASY)
    group_size = models.PositiveSmallIntegerField("Размер группы", default=8)
    price = models.PositiveIntegerField("Цена, сом")
    rating = models.DecimalField("Рейтинг", max_digits=2, decimal_places=1, default=5.0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    reviews_count = models.PositiveIntegerField("Количество отзывов", default=0)
    image = models.ImageField("Главное фото", upload_to="tours/", blank=True)
    featured = models.BooleanField("Показывать на главной", default=False)
    active = models.BooleanField("Опубликован", default=True)

    class Meta:
        verbose_name = "Тур"
        verbose_name_plural = "Туры"
        ordering = ["-featured", "title"]

    def __str__(self):
        return self.title


class Departure(models.Model):
    tour = models.ForeignKey(Tour, verbose_name="Тур", on_delete=models.CASCADE, related_name="departures")
    starts_at = models.DateField("Дата начала")
    seats_total = models.PositiveSmallIntegerField("Всего мест", default=8)
    seats_available = models.PositiveSmallIntegerField("Доступно мест", default=8)
    instant_booking = models.BooleanField("Мгновенная бронь", default=False)

    class Meta:
        verbose_name = "Выезд"
        verbose_name_plural = "Даты выездов"
        ordering = ["starts_at"]
        constraints = [models.UniqueConstraint(fields=["tour", "starts_at"], name="unique_tour_departure")]

    def __str__(self):
        return f"{self.tour} — {self.starts_at:%d.%m.%Y}"


class Booking(models.Model):
    class Status(models.TextChoices):
        NEW = "new", "Новая"
        CONFIRMED = "confirmed", "Подтверждена"
        CANCELLED = "cancelled", "Отменена"

    departure = models.ForeignKey(Departure, verbose_name="Выезд", on_delete=models.PROTECT, related_name="bookings")
    full_name = models.CharField("Имя гостя", max_length=160)
    email = models.EmailField("Email")
    phone = models.CharField("Телефон", max_length=40)
    guests = models.PositiveSmallIntegerField("Гостей", default=1)
    total_price = models.PositiveIntegerField("Сумма, сом", editable=False, default=0)
    status = models.CharField("Статус", max_length=16, choices=Status.choices, default=Status.NEW)
    created_at = models.DateTimeField("Создано", auto_now_add=True)

    class Meta:
        verbose_name = "Бронирование"
        verbose_name_plural = "Бронирования"
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        self.total_price = self.departure.tour.price * self.guests
        super().save(*args, **kwargs)

    def __str__(self):
        return f"#{self.pk or 'new'} {self.full_name}"


class SiteContent(models.Model):
    hero_eyebrow = models.CharField("Надпись над заголовком", max_length=120, default="Путешествия по Кыргызстану")
    hero_title = models.CharField("Главный заголовок", max_length=180, default="Страна, которую стоит прожить.")
    hero_subtitle = models.CharField("Подзаголовок", max_length=220, default="Маршруты от тех, кто знает каждую дорогу.")
    hero_image = models.ImageField("Фоновое фото", upload_to="site/", blank=True)
    intro_label = models.CharField("Метка блока о нас", max_length=80, default="01 / О нас")
    intro_title = models.CharField("Заголовок блока о нас", max_length=220, default="Мы собираем настоящий Кыргызстан в одном месте.")
    intro_text = models.TextField("Текст блока о нас", default="Не каталог безликих экскурсий, а путешествия с характером: небольшие группы, местные проводники и понятное бронирование без переписок в мессенджерах.")
    gallery_label = models.CharField("Метка галереи", max_length=100, default="Моменты путешествия")
    gallery_title = models.CharField("Заголовок галереи", max_length=180, default="Кыргызстан в кадре")
    trips_label = models.CharField("Метка туров", max_length=100, default="02 / Ближайшие поездки")
    trips_title = models.CharField("Заголовок туров", max_length=180, default="Выберите свой темп")
    promise_label = models.CharField("Метка преимуществ", max_length=100, default="03 / Почему мы")
    promise_title = models.CharField("Заголовок преимуществ", max_length=220, default="Всё важное известно до начала пути.")
    places_label = models.CharField("Метка направлений", max_length=100, default="04 / Куда поехать")
    places_title = models.CharField("Заголовок направлений", max_length=180, default="Четыре стороны страны")
    partner_title = models.CharField("Заголовок для партнёров", max_length=220, default="Вы создаёте маршрут. Мы приводим гостей.")
    partner_text = models.CharField("Текст для партнёров", max_length=220, default="Управляйте датами, местами и заявками в одном кабинете.")
    updated_at = models.DateTimeField("Обновлено", auto_now=True)

    class Meta:
        verbose_name = "Главная страница"
        verbose_name_plural = "Главная страница"

    def __str__(self):
        return "Контент главной страницы"

    def save(self, *args, **kwargs):
        if not self.pk and SiteContent.objects.exists():
            self.pk = SiteContent.objects.first().pk
        super().save(*args, **kwargs)


class GallerySlide(models.Model):
    title = models.CharField("Название", max_length=120)
    subtitle = models.CharField("Подпись", max_length=160, blank=True)
    image = models.ImageField("Изображение", upload_to="gallery/", blank=True)
    image_url = models.CharField("Путь к изображению", max_length=240, blank=True, help_text="Например /images/hero-song-kol.png. Используется, если файл не загружен.")
    order = models.PositiveSmallIntegerField("Порядок", default=0)
    active = models.BooleanField("Показывать", default=True)

    class Meta:
        verbose_name = "Слайд карусели"
        verbose_name_plural = "Слайды карусели"
        ordering = ["order", "id"]

    def __str__(self):
        return self.title
