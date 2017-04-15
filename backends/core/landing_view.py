from django.http import HttpResponse
from django.template import loader


def landing_view(request):
    apps = [
        ('Django Admin', '/admin'),
        ('Student Draw', '/draw'),
        ('Reimbursements', '/reimburse'),
        ('Attendunce', '/attendunce'),
    ]

    template = loader.get_template('core/landing.html')

    return HttpResponse(template.render({
        'apps': apps
    }, request))
