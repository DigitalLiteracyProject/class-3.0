from django.http import HttpResponse
from django.template import loader

def attendunce(request, **kwargs):
    template = loader.get_template('attendunce/index.html')
    return HttpResponse(template.render({
        'bundle': 'attendunce',
        'classroom_id': kwargs.get('classroom_id')
    }, request))
