from django.http import HttpResponse
from django.template import loader


def index_for(app_name):
    def index(request):
        template = loader.get_template('core/index.html')
        return HttpResponse(template.render({
            'bundle': app_name
        }, request))
    return index
