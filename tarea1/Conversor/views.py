from django.shortcuts import redirect, render
from django.http import HttpResponse
import json
       

def menu(request):
    return render(request, 'menu.html')

def hexadecimal_view(request):
    return render(request, 'hexadecimal.html')

def binary_view(request):
    return render(request, 'binario.html')

def octal_view(request):
    return render(request, 'octal.html')

def decimal_view(request):
    return render(request, 'decimal.html')


# Convertidores de bases: a binario

def bases_to_binary(request, number, type):
    
    # Convertir number a entero
    if type == 'hexadecimal':
        number = int(number, 16)
    elif type == 'octal':
        number = int(number, 8)
    else:
        number = int(number)
        
    # Convertir a binario
    binario = bin(number)
    
    #binario = '1010'
        
    binario = binario.split("b")[1]
    cadena = "Binario: {}".format(binario)
    partes = cadena.split(": ")
    diccionario = {partes[0].strip(): partes[1].strip()}
    return HttpResponse(json.dumps(diccionario), content_type="application/json")
   
# Convertidores de bases: a hexadecimal
def bases_to_hexadecimal(request, number, type):
    
    # Convertir number a entero
    if type == 'binario':
        number = int(number, 2)
    elif type == 'octal':
        number = int(number, 8)
    else:
        number = int(number)
        
    # Convertir a hexadecimal
    hexadecimal = hex(number)
    
    hexadecimal = hexadecimal.split("x")[1]
    cadena = "Hexadecimal: {}".format(hexadecimal)
    partes = cadena.split(": ")
    diccionario = {partes[0].strip(): partes[1].strip()}
    return HttpResponse(json.dumps(diccionario), content_type="application/json")

# Convertidores de bases: a octal
    # El constructor de los números octales es oct()
    
def bases_to_octal(request, number, type):
    
    # Convertir number a entero
    if type == 'binario':
        number = int(number, 2)
    elif type == 'hexadecimal':
        number = int(number, 16)
    else:
        number = int(number)
        
    # Convertir a octal
    octal = oct(number)
    
    octal = octal.split("o")[1]
    cadena = "Octal: {}".format(octal)
    partes = cadena.split(": ")
    diccionario = {partes[0].strip(): partes[1].strip()}
    return HttpResponse(json.dumps(diccionario), content_type="application/json")


    
# Convertidores de bases: a decimal
    # El constructor de los números decimales es int()
def bases_to_decimal(request, number, type):
    
    # Convertir number a entero
    if type == 'hexadecimal':
        number = int(number, 16)
    elif type == 'octal':
        number = int(number, 8)
    else:
        number = int(number, 2)
        
    cadena = "Decimal: {}".format(number)
    partes = cadena.split(": ")
    diccionario = {partes[0].strip(): partes[1].strip()}
    return HttpResponse(json.dumps(diccionario), content_type="application/json")