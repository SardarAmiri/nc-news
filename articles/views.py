from django.shortcuts import get_object_or_404 ,render, redirect
from django.db.models import Count
from .models import Article 
from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required



# Create your views here.
def index(request):
    articles = Article.objects.annotate(comment_count=Count('comments')).order_by('-created_at')
    paginator = Paginator(articles, 3)
    page_number = request.GET.get('page')
    page_list = paginator.get_page(page_number) 
    context = {
        'articles': page_list,
    }
    return render(request, 'articles/articles.html', context)

@login_required
def article(request, article_id):
    article = get_object_or_404(Article.objects.annotate(comment_count=Count('comments')), pk=article_id)
    context = {'article': article}
    return render(request, 'articles/article.html', context)

