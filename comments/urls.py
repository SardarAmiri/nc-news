from django.urls import path
from . import views

urlpatterns = [
    path('article/<int:article_id>/add-comment/', views.add_comment, name='add-comment'),
    path('<int:comment_id>/delete/', views.delete_comment, name='delete-comment'),
    path('<int:comment_id>/vote/', views.vote_comment, name='vote-comment'),
] 