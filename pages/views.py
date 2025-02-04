from django.shortcuts import render
from django.http import HttpResponse
from articles.models import Article
from django.db.models import Count


# Create your views here.

def index(request):
    articles = Article.objects.annotate(comment_count=Count('comments')).order_by('-created_at')[:3]
    context = {
        "articles": articles
    }
    return render(request, "pages/index.html", context)
