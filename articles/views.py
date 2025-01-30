from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'articles/articles.html')

def article(request):
    return render(request, 'articles/article.html')
