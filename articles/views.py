from django.shortcuts import render
from django.db.models import Count
from .models import Article 

# Create your views here.
def index(request):
    articles = Article.objects.annotate(comment_count=Count('comments'))
    context = {
        'articles': articles,
    }
    return render(request, 'articles/articles.html', context)

def article(request):
    return render(request, 'articles/article.html')
