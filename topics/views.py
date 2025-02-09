from django.shortcuts import render, get_object_or_404
from .models import Topic


def topic_articles(request, slug):
    topic = get_object_or_404(Topic, slug=slug)
    articles = topic.articles.all().order_by('-created_at')
    return render(request, 'topics/topic_articles.html', {
        'topic': topic,
        'articles': articles
    })

