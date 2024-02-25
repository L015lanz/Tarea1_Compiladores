import os
from django.shortcuts import render
from django.conf import settings
from django.core.files.storage import   FileSystemStorage
from django.shortcuts import redirect

from .analizador import analizador


def cargarArchivo(request):
    if request.method=='POST' and request.FILES['myfile']:
        myfile=request.FILES['myfile']
        fs=FileSystemStorage()
        file_name = myfile.name
        if fs.exists(file_name):
            # Si existe, elimina el archivo antes de guardar el nuevo
            fs.delete(file_name)
        filename = fs.save(file_name,myfile)
        file_path = fs.path(filename)
        print("La ruta del archivo subido en el servidor es:", file_path)
        return redirect(f'http://localhost:8000/patrones/resultados/{file_name}')
        
    analisis=False
    return render(request,'index.html',{'analisis':analisis, 'css':settings.STATIC_URL})




def mostrarResultados(request, nombre):
    if request.method=='POST' and request.FILES['myfile']:
        myfile=request.FILES['myfile']
        fs=FileSystemStorage()
        file_name = myfile.name
        if fs.exists(file_name):
            # Si existe, elimina el archivo antes de guardar el nuevo
            fs.delete(file_name)
        filename = fs.save(file_name,myfile)
        file_path = fs.path(filename)
        print("La ruta del archivo subido en el servidor es:", file_path)
        return redirect(f'http://localhost:8000/patrones/resultados/{file_name}')

    if request.method=='GET':
        file_path = os.path.join(settings.MEDIA_ROOT, nombre)
        direccion=str(file_path)

        resultados = analizador()
        resultados.analizar(direccion)

        dictionary = resultados.retornarResultados()
        analisis=True
        numeros=dictionary['numeros']
        numerosLetras=dictionary['numerosLetras']
        vocales=dictionary['vocales']
        caracteres=dictionary['caracteres']
    return render(request, 'index.html', {'nombreArchivo': nombre,'analisis':analisis,'numeros':numeros,'vocales':vocales,
                                            'numerosLetras':numerosLetras,'caracteres':caracteres})


def lista_archivos(request):
    
    media_root = settings.MEDIA_ROOT
    fs = FileSystemStorage(location=media_root)
    archivos = fs.listdir('')
    nombres_archivos = archivos[1]
    return render(request, 'lista-archivos.html', {'nombres_archivos': nombres_archivos})
