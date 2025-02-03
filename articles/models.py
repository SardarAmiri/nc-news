from django.db import models
from django.contrib.auth.models import User
from topics.models import Topic

class Article(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="articles")
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name="articles")
    title = models.CharField(max_length=255)
    body = models.TextField()
    votes = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    article_img = models.ImageField(upload_to='images/%Y/%m/%d/') 

    def __str__(self):
        return self.title

