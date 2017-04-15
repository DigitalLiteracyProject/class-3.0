from rest_framework.authentication import SessionAuthentication


# Django Rest Framework authentication scheme returning 401 on missing auth
# (instead of SessionAuthentication's default of 403). We do this to distinguish
# between authentication failures (401) and permission failures (403)
class CustomSessionAuthentication(SessionAuthentication):
    def authenticate_header(self, request):
        return 'login'
