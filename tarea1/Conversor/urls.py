from django.urls import path
from .views import menu, hexadecimal_view, binary_view, octal_view, decimal_view, bases_to_binary, bases_to_hexadecimal, bases_to_octal, bases_to_decimal

app_name='conversor'

urlpatterns = [
    path('menu', menu, name='menu'),
    path('hexadecimal', hexadecimal_view, name='hexadecimal'),
    path('binario', binary_view, name='binario'),
    path('octal', octal_view, name='octal'),
    path('decimal', decimal_view, name='decimal'),
    
    path('bases_to_binary/<str:number>/<str:type>', bases_to_binary, name='bases_to_binary'),
    path('bases_to_hexadecimal/<str:number>/<str:type>', bases_to_hexadecimal, name='bases_to_hexadecimal'),
    path('bases_to_octal/<str:number>/<str:type>', bases_to_octal, name='bases_to_octal'),
    path('bases_to_decimal/<str:number>/<str:type>', bases_to_decimal, name='bases_to_decimal'),
]