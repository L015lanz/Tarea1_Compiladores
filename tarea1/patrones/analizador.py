import re

class analizador:
    def __init__(self):
     self.lista_numeros=[]
     self.lista_numeros_letras=[]
     self.lista_caracteres=[]

    def vocales(self, l1, l2):
        if l1 is None:
            l1 = []
        if l2 is None:
            l2 = []
        for elemento in l2:
            if elemento not in l1:
                l1.append(elemento)
        return l1  

    def filtrarResultados(self,l1):
        conjunto_resultante = set(l1)


        lista_filtrada = list(conjunto_resultante)  
        return lista_filtrada  

    def analizar(self,archivo):
         
                
            with open(archivo, 'r') as f:
                for linea in f:
                    linea.strip()

                    patron_numeros = re.compile(r'\d+')
                    patron_numero_letra=re.compile(r'[0-9]+[A-z]+')
                    patron_3a=re.compile('\w*[a,A]\w*[a,A]\w*[a,A]\w*')
                    patron_3e=re.compile('\w*[e,E]\w*[e,E]\w*[e,E]\w*')
                    patron_3i=re.compile('\w*[i,I]\w*[i,I]\w*[i,I]\w*')
                    patron_3o=re.compile('\w*[o,O]\w*[o,O]\w*[o,O]\w*')
                    patron_3u=re.compile('\w*[u,U]\w*[u,U]\w*[U,u]\w*')
                    patron_caracteres_especiales=re.compile(r'[^A-z0-9\s]+')
                    
                    self.lista_3vocales=self.vocales(patron_3a.findall(linea.strip()),patron_3e.findall(linea.strip()))
                    self.lista_3vocales=self.vocales(self.lista_3vocales,patron_3i.findall(linea.strip()))
                    self.lista_3vocales=self.vocales(self.lista_3vocales,patron_3o.findall(linea.strip()))
                    self.lista_3vocales=self.vocales(self.lista_3vocales,patron_3u.findall(linea.strip()))
                    self.lista_numeros.extend(patron_numeros.findall(linea.strip()))
                    self.lista_numeros_letras.extend(patron_numero_letra.findall(linea.strip()))
                    self.lista_caracteres.extend(patron_caracteres_especiales.findall(linea.strip()))
        
                    
    def retornarResultados(self):
        resultDict = {
         'numeros': self.filtrarResultados(self.lista_numeros),
         'numerosLetras': self.filtrarResultados(self.lista_numeros_letras),
         'vocales': self.filtrarResultados(self.lista_3vocales),
         'caracteres': self.filtrarResultados(self.lista_caracteres)
        }    
        return resultDict
            