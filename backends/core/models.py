from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.db import models

# Custom user stuff adapted from
#   https://simpleisbetterthancomplex.com/tutorial/2016/07/22/how-to-extend-django-user-model.html


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra):
        if not email:
            raise ValueError('email must be set')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra):
        extra.setdefault('is_admin', False)
        return self._create_user(email, password, **extra)

    def create_superuser(self, email, password, **extra):
        extra['is_admin'] = True
        return self._create_user(email, password, **extra)


class User(AbstractBaseUser):
    email = models.EmailField('email', unique=True)
    name = models.CharField('name', max_length=60)
    is_active = models.BooleanField('active', default=True)
    is_admin = models.BooleanField('admin', default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    @property
    def is_superuser(self):
        return self.is_admin and self.is_active

    @property
    def is_staff(self):
        return self.is_superuser

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser


class Classroom(models.Model):
    teacher = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField()

    def __str__(self):
        return "Classroom[{}]: (t: {}) {}".format(self.id, self.teacher.id, self.description)


class Student(models.Model):
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return "Student[{}]: (c: {}) {}".format(self.id, self.classroom.id, self.name)
