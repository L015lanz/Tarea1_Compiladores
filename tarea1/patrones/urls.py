from django.urls import path
from . import views

urlpatterns = [
    path('',views.cargarArchivo, name='cargarArchivo'),
    path('resultados/<str:nombre>',views.mostrarResultados, name='resultados'),
    path('lista-archivos',views.lista_archivos, name='listaArchivos'),

]