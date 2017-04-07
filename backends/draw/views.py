from django.http import HttpResponse
from django.template import loader

def index(request, **kwargs):
    template = loader.get_template('draw/index.html')
    return HttpResponse(template.render({
        'bundle': 'draw',
        'classroom_id': kwargs.get('classroom_id')
    }, request))
