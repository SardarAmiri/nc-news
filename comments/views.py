from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, redirect
from .models import Comment

@login_required
def delete_comment(request, comment_id):
    comment = get_object_or_404(Comment, pk=comment_id)
    if comment.author == request.user:
        comment.delete()
    return redirect('article', article_id=comment.article.id)

@login_required
def vote_comment(request, comment_id, vote_type):
    comment = get_object_or_404(Comment, pk=comment_id)
    if vote_type == 'up':
        comment.votes += 1
    elif vote_type == 'down':
        comment.votes -= 1
    comment.save()
    return redirect('article', article_id=comment.article.id)
