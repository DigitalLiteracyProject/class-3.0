from django.contrib import admin
from django.contrib.auth.hashers import make_password
from django.contrib.auth import password_validation
from django.contrib.auth.models import Group
from django import forms

from .models import User, Classroom, Student


class UserAdminForm(forms.ModelForm):
    password = forms.CharField(label='Change password to...',
                               max_length=200,
                               widget=forms.PasswordInput(),
                               required=False)

    class Meta:
        model = User
        fields = ['email', 'name', 'is_active', 'is_admin']

    def clean(self):
        new_password = self.cleaned_data.pop('password', None)
        if new_password:
            password_validation.validate_password(new_password)
            self.cleaned_data['password'] = make_password(new_password)
        return self.cleaned_data


class UserAdmin(admin.ModelAdmin):
    form = UserAdminForm

admin.site.unregister(Group)
admin.site.register(User, UserAdmin)
admin.site.register(Classroom)
admin.site.register(Student)
