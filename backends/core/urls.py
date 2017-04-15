from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from .landing_view import landing_view
from .login_views import openid_login_view, openid_callback_view
from . import views

urlpatterns = format_suffix_patterns([
    url(r'^login/$', openid_login_view),
    url(r'^login/openid_callback$', openid_callback_view),
    url(r'^api/users$', views.UserList.as_view()),
    url(r'^api/users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
    url(r'^api/classrooms/$', views.ClassroomList.as_view()),
    url(r'^api/classrooms/(?P<pk>[0-9]+)/$', views.ClassroomDetail.as_view()),
    url(r'^api/classrooms/(?P<classroom_id>[0-9]+)/students/$', views.StudentListForClassroom.as_view()),
    url(r'^api/students/(?P<pk>[0-9]+)/$', views.StudentDetail.as_view()),
    url(r'^$', landing_view),
])
