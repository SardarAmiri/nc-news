from django.db import models

class Topic(models.Model):
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField()

    def __str__(self):
        return self.slug

