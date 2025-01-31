from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('table/', views.tax_checking, name='table'),
    path('sss/', views.sss, name='sss'),
    path('sample/', views.sample, name='sample'),
]