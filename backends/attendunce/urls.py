from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^attendunce/', views.attendunce, name='attendunce'),
]
