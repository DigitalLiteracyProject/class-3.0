from django.conf.urls import url

from core.index_view import index_for

urlpatterns = [
    url(r'^$', index_for('reimburse'), name='index'),
]
