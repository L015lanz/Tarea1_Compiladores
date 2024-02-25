from django.urls import path
from . import views

app_name='patrones'

urlpatterns = [
    path('',views.cargarArchivo, name='cargarArchivo'),
    path('resultados/<str:nombre>',views.mostrarResultados, name='resultados'),
    path('lista-archivos',views.lista_archivos, name='listaArchivos'),

]