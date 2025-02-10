from django.db import models
from django.contrib.auth.models import User
from articles.models import Article

class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name="comments")
    body = models.TextField()
    votes = models.IntegerField(default=0)
    voted_by = models.ManyToManyField(User, related_name='voted_comments', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.author.username} on {self.article.title}"
    
    class Meta:
        ordering = ['-created_at']

