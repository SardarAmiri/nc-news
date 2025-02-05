from django.shortcuts import get_object_or_404 ,render, redirect
from django.db.models import Count
from .models import Article 
from comments.models import Comment
from django.core.paginator import Paginator


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

def article(request, article_id):
    article = get_object_or_404(Article.objects.annotate(comment_count=Count('comments')), pk=article_id)
    if request.method == 'POST':
        # Handle comment submission
        if 'body' in request.POST and request.user.is_authenticated:
            Comment.objects.create(
                author=request.user,
                article=article,
                body=request.POST['body']
            )
            return redirect('article', article_id=article_id)
    
    context = {'article': article}
    return render(request, 'articles/article.html', context)
