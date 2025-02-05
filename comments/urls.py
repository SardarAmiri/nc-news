from django.urls import path
from . import views

urlpatterns = [
    path('delete/<int:comment_id>/', views.delete_comment, name='delete_comment'),
    path('vote/<int:comment_id>/<str:vote_type>/', views.vote_comment, name='vote_comment'),
]