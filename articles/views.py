from django.shortcuts import render
from django.db.models import Count
from .models import Article 
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator

# Create your views here.
def index(request):
    articles = Article.objects.annotate(comment_count=Count('comments')).order_by('-created_at')
    paginator = Paginator(articles, 6)
    page_number = request.GET.get('page')
    page_list = paginator.get_page(page_number) 
    context = {
        'articles': page_list,
    }
    return render(request, 'articles/articles.html', context)

def article(request, article_id):
    return render(request, 'articles/article.html')
