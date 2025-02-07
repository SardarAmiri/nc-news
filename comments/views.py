from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, redirect
from .models import Comment
from articles.models import Article
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.utils import timezone


@require_POST
@login_required
def add_comment(request, article_id):
    print(request)
    article = get_object_or_404(Article, pk=article_id)
    body = request.POST.get('body', '').strip()
    if body:
        comment = Comment.objects.create(
            author=request.user,
            article=article,
            body=body,
            votes=0,
            created_at=timezone.now()
        )
        return JsonResponse({
            'success': True,
            'username': request.user.username,
            'body': comment.body,
            'created_at': comment.created_at.strftime("%d %b, %Y"),
            'votes': comment.votes,
            'id': comment.id,
            'is_author': True
        })
    return JsonResponse({'success': False, 'error': 'Empty comment'})

@require_POST
@login_required
def delete_comment(request, comment_id):
    comment = get_object_or_404(Comment, pk=comment_id)
    if comment.author == request.user:
        comment.delete()
        return JsonResponse({'success': True, 'id': comment_id})
    return JsonResponse({'success': False, 'error': 'Unauthorized'}, status=403)

@require_POST
@login_required
def vote_comment(request, comment_id):
    comment = get_object_or_404(Comment, pk=comment_id)
    vote_type = request.POST.get('vote_type')
    if vote_type == 'up':
        comment.votes += 1
    elif vote_type == 'down':
        comment.votes -= 1
    comment.save()
    return JsonResponse({'success': True, 'id': comment_id, 'votes': comment.votes})
