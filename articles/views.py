from django.shortcuts import get_object_or_404 ,render, redirect
from django.db.models import Count
from .models import Article 
from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.template.loader import render_to_string
from django.views.decorators.http import require_POST
from django.contrib import messages



# Create your views here.
def index(request):
    sort = request.GET.get('sort', 'date')
    
    articles = Article.objects.annotate(comment_count=Count('comments')).order_by('-created_at')

    if sort == 'date':
        articles = articles.order_by('-created_at')
    elif sort == 'comments':
        articles = articles.order_by('-comment_count')
    elif sort == 'votes':
        articles = articles.order_by('-votes')
    
    paginator = Paginator(articles, 6)
    page_number = request.GET.get('page', 1)
    page_list = paginator.get_page(page_number) 

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        html = render_to_string('partials/_articles_list.html', {'articles': page_list, 'current_sort': sort})
        return JsonResponse({'html': html})

    context = {
        'articles': page_list,
        'current_sort': sort
    }
    return render(request, 'articles/articles.html', context)


@login_required
def article(request, article_id):
    if not request.user.is_authenticated:
        messages.error(request, 'You need to login to view the article.')
        return redirect('login')
    article = get_object_or_404(Article.objects.annotate(comment_count=Count('comments')), pk=article_id)
    context = {'article': article}
    return render(request, 'articles/article.html', context)



@require_POST
@login_required
def vote_article(request, article_id):
    article = Article.objects.get(id=article_id)
    if article.voted_by.filter(id=request.user.id).exists():
        return JsonResponse({'error': 'You have already voted.'}, status=400)
    article.voted_by.add(request.user)
    article.votes += 1
    article.save()
    return JsonResponse({'votes': article.votes})

