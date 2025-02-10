from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='articles'),
    path('<int:article_id>', views.article, name='article'),
    path('vote/<int:article_id>/', views.vote_article, name='vote_article'),
    
]