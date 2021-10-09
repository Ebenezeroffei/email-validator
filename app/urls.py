from django.urls import path
from . import views as app_views
from django.contrib.auth.views import LogoutView

app_name = 'app'
urlpatterns = [
    path('',app_views.EmailsListView.as_view(),name = 'home'),
    path('signin/',app_views.SignInAdminView.as_view(),name = 'signin_admin'),
    path('add/email/',app_views.AddEmailView.as_view(),name = 'add_email'),
    path('logout/',LogoutView.as_view(),name = 'logout')
]