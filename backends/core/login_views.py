from django.shortcuts import redirect
from django.conf import settings
from django.middleware import csrf
from django.http import HttpResponseBadRequest, HttpResponseServerError, HttpResponseForbidden
from django.utils.crypto import get_random_string

from .models import User
from django.contrib.auth import login

import httplib2
import json
from oauth2client.client import OAuth2WebServerFlow

flow = OAuth2WebServerFlow(client_id=settings.GOOGLE_OPENID_CLIENT_ID,
                           client_secret=settings.GOOGLE_OPENID_CLIENT_SECRET,
                           # TODO: change this to an actual legit redirect_uri
                           redirect_uri='http://localhost:8000/core/login/openid_callback',
                           scope='openid email')


def _already_logged_in(next_url):
    if next_url and next_url.startswith("/"):
        return redirect(next_url)
    else:
        return redirect("/core/api/classrooms")


def openid_login_view(request):
    if request.user.is_authenticated:
        return _already_logged_in(request.GET.get('next', None))

    state_token = get_random_string(length=30)
    request.session['state_token'] = state_token
    auth_uri = flow.step1_get_authorize_url(state=state_token)
    return redirect(auth_uri)


def openid_callback_view(request):
    next_url = request.GET.get('next', None)
    if request.user.is_authenticated:
        return _already_logged_in(next_url)

    code = request.GET.get('code', None)
    state = request.GET.get('state', None)
    state_token = request.session['state_token']
    if not (code and state == state_token):
        return HttpResponseBadRequest('Invalid OAuth/OpenID callback request')

    credentials = flow.step2_exchange(code)
    client = httplib2.Http()
    credentials.authorize(client)
    (resp, raw_content) = client.request('https://www.googleapis.com/userinfo/v2/me', 'GET')
    if resp.status == 200:
        content = json.loads(raw_content)
        email = content.get('email', None)
        if not email:
            return HttpResponseServerError('Failed to get authentication details.')

        user = User.objects.get(email=email)
        if not user:
            return HttpResponseForbidden('You are not authorized to access DLP resources')

        login(request, user)
        return _already_logged_in(next_url)
