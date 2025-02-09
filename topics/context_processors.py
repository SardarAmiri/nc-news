from .models import Topic

def topics_processor(request):
    return {
        'topics': Topic.objects.all().order_by('slug')
    }