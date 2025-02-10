# from django.shortcuts import render, get_object_or_404
# from .models import Topic
# from django.db.models import Count


# def topic_articles(request, slug):
#     topic = get_object_or_404(Topic, slug=slug)
#     articles = topic.articles.annotate(comment_count=Count('comments')).order_by('-created_at')
#     return render(request, 'topics/topic_articles.html', {
#         'topic': topic,
#         'articles': articles
#     })

from django.shortcuts import render, get_object_or_404
from .models import Topic
from django.db.models import Count
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.template.loader import render_to_string

def topic_articles(request, slug):
    topic = get_object_or_404(Topic, slug=slug)
    sort = request.GET.get('sort', 'date')  # Get sort parameter
    page_number = request.GET.get('page', 1)
    
    # Base queryset
    articles = topic.articles.annotate(comment_count=Count('comments'))
    
    # Apply sorting
    if sort == 'date':
        articles = articles.order_by('-created_at')
    elif sort == 'comments':
        articles = articles.order_by('-comment_count')
    elif sort == 'votes':
        articles = articles.order_by('-votes')
    
    # Add pagination
    paginator = Paginator(articles, 3)
    page_list = paginator.get_page(page_number)

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        html = render_to_string('partials/_articles_list.html', {'articles': page_list, 'current_sort': sort, 'topic': topic})
        return JsonResponse({'html': html})
    
    context = {
        'topic': topic,
        'articles': page_list,
        'current_sort': sort  
    }
    return render(request, 'topics/topic_articles.html', context)