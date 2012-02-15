[indent = 4]

/*
*       Copyright 2011 Hiram Jeronimo Perez "wøRg" <worg@linuxmail.org>
*
*      This program is free software; you can redistribute it and/or modify
*       it under the terms of the GNU General Public License version 3
*	as published by the Free Software Foundation; .
*
*       This program is distributed in the hope that it will be useful,
*       but WITHOUT ANY WARRANTY; without even the implied warranty of
*       MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*       GNU General Public License for more details.
*
*       You should have received a copy of the GNU General Public License
*       along with this program; if not, write to the Free Software
*       Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
*       MA 02110-1301, USA.
*       
*/

uses
    Sqlite
    Gtk
    
class DeweyDb
    db  : Database
    end : bool = false
    tmp : string
    dbPath : string
    stmnt : array of string
    
    event finished()
    
    construct (dbP : string)
        this.dbPath = dbP
        tmp = Environment.get_tmp_dir ()
        tmp += "/bookzenlock"
        Database.open (dbPath, out db)
        
        try
            FileUtils.set_contents (tmp,"locked ;D")
        except e : Error
            print "%s", e.message
        
    def async initDewey () 
        run : AsyncReadyCallback
        run = def (obj, res)
            try
                initD.end (res)
            except ex : GLib.ThreadError
                print ("threaderror!")
            finished ()
        
        initD.begin(run)
            
            
    def private async initD() raises ThreadError        
        stmnt = new array of string[1000]
        callback : SourceFunc = initD.callback;
        i : int = 0
        
        
        Database.open (dbPath, out db);
        initDb : string = "create table books  (lastNm text, midNm text, name text, title text, edition text, editPlace text, editor text, yoEdit text, serie text, clasifn integer references class(id), clasif text references class(name)); create table class (id text, name text);";
        db.exec (initDb);
        setQuery ()
        run : ThreadFunc of void*
        run = def ()
            for i = 0 to 999
                sqlq : string = "INSERT INTO class "
                sqlq += "VALUES ('" + i.to_string() + "', '" + stmnt[i] + "')"
                db.exec (sqlq)   
            Idle.add((owned) callback)
            return null
        
        Thread.create of void*(run, false)
        yield;
        print "Done!"
        
    def myThread () : void*
        for i : int = 0 to 999
            sqlq : string = "INSERT INTO class "
            sqlq += "VALUES ('" + i.to_string() + "', '" + stmnt[i] + "')"
            db.exec (sqlq)   
        return null
            
            
    def setQuery ()
        i : int = 0
        print "setting up db!"
        
        stmnt[i] = "Ciencias de la computación, conocimiento y trabajos generales"
        i++
        
        stmnt[i] = "Conocimiento"
        i++
        
        stmnt[i] = "El libro"
        i++
        
        stmnt[i] = "Sistemas"
        i++
        
        stmnt[i] = "Procesamiento de datos y Ciencias de la computación"
        i++
        
        stmnt[i] = "Programación de computadoras, programas y datos"
        i++
        
        stmnt[i] = "Métodos especiales de computadoras"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "Bibliografía"
        i++
        
        stmnt[i] = "Bibliografías"
        i++
        
        stmnt[i] = "Bibliografías de individuos"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "Bibliografías de trabajos anónimos y seudónimos"
        i++
        
        stmnt[i] = "Bibliografías de trabajos acerca de lugares específicos"
        i++
        
        stmnt[i] = "Bibliografías de trabajos en temas específicos"
        i++
        
        stmnt[i] = "Catálogos de temas generales"
        i++
        
        stmnt[i] = "Catálogos ordenados por autor, fecha, etc."
        i++
        
        stmnt[i] = "Catálogos de diccionarios"
        i++
        
        stmnt[i] = "Ciencias de la información y bibliotecas"
        i++
        
        stmnt[i] = "Relaciones en bibliotecas"
        i++
        
        stmnt[i] = "Administración de la planta física"
        i++
        
        stmnt[i] = "Manejo de personal"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "Operaciones de bibliotecas"
        i++
        
        stmnt[i] = "Bibliotecas para temas específicos"
        i++
        
        stmnt[i] = "Bibliotecas generales"
        i++
        
        stmnt[i] = "Lectura y uso de otros medios de información"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "Trabajos enciclopédicos generales"
        i++
        
        stmnt[i] = "Enciclopedias en inglés americano"
        i++
        
        stmnt[i] = "Enciclopedias en inglés"
        i++
        
        stmnt[i] = "Enciclopedias en otros idiomas germánicos"
        i++
        
        stmnt[i] = "Enciclopedias en francés, occitano y catalán"
        i++
        
        stmnt[i] = "Enciclopedias en italiano, latin y lenguajes afines"
        i++
        
        stmnt[i] = "Enciclopedias en español y portugués"
        i++
        
        stmnt[i] = "Enciclopedias en idiomas eslavos"
        i++
        
        stmnt[i] = "Enciclopedias en idiomas escandinavos"
        i++
        
        stmnt[i] = "Enciclopedias en otros idiomas"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "Publicaciones periodicas generales"
        i++
        
        stmnt[i] = "Pub. periodicas en inglés americano"
        i++
        
        stmnt[i] = "Pub. periodicas en inglés"
        i++
        
        stmnt[i] = "Pub. periodicas en otros idiomas germánicos"
        i++
        
        stmnt[i] = "Pub. periodicas en francés, occitano y catalán"
        i++
        
        stmnt[i] = "Pub. periodicas en italiano, latín y lenguajes afines"
        i++
        
        stmnt[i] = "Pub. periodicas en español y portugués"
        i++
        
        stmnt[i] = "Pub. periodicas en idiomas eslavos"
        i++
        
        stmnt[i] = "Pub. periodicas en idiomas escandinavos"
        i++
        
        stmnt[i] = "Pub. periodicas en otros idiomas"
        i++
        
        stmnt[i] = "Organizaciones generales y museología"
        i++
        
        stmnt[i] = "Organizaciones en Norteamérica"
        i++
        
        stmnt[i] = "Organizaciones en las islas británicas e Inglaterra"
        i++
        
        stmnt[i] = "Organizaciones en Europa central y Alemania"
        i++
        
        stmnt[i] = "Organizaciones en Francia y Mónaco"
        i++
        
        stmnt[i] = "Organizaciones en Italia e islas aledañas"
        i++
        
        stmnt[i] = "Organizaciones en la península Ibérica e islas aledañas"
        i++
        
        stmnt[i] = "Organizaciones en el este de Europa y Rusia"
        i++
        
        stmnt[i] = "Organizaciones en otras áreas geográficas"
        i++
        
        stmnt[i] = "Ciencias de los museos"
        i++
        
        stmnt[i] = "Medios de noticias, periodismo y publicación"
        i++
        
        stmnt[i] = "Periodicos en Norteamérica"
        i++
        
        stmnt[i] = "Periodicos en las islas británicas e Inglaterra"
        i++
        
        stmnt[i] = "Periodicos en Europa central y Alemania"
        i++
        
        stmnt[i] = "Periodicos en Francia y Mónaco"
        i++
        
        stmnt[i] = "Periodicos en Italia e islas aledañas"
        i++
        
        stmnt[i] = "Periodicos en la península Ibérica e islas aledañas"
        i++
        
        stmnt[i] = "Periodicos en el este de Europa y Rusia"
        i++
        
        stmnt[i] = "Periodicos en Escandinavia"
        i++
        
        stmnt[i] = "Periodicos en otras áreas geográficas"
        i++
        
        stmnt[i] = "Colecciones generales"
        i++
        
        stmnt[i] = "Colecciones en inglés americano"
        i++
        
        stmnt[i] = "Colecciones en inglés"
        i++
        
        stmnt[i] = "Colecciones en otros idiomas germánicos"
        i++
        
        stmnt[i] = "Colecciones en francés, occitano y catalán"
        i++
        
        stmnt[i] = "Colecciones en italiano, latin y lenguajes afines"
        i++
        
        stmnt[i] = "Colecciones en español y portugués"
        i++
        
        stmnt[i] = "Colecciones en idiomas eslavos"
        i++
        
        stmnt[i] = "Colecciones en idiomas escandinavos"
        i++
        
        stmnt[i] = "Colecciones en otros idiomas"
        i++
        
        stmnt[i] = "Manuscritos y libros raros"
        i++
        
        stmnt[i] = "Manuscritos"
        i++
        
        stmnt[i] = "Volúmenes"
        i++
        
        stmnt[i] = "Incunables"
        i++
        
        stmnt[i] = "Libros impresos"
        i++
        
        stmnt[i] = "Libros notables por enlaces"
        i++
        
        stmnt[i] = "Libros notables por ilustraciones"
        i++
        
        stmnt[i] = "Libros notables por su origen o propiedad"
        i++
        
        stmnt[i] = "Libros prohibidos y falsificaciones"
        i++
        
        stmnt[i] = "Libros notables por su formato"
        i++
        
        stmnt[i] = "Filosofía"
        i++
        
        stmnt[i] = "Miscelanea de filosofía y filosofía"
        i++
        
        stmnt[i] = "Teoría de la filosofía"
        i++
        
        stmnt[i] = "Diccionarios de filosofía"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "Publicaciones seriales de filosofía"
        i++
        
        stmnt[i] = "Organizaciones de filosofía"
        i++
        
        stmnt[i] = "Educación e investigación en filosofía"
        i++
        
        stmnt[i] = "Tipos de personas en la filosofía"
        i++
        
        stmnt[i] = "Tratamiento histórico de la filosofía"
        i++
        
        stmnt[i] = "Metafísica"
        i++
        
        stmnt[i] = "Ontología"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "Cosmología"
        i++
        
        stmnt[i] = "Espacio"
        i++
        
        stmnt[i] = "Tiempo"
        i++
        
        stmnt[i] = "Cambio"
        i++
        
        stmnt[i] = "Estructura"
        i++
        
        stmnt[i] = "Fuerza y energía"
        i++
        
        stmnt[i] = "Números y cantidades"
        i++
        
        stmnt[i] = "Epistemología, causas y humanidad"
        i++
        
        stmnt[i] = "Epistemología"
        i++
        
        stmnt[i] = "Causas"
        i++
        
        stmnt[i] = "Determinismo e indeterminismo"
        i++
        
        stmnt[i] = "Teleología"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "El ser"
        i++
        
        stmnt[i] = "El inconsciente y subconsciente"
        i++
        
        stmnt[i] = "El género humano"
        i++
        
        stmnt[i] = "Origen y destino de almas individuales"
        i++
        
        stmnt[i] = "Parapsicología y ocultismo"
        i++
        
        stmnt[i] = "Métodos ocultos para lograr el bienestar"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "Parapsicología y ocultismo"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "Sueños y Misterios"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "Grafología adivinatoria"
        i++
        
        stmnt[i] = "Fisionimía"
        i++
        
        stmnt[i] = "Frenología"
        i++
        
        stmnt[i] = "Escuelas filosóficas específicas"
        i++
        
        stmnt[i] = "Idealismo y sistemas relacionados"
        i++
        
        stmnt[i] = "Filosofía crítica"
        i++
        
        stmnt[i] = "Intuiciocinismo y Bergsonismo"
        i++
        
        stmnt[i] = "Humanismo y sistemas relacionnados"
        i++
        
        stmnt[i] = "Sensacionalismo"
        i++
        
        stmnt[i] = "Naturalismo y sistemas relacionados"
        i++
        
        stmnt[i] = "Panteísmo y sistemas relacionados"
        i++
        
        stmnt[i] = "Liberalismo, eclecticismo y tradicionalismo"
        i++
        
        stmnt[i] = "Otros sistemas filosóficos"
        i++
        
        stmnt[i] = "Psicología"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "Percepción, movimiento, emociones, unidades"
        i++
        
        stmnt[i] = "Procesos mentales e inteligencia"
        i++
        
        stmnt[i] = "Subconsciente y estados alterados"
        i++
        
        stmnt[i] = "Psicologia diferencial y del desarrollo"
        i++
        
        stmnt[i] = "Psicología Comparativa"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "Psicología Aplicada"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "Lógica"
        i++
        
        stmnt[i] = "Inducción"
        i++
        
        stmnt[i] = "Deducción"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "Falacias y fuentes de error"
        i++
        
        stmnt[i] = "Silogismos"
        i++
        
        stmnt[i] = "Hipótesis"
        i++
        
        stmnt[i] = "Argumentación y persuación"
        i++
        
        stmnt[i] = "Analogía"
        i++
        
        stmnt[i] = "Ética"
        i++
        
        stmnt[i] = "Sistemas y doctrinas"
        i++
        
        stmnt[i] = "Ética polñitica"
        i++
        
        stmnt[i] = "Ética de las relaciones familiares"
        i++
        
        stmnt[i] = "Ética económica y profesional"
        i++
        
        stmnt[i] = "Ética de la recreación y el ocio"
        i++
        
        stmnt[i] = "Ética sexual y reproductiva"
        i++
        
        stmnt[i] = "Ética de las relaciones sociales"
        i++
        
        stmnt[i] = "Ética del consumo"
        i++
        
        stmnt[i] = "Otras normas éticas"
        i++
        
        stmnt[i] = "Filosofía antigua, medieval y del este"
        i++
        
        stmnt[i] = "Filosofía oriental"
        i++
        
        stmnt[i] = "Filosofía griega presocrática"
        i++
        
        stmnt[i] = "Filosofía sofista y socrática"
        i++
        
        stmnt[i] = "Filosofía platónica"
        i++
        
        stmnt[i] = "Filosofía aristotélica"
        i++
        
        stmnt[i] = "Filosofía escéptica y neoplatónica"
        i++
        
        stmnt[i] = "Filosofía epicureana"
        i++
        
        stmnt[i] = "Filosofía estoica"
        i++
        
        stmnt[i] = "Filosofía medieval de occidente"
        i++
        
        stmnt[i] = "Filosofía moderna occidental"
        i++
        
        stmnt[i] = "Filosofía moderna occidental en E.E.U.U. y Canadá"
        i++
        
        stmnt[i] = "Filosofía moderna occidental en las islas Británicas"
        i++
        
        stmnt[i] = "Filosofía moderna occidental en Alemania y austria"
        i++
        
        stmnt[i] = "Filosofía moderna occidental en Francia"
        i++
        
        stmnt[i] = "Filosofía moderna occidental en Italia"
        i++
        
        stmnt[i] = "Filosofía moderna occidental en España y Portugal"
        i++
        
        stmnt[i] = "Filosofía moderna occidental en la Union Soviética"
        i++
        
        stmnt[i] = "Filosofía moderna occidental en Escandinavia"
        i++
        
        stmnt[i] = "Filosofía moderna occidental en otras regiones geográficas"
        i++
        
        stmnt[i] = "Religión"
        i++
        
        stmnt[i] = "Mitología religiosa, clases generales de religión, relaciones y actitudes interreligiosas, teología social"
        i++
        
        stmnt[i] = "Doctrinas"
        i++
        
        stmnt[i] = "Culto público y otras prácticas"
        i++
        
        stmnt[i] = "Experiencia, vida y práctica religiosa"
        i++
        
        stmnt[i] = "Etica religiosa"
        i++
        
        stmnt[i] = "Líderes y organización"
        i++
        
        stmnt[i] = "Misiones y educación religiosa"
        i++
        
        stmnt[i] = "Fuentes"
        i++
        
        stmnt[i] = "Sectas y movimientos reformistas"
        i++
        
        stmnt[i] = "Teología natural"
        i++
        
        stmnt[i] = "Conceptos de Dios"
        i++
        
        stmnt[i] = "Existencia y atributos de Dios"
        i++
        
        stmnt[i] = "Creación"
        i++
        
        stmnt[i] = "Teodicea"
        i++
        
        stmnt[i] = "Ciencia y religión"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "Humanidad"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "Biblias"
        i++
        
        stmnt[i] = "Viejo Testamento"
        i++
        
        stmnt[i] = "Libros históricos del Viejo Testamento"
        i++
        
        stmnt[i] = "Libros poéticos del Viejo Testamento"
        i++
        
        stmnt[i] = "Libros proféticos del Viejo Testamento"
        i++
        
        stmnt[i] = "Nuevo Testamento"
        i++
        
        stmnt[i] = "Evangelios y Hechos"
        i++
        
        stmnt[i] = "Epístolas"
        i++
        
        stmnt[i] = "Revelaciones"
        i++
        
        stmnt[i] = "Apócrifos y pseudoepígrafos"
        i++
        
        stmnt[i] = "Teología cristiana"
        i++
        
        stmnt[i] = "Dios"
        i++
        
        stmnt[i] = "Jesús y su familia"
        i++
        
        stmnt[i] = "Humanidad"
        i++
        
        stmnt[i] = "Salvación y gracia"
        i++
        
        stmnt[i] = "Seres espirituales"
        i++
        
        stmnt[i] = "Escatología"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "Credos y catecismos"
        i++
        
        stmnt[i] = "Apologética y polémica"
        i++
        
        stmnt[i] = "Moral cristiana y teología devocional"
        i++
        
        stmnt[i] = "Teología moral"
        i++
        
        stmnt[i] = "Literatura devocional"
        i++
        
        stmnt[i] = "Escrituras evangelístucas para individuos"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "Uso del arte en la cristianidad"
        i++
        
        stmnt[i] = "Mobiliaro y artículos cristianos"
        i++
        
        stmnt[i] = "Experiencia, práctica y vida cristiana"
        i++
        
        stmnt[i] = "KObservaciones cristianas en la vida familiar"
        i++
        
        stmnt[i] = "Órdenes cristianas e iglesia local"
        i++
        
        stmnt[i] = "Celebración (Homilía)"
        i++
        
        stmnt[i] = "Textos de sermones"
        i++
        
        stmnt[i] = "Oficio pastoral (teología pastoral)"
        i++
        
        stmnt[i] = "Gobierno y administrción religiosa"
        i++
        
        stmnt[i] = "Congregaciones y órdenes religiosas"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "Actividades de la iglesia local"
        i++
        
        stmnt[i] = "Teología social cristiana"
        i++
        
        stmnt[i] = "Teología social"
        i++
        
        stmnt[i] = "Eclesiología"
        i++
        
        stmnt[i] = "Lugares y épocas de observancia religiosa"
        i++
        
        stmnt[i] = "Adoración pública"
        i++
        
        stmnt[i] = "Sacramentos, otros ritos y actos"
        i++
        
        stmnt[i] = "Misiones"
        i++
        
        stmnt[i] = "Asociaciones para trabajo religioeso"
        i++
        
        stmnt[i] = "Educación religiosa"
        i++
        
        stmnt[i] = "Renovación espiritual"
        i++
        
        stmnt[i] = "Historia de la iglesia cristiana"
        i++
        
        stmnt[i] = "Órdenes religiosas en la historia de la iglesia"
        i++
        
        stmnt[i] = "Persecuciones en la historia de la iglesia"
        i++
        
        stmnt[i] = "Herejías en la historia de la iglesia"
        i++
        
        stmnt[i] = "Iglesia gristiana en Europa"
        i++
        
        stmnt[i] = "Iglesia cristiana en Asia"
        i++
        
        stmnt[i] = "Iglesia cristiana en África"
        i++
        
        stmnt[i] = "Iglesia cristiana en Norteamérica"
        i++
        
        stmnt[i] = "Iglesia cristiana en Sudamérica"
        i++
        
        stmnt[i] = "Iglesia cristiana en otras áreas"
        i++
        
        stmnt[i] = "Denominaciones cristianas y sectas"
        i++
        
        stmnt[i] = "Iglesia antigua e iglesias del este"
        i++
        
        stmnt[i] = "Iglesia católica romana"
        i++
        
        stmnt[i] = "Iglesias anglicanas"
        i++
        
        stmnt[i] = "Protestantes de origen continental"
        i++
        
        stmnt[i] = "Presbiterianos, Reformados, Congregacionales"
        i++
        
        stmnt[i] = "Bautistas, Discipulos de cristo, Adventistas"
        i++
        
        stmnt[i] = "Iglesias metodistas y afines"
        i++
        
        stmnt[i] = "[Sin Asignar]"
        i++
        
        stmnt[i] = "Otras denominaciones y sectas"
        i++
        
        stmnt[i] = "Otras religiones y comparativas"
        i++
        
        stmnt[i] = "Religión Comparativa"
        i++
        
        stmnt[i] = "Religión griega y romana clásica"
        i++
        
        stmnt[i] = "Religión germánica"
        i++
        
        stmnt[i] = "Religiones de origen indio"
        i++
        
        stmnt[i] = "Zoroastrismo (mazdeísmo, parsismo)"
        i++
        
        stmnt[i] = "Judaísmo"
        i++
        
        stmnt[i] = "Islam, babismo y Fe en Bahá'í"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Otras religiones"
        i++
        
        stmnt[i] = "Ciencias sociales"
        i++
        
        stmnt[i] = "Sociología y antropología"
        i++
        
        stmnt[i] = "La interacción social"
        i++
        
        stmnt[i] = "Los procesos sociales"
        i++
        
        stmnt[i] = "Factores que influyen en el comportamiento social"
        i++
        
        stmnt[i] = "Los grupos sociales"
        i++
        
        stmnt[i] = "Cultura y las instituciones"
        i++
        
        stmnt[i] = "Comunidades"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Estadísticas generales"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Las estadísticas generales de Europa"
        i++
        
        stmnt[i] = "Las estadísticas generales de Asia"
        i++
        
        stmnt[i] = "Las estadísticas generales de África"
        i++
        
        stmnt[i] = "Estadísticas generales de América del Norte"
        i++
        
        stmnt[i] = "Estadísticas generales de América del Sur"
        i++
        
        stmnt[i] = "Las estadísticas generales de otras partes del mundo"
        i++
        
        stmnt[i] = "La ciencia política"
        i++
        
        stmnt[i] = "Sistemas de gobiernos y estados"
        i++
        
        stmnt[i] = "Relación del Estado con grupos organizados"
        i++
        
        stmnt[i] = "Derechos civiles y políticos"
        i++
        
        stmnt[i] = "El proceso político"
        i++
        
        stmnt[i] = "La migración internacional y la colonización"
        i++
        
        stmnt[i] = "La esclavitud y la emancipación"
        i++
        
        stmnt[i] = "Relaciones internacionales"
        i++
        
        stmnt[i] = "El proceso legislativo"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Economía"
        i++
        
        stmnt[i] = "Economía del Trabajo"
        i++
        
        stmnt[i] = "La economía financiera"
        i++
        
        stmnt[i] = "Economía de la tierra"
        i++
        
        stmnt[i] = "Cooperativas"
        i++
        
        stmnt[i] = "Socialismo y sistemas relacionados"
        i++
        
        stmnt[i] = "Las finanzas públicas"
        i++
        
        stmnt[i] = "Economía internacional"
        i++
        
        stmnt[i] = "Producción"
        i++
        
        stmnt[i] = "Macroeconomía y temas relacionados"
        i++
        
        stmnt[i] = "Ley"
        i++
        
        stmnt[i] = "El derecho internacional"
        i++
        
        stmnt[i] = "El derecho constitucional y administrativo"
        i++
        
        stmnt[i] = "Militar, impuestos, comercio, derecho industrial"
        i++
        
        stmnt[i] = "El trabajo social, el bienestar, y la legislación relacionada con"
        i++
        
        stmnt[i] = "Derecho penal"
        i++
        
        stmnt[i] = "Derecho Privado"
        i++
        
        stmnt[i] = "El proceso civil y tribunales"
        i++
        
        stmnt[i] = "Derecho (Estatutos), los reglamentos, los casos"
        i++
        
        stmnt[i] = "Ley de jurisdicciones específicas y áreas"
        i++
        
        stmnt[i] = "Administración pública"
        i++
        
        stmnt[i] = "De los gobiernos centrales"
        i++
        
        stmnt[i] = "De los gobiernos locales"
        i++
        
        stmnt[i] = "De los EE.UU. a los gobiernos federal y estatal"
        i++
        
        stmnt[i] = "De determinados gobiernos centrales"
        i++
        
        stmnt[i] = "La ciencia militar"
        i++
        
        stmnt[i] = "Las fuerzas de los pies y la guerra"
        i++
        
        stmnt[i] = "Las fuerzas de montaje y la guerra"
        i++
        
        stmnt[i] = "Otras fuerzas especializadas y servicios"
        i++
        
        stmnt[i] = "Mar (Naval) y las fuerzas de la guerra"
        i++
        
        stmnt[i] = "Los servicios sociales, la asociación"
        i++
        
        stmnt[i] = "Los problemas sociales generales"
        i++
        
        stmnt[i] = "Los problemas de bienestar social y servicios"
        i++
        
        stmnt[i] = "Otros problemas sociales y servicios"
        i++
        
        stmnt[i] = "Criminología"
        i++
        
        stmnt[i] = "Las instituciones penitenciarias y relacionados"
        i++
        
        stmnt[i] = "Asociación"
        i++
        
        stmnt[i] = "General de clubes"
        i++
        
        stmnt[i] = "Seguros"
        i++
        
        stmnt[i] = "Varios tipos de asociaciones"
        i++
        
        stmnt[i] = "Educación"
        i++
        
        stmnt[i] = "Gestión de la escuela, la educación especial"
        i++
        
        stmnt[i] = "Educación Primaria"
        i++
        
        stmnt[i] = "La educación secundaria"
        i++
        
        stmnt[i] = "La educación de adultos"
        i++
        
        stmnt[i] = "Cursos de ensenanza"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "La educación superior"
        i++
        
        stmnt[i] = "Gobierno de la regulación, control, apoyo"
        i++
        
        stmnt[i] = "Comercio, comunicaciones, transporte"
        i++
        
        stmnt[i] = "Comercio Interior (comercio interior)"
        i++
        
        stmnt[i] = "El comercio internacional (comercio exterior)"
        i++
        
        stmnt[i] = "Postal de comunicación"
        i++
        
        stmnt[i] = "Comunicaciones, Telecomunicaciones"
        i++
        
        stmnt[i] = "Ferrocarril de transporte"
        i++
        
        stmnt[i] = "Por vías navegables y el transporte de transbordadores"
        i++
        
        stmnt[i] = "Agua, aire, espacio de transporte"
        i++
        
        stmnt[i] = "Transporte, Transporte terrestre"
        i++
        
        stmnt[i] = "Metrología y estandarización"
        i++
        
        stmnt[i] = "Costumbre, etiqueta, folklore"
        i++
        
        stmnt[i] = "El aspecto de fantasía y personal"
        i++
        
        stmnt[i] = "Costumbres del ciclo de vida y la vida doméstica"
        i++
        
        stmnt[i] = "La muerte de aduanas"
        i++
        
        stmnt[i] = "General de aduanas"
        i++
        
        stmnt[i] = "Etiqueta (Modales)"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Folklore"
        i++
        
        stmnt[i] = "Costumbres de guerra y diplomacia"
        i++
        
        stmnt[i] = "Idioma"
        i++
        
        stmnt[i] = "Filosofía y teoría"
        i++
        
        stmnt[i] = "Miscelánea"
        i++
        
        stmnt[i] = "Diccionarios y enciclopedias"
        i++
        
        stmnt[i] = "Temas especiales"
        i++
        
        stmnt[i] = "Las publicaciones seriadas"
        i++
        
        stmnt[i] = "Organizaciones y gestión"
        i++
        
        stmnt[i] = "Educación, investigación, temas relacionados"
        i++
        
        stmnt[i] = "Con respecto al tipo de personas"
        i++
        
        stmnt[i] = "Geográfica y las personas de tratamiento"
        i++
        
        stmnt[i] = "Lingüística"
        i++
        
        stmnt[i] = "Los sistemas de escritura"
        i++
        
        stmnt[i] = "Etimología"
        i++
        
        stmnt[i] = "Diccionarios"
        i++
        
        stmnt[i] = "Fonología"
        i++
        
        stmnt[i] = "Los sistemas estructurales (Gramática)"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Dialectología y lingüística histórica"
        i++
        
        stmnt[i] = "El uso estándar, lingüística aplicada"
        i++
        
        stmnt[i] = "El lenguaje verbal no hablado o escrito"
        i++
        
        stmnt[i] = "Inglés y Inglés Antiguo"
        i++
        
        stmnt[i] = "Sistema de escritura Inglés y fonología"
        i++
        
        stmnt[i] = "Inglés etimología"
        i++
        
        stmnt[i] = "Diccionarios de Inglés"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Inglés gramática"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Inglés variaciones del lenguaje"
        i++
        
        stmnt[i] = "El uso de Inglés Estándar"
        i++
        
        stmnt[i] = "Inglés Antiguo (Anglosajón)"
        i++
        
        stmnt[i] = "Lenguas germánicas, Alemania"
        i++
        
        stmnt[i] = "Sistema de escritura y fonología alemana"
        i++
        
        stmnt[i] = "Alemán etimología"
        i++
        
        stmnt[i] = "Diccionarios alemanes"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "La gramática alemana"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Variaciones en lengua alemana"
        i++
        
        stmnt[i] = "El uso de la norma alemana"
        i++
        
        stmnt[i] = "Otras lenguas germánicas"
        i++
        
        stmnt[i] = "Las lenguas romances, francés"
        i++
        
        stmnt[i] = "Sistema de escritura y fonología francesa"
        i++
        
        stmnt[i] = "Francés etimología"
        i++
        
        stmnt[i] = "Diccionarios franceses"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "La gramática francesa"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Variaciones de lengua francesa"
        i++
        
        stmnt[i] = "El uso del francés estándar"
        i++
        
        stmnt[i] = "Provenzal y catalán"
        i++
        
        stmnt[i] = "Italiano, rumano, romanche"
        i++
        
        stmnt[i] = "Sistema de escritura italianos y fonología"
        i++
        
        stmnt[i] = "Italiano etimología"
        i++
        
        stmnt[i] = "Diccionarios italiana"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Gramática italiana"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Variaciones de lengua italiana"
        i++
        
        stmnt[i] = "El uso de italiano estándar"
        i++
        
        stmnt[i] = "Rumania y Rhaeto románico-"
        i++
        
        stmnt[i] = "Idiomas español y portugués"
        i++
        
        stmnt[i] = "Español sistema de escritura y fonología"
        i++
        
        stmnt[i] = "Español etimología"
        i++
        
        stmnt[i] = "Diccionarios de español"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "La gramática del español"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Variaciones en español"
        i++
        
        stmnt[i] = "El uso del español estándar"
        i++
        
        stmnt[i] = "Portugués"
        i++
        
        stmnt[i] = "Lenguas itálicas, América"
        i++
        
        stmnt[i] = "Escribir el latín clásico y fonología"
        i++
        
        stmnt[i] = "Clásica etimología latina y fonología"
        i++
        
        stmnt[i] = "Clásica diccionarios América"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Gramática latina clásica"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Viejo, Posclásico, el latín vulgar"
        i++
        
        stmnt[i] = "Uso del latín clásico"
        i++
        
        stmnt[i] = "Otras lenguas itálicas"
        i++
        
        stmnt[i] = "Lenguas helénicas, griego clásico"
        i++
        
        stmnt[i] = "Escribir griego clásico y fonología"
        i++
        
        stmnt[i] = "Clásica etimología griega"
        i++
        
        stmnt[i] = "Clásica diccionarios griego"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "La gramática griega clásica"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Preclásico y postclásico griego"
        i++
        
        stmnt[i] = "El uso del griego clásico"
        i++
        
        stmnt[i] = "Otras lenguas helénicas"
        i++
        
        stmnt[i] = "Otros idiomas"
        i++
        
        stmnt[i] = "Indoeuropeas orientales y célticas idiomas"
        i++
        
        stmnt[i] = "Lenguas afroasiáticas; semita"
        i++
        
        stmnt[i] = "No-semitas lenguas afroasiáticas"
        i++
        
        stmnt[i] = "Ural-altaica, paleosiberianas, Dravidian"
        i++
        
        stmnt[i] = "Idiomas de Asia oriental y sudoriental"
        i++
        
        stmnt[i] = "Lenguas africanas"
        i++
        
        stmnt[i] = "América del Norte lenguas nativas"
        i++
        
        stmnt[i] = "América del Sur lenguas nativas"
        i++
        
        stmnt[i] = "Otros idiomas"
        i++
        
        stmnt[i] = "Ciencias naturales y matemáticas"
        i++
        
        stmnt[i] = "Filosofía y teoría"
        i++
        
        stmnt[i] = "Miscelánea"
        i++
        
        stmnt[i] = "Diccionarios y enciclopedias"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Las publicaciones seriadas"
        i++
        
        stmnt[i] = "Organizaciones y gestión"
        i++
        
        stmnt[i] = "Educación, investigación, temas relacionados"
        i++
        
        stmnt[i] = "La historia natural"
        i++
        
        stmnt[i] = "Histórico, geográfico, las personas que el tratamiento"
        i++
        
        stmnt[i] = "Matemáticas"
        i++
        
        stmnt[i] = "Principios generales"
        i++
        
        stmnt[i] = "Álgebra y teoría de números"
        i++
        
        stmnt[i] = "Aritmética"
        i++
        
        stmnt[i] = "Topología"
        i++
        
        stmnt[i] = "Análisis"
        i++
        
        stmnt[i] = "Geometría"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Análisis numérico"
        i++
        
        stmnt[i] = "Probabilidades y matemáticas aplicadas"
        i++
        
        stmnt[i] = "Astronomía y ciencias afines"
        i++
        
        stmnt[i] = "Mecánica celeste"
        i++
        
        stmnt[i] = "Técnicas, equipos, materiales"
        i++
        
        stmnt[i] = "Los cuerpos y fenómenos celestes específicos"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Tierra (Geografía astronómica)"
        i++
        
        stmnt[i] = "Geografía Matemática"
        i++
        
        stmnt[i] = "Navegación astronómica"
        i++
        
        stmnt[i] = "Efemérides"
        i++
        
        stmnt[i] = "Cronología"
        i++
        
        stmnt[i] = "Física"
        i++
        
        stmnt[i] = "La mecánica clásica, mecánica de sólidos"
        i++
        
        stmnt[i] = "Mecánica de fluidos, la mecánica de líquidos"
        i++
        
        stmnt[i] = "Mecánica de gas"
        i++
        
        stmnt[i] = "Las vibraciones del sonido y afines"
        i++
        
        stmnt[i] = "El fenómeno de luz y paraphotic"
        i++
        
        stmnt[i] = "Calor"
        i++
        
        stmnt[i] = "Electricidad y electrónica"
        i++
        
        stmnt[i] = "Magnetismo"
        i++
        
        stmnt[i] = "La física moderna"
        i++
        
        stmnt[i] = "Química y ciencias afines"
        i++
        
        stmnt[i] = "La química física y teórica"
        i++
        
        stmnt[i] = "Técnicas, equipos, materiales"
        i++
        
        stmnt[i] = "Química Analítica"
        i++
        
        stmnt[i] = "El análisis cualitativo"
        i++
        
        stmnt[i] = "El análisis cuantitativo"
        i++
        
        stmnt[i] = "La química inorgánica"
        i++
        
        stmnt[i] = "La química orgánica"
        i++
        
        stmnt[i] = "Cristalografía"
        i++
        
        stmnt[i] = "Mineralogía"
        i++
        
        stmnt[i] = "Ciencias de la Tierra"
        i++
        
        stmnt[i] = "Geología, hidrología, meteorología"
        i++
        
        stmnt[i] = "Petrología"
        i++
        
        stmnt[i] = "Geología Económica"
        i++
        
        stmnt[i] = "Ciencias de la Tierra de Europa"
        i++
        
        stmnt[i] = "Ciencias de la tierra de Asia"
        i++
        
        stmnt[i] = "Ciencias de la tierra de África"
        i++
        
        stmnt[i] = "Ciencias de la Tierra de América del Norte"
        i++
        
        stmnt[i] = "Ciencias de la Tierra de América del Sur"
        i++
        
        stmnt[i] = "Ciencias de la tierra de otras áreas"
        i++
        
        stmnt[i] = "Paleontología; Paleozoología"
        i++
        
        stmnt[i] = "Paleobotánica"
        i++
        
        stmnt[i] = "Invertebrados fósiles"
        i++
        
        stmnt[i] = "Fossil primitiva phyla"
        i++
        
        stmnt[i] = "Fossil moluscos y Molluscoidea"
        i++
        
        stmnt[i] = "Otros invertebrados fósiles"
        i++
        
        stmnt[i] = "Vertebrados fósiles (fósiles Craniata)"
        i++
        
        stmnt[i] = "Fossil vertebrados de sangre fría"
        i++
        
        stmnt[i] = "Aves fósiles (fósiles de aves)"
        i++
        
        stmnt[i] = "Fossil Mammalia"
        i++
        
        stmnt[i] = "Ciencias de la Vida"
        i++
        
        stmnt[i] = "Fisiología"
        i++
        
        stmnt[i] = "Bioquímica"
        i++
        
        stmnt[i] = "Los sistemas fisiológicos de los animales"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Los sistemas fisiológicos de las plantas"
        i++
        
        stmnt[i] = "La genética y la evolución"
        i++
        
        stmnt[i] = "Ecología"
        i++
        
        stmnt[i] = "La historia natural de los organismos"
        i++
        
        stmnt[i] = "Los microorganismos, hongos, algas"
        i++
        
        stmnt[i] = "Plantas"
        i++
        
        stmnt[i] = "Botánica"
        i++
        
        stmnt[i] = "Plantas para señalar las características específicas de vegetación y flores"
        i++
        
        stmnt[i] = "Dicotyledones"
        i++
        
        stmnt[i] = "Monocotyledones"
        i++
        
        stmnt[i] = "Gimnospermas (Pinophyta)"
        i++
        
        stmnt[i] = "Cryptogamia (plantas sin semillas)"
        i++
        
        stmnt[i] = "Pteridophyta (criptógamas vasculares)"
        i++
        
        stmnt[i] = "Bryophyta"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Zoología / Animales"
        i++
        
        stmnt[i] = "Zoología"
        i++
        
        stmnt[i] = "Invertebrados"
        i++
        
        stmnt[i] = "Los protozoos, equinodermos, relacionados con filos"
        i++
        
        stmnt[i] = "Moluscos y Molluscoidea"
        i++
        
        stmnt[i] = "Otros invertebrados"
        i++
        
        stmnt[i] = "Vertebrados (Craniata, Vertebrados)"
        i++
        
        stmnt[i] = "Vertebrados de sangre fría, los peces"
        i++
        
        stmnt[i] = "Aves (aves)"
        i++
        
        stmnt[i] = "Mammalia (mamíferos)"
        i++
        
        stmnt[i] = "Tecnología"
        i++
        
        stmnt[i] = "Filosofía y teoría"
        i++
        
        stmnt[i] = "Miscelánea"
        i++
        
        stmnt[i] = "Diccionarios y enciclopedias"
        i++
        
        stmnt[i] = "Temas especiales"
        i++
        
        stmnt[i] = "Las publicaciones seriadas"
        i++
        
        stmnt[i] = "Organizaciones"
        i++
        
        stmnt[i] = "Educación, investigación, temas relacionados"
        i++
        
        stmnt[i] = "La invención y las patentes"
        i++
        
        stmnt[i] = "Histórico, geográfico, las personas que el tratamiento"
        i++
        
        stmnt[i] = "Ciencias médicas, Medicina"
        i++
        
        stmnt[i] = "Anatomía humana, citología, histología"
        i++
        
        stmnt[i] = "La fisiología humana"
        i++
        
        stmnt[i] = "Promoción de la salud"
        i++
        
        stmnt[i] = "Incidencia y prevención de la enfermedad"
        i++
        
        stmnt[i] = "Farmacología y terapéutica"
        i++
        
        stmnt[i] = "Enfermedades"
        i++
        
        stmnt[i] = "La cirugía y especialidades médicas relacionadas"
        i++
        
        stmnt[i] = "Ginecología y otras especialidades médicas"
        i++
        
        stmnt[i] = "Medicina Experimental"
        i++
        
        stmnt[i] = "Ingeniería y Aplicadas operaciones"
        i++
        
        stmnt[i] = "Física Aplicada"
        i++
        
        stmnt[i] = "Minería y operaciones relacionadas"
        i++
        
        stmnt[i] = "Ingeniería militar y náutica"
        i++
        
        stmnt[i] = "Ingeniería civil"
        i++
        
        stmnt[i] = "Ingeniería de ferrocarriles, carreteras"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Ingeniería hidráulica"
        i++
        
        stmnt[i] = "Ingeniería sanitaria y municipal"
        i++
        
        stmnt[i] = "Otras ramas de la ingeniería"
        i++
        
        stmnt[i] = "Agricultura"
        i++
        
        stmnt[i] = "Técnicas, equipos, materiales"
        i++
        
        stmnt[i] = "Lesiones, enfermedades, plagas"
        i++
        
        stmnt[i] = "Campo y plantación de cultivos"
        i++
        
        stmnt[i] = "Huertos, frutas, forestales"
        i++
        
        stmnt[i] = "Los cultivos de huerta (Horticultura)"
        i++
        
        stmnt[i] = "La cría de animales"
        i++
        
        stmnt[i] = "Procesamiento de lácteos y productos relacionados"
        i++
        
        stmnt[i] = "Insectos cultura"
        i++
        
        stmnt[i] = "La caza, la pesca, la conservación"
        i++
        
        stmnt[i] = "La economía doméstica y la vida familiar"
        i++
        
        stmnt[i] = "Alimentos y bebidas"
        i++
        
        stmnt[i] = "Alimentación y servicio de mesa"
        i++
        
        stmnt[i] = "Construcción de viviendas y artículos para el hogar"
        i++
        
        stmnt[i] = "Utilidades Domésticas"
        i++
        
        stmnt[i] = "Muebles del hogar"
        i++
        
        stmnt[i] = "Costura, ropa, vida personal"
        i++
        
        stmnt[i] = "Gerencia de viviendas públicas"
        i++
        
        stmnt[i] = "Limpieza"
        i++
        
        stmnt[i] = "De crianza y cuidado en el hogar de enfermos"
        i++
        
        stmnt[i] = "Gestión y servicios auxiliares"
        i++
        
        stmnt[i] = "Servicios de oficina"
        i++
        
        stmnt[i] = "Los procesos de comunicación escrita"
        i++
        
        stmnt[i] = "Taquigrafía"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Contabilidad"
        i++
        
        stmnt[i] = "Administración general"
        i++
        
        stmnt[i] = "Publicidad y relaciones públicas"
        i++
        
        stmnt[i] = "Ingeniería Química"
        i++
        
        stmnt[i] = "Productos químicos industriales de tecnología"
        i++
        
        stmnt[i] = "Explosivos, combustibles tecnología"
        i++
        
        stmnt[i] = "Bebidas tecnología"
        i++
        
        stmnt[i] = "Tecnología de los alimentos"
        i++
        
        stmnt[i] = "Los aceites industriales, grasas, ceras, gases"
        i++
        
        stmnt[i] = "Cerámica y tecnologías afines"
        i++
        
        stmnt[i] = "Limpieza, color, las tecnologías relacionadas"
        i++
        
        stmnt[i] = "Tecnología de otros productos orgánicos"
        i++
        
        stmnt[i] = "Metalurgia"
        i++
        
        stmnt[i] = "Fabricación"
        i++
        
        stmnt[i] = "Metalurgia y productos metálicos"
        i++
        
        stmnt[i] = "Hierro, acero, aleaciones de hierro otros"
        i++
        
        stmnt[i] = "Metales no ferrosos"
        i++
        
        stmnt[i] = "Procesamiento de madera, productos de madera, corcho"
        i++
        
        stmnt[i] = "Cuero y pieles de procesamiento"
        i++
        
        stmnt[i] = "Pulpa y papel la tecnología"
        i++
        
        stmnt[i] = "Textiles"
        i++
        
        stmnt[i] = "Elastómeros y productos de elastómero"
        i++
        
        stmnt[i] = "Otros productos de materiales específicos"
        i++
        
        stmnt[i] = "Fabricación para usos específicos"
        i++
        
        stmnt[i] = "Instrumentos de precisión y otros dispositivos"
        i++
        
        stmnt[i] = "Trabajo de forja pequeña (Herrería)"
        i++
        
        stmnt[i] = "Hardware y electrodomésticos"
        i++
        
        stmnt[i] = "Mobiliario y talleres en el hogar"
        i++
        
        stmnt[i] = "Cuero, piel, productos"
        i++
        
        stmnt[i] = "Impresión y actividades relacionadas"
        i++
        
        stmnt[i] = "Ropa"
        i++
        
        stmnt[i] = "Otros productos finales y embalaje"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Edificios"
        i++
        
        stmnt[i] = "Materiales de construcción"
        i++
        
        stmnt[i] = "Prácticas de auxiliar de la construcción"
        i++
        
        stmnt[i] = "Materiales específicos y con fines de"
        i++
        
        stmnt[i] = "Construcción de madera; Carpintería"
        i++
        
        stmnt[i] = "Cubierta del tejado"
        i++
        
        stmnt[i] = "Utilidades"
        i++
        
        stmnt[i] = "Calefacción, ventilación, aire acondicionado"
        i++
        
        stmnt[i] = "Detalle de acabado"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Las artes, las artes plásticas y decorativas"
        i++
        
        stmnt[i] = "Filosofía y teoría"
        i++
        
        stmnt[i] = "Miscelánea"
        i++
        
        stmnt[i] = "Diccionarios y enciclopedias"
        i++
        
        stmnt[i] = "Temas especiales"
        i++
        
        stmnt[i] = "Las publicaciones seriadas"
        i++
        
        stmnt[i] = "Organizaciones y gestión"
        i++
        
        stmnt[i] = "Educación, investigación, temas relacionados"
        i++
        
        stmnt[i] = "Galerías, museos, colecciones privadas"
        i++
        
        stmnt[i] = "Histórico, geográfico, las personas que el tratamiento"
        i++
        
        stmnt[i] = "Urbanismo y arte del paisaje"
        i++
        
        stmnt[i] = "Planificación del espacio (cívico de arte)"
        i++
        
        stmnt[i] = "Arquitectura del Paisaje"
        i++
        
        stmnt[i] = "Arquitectura del Paisaje de trafficways"
        i++
        
        stmnt[i] = "Las características del agua"
        i++
        
        stmnt[i] = "Las plantas leñosas"
        i++
        
        stmnt[i] = "Las plantas herbáceas"
        i++
        
        stmnt[i] = "Estructuras"
        i++
        
        stmnt[i] = "Diseño del paisaje de los cementerios"
        i++
        
        stmnt[i] = "Paisajes naturales"
        i++
        
        stmnt[i] = "Arquitectura"
        i++
        
        stmnt[i] = "Estructura arquitectónica"
        i++
        
        stmnt[i] = "Arquitectura del año 300 aprox."
        i++
        
        stmnt[i] = "Arquitectura del año 300 a 1399 aprox."
        i++
            
        stmnt[i] = "Arquitectura del año 1400 aprox."
        i++
        
        stmnt[i] = "Estructuras públicas"
        i++
        
        stmnt[i] = "Edificios para propósitos religiosos"
        i++
        
        stmnt[i] = "Edificios para la educación y la investigación"
        i++
        
        stmnt[i] = "Los edificios residenciales y relacionados"
        i++
        
        stmnt[i] = "Diseño y decoración"
        i++
        
        stmnt[i] = "Las artes plásticas, la escultura"
        i++
        
        stmnt[i] = "Procesos, formas, temas de la escultura"
        i++
        
        stmnt[i] = "Escultura del año 500 aproximadamente"
        i++
        
        stmnt[i] = "Griego, la escultura etrusca, romana"
        i++
        
        stmnt[i] = "Escultura desde el año 500 al 1399 aprox."
        i++
        
        stmnt[i] = "Escultura de 1400"
        i++
        
        stmnt[i] = "Talla y tallas"
        i++
        
        stmnt[i] = "Numismática y sigilografía"
        i++
        
        stmnt[i] = "Arte de la cerámica"
        i++
        
        stmnt[i] = "Arte en metal"
        i++
        
        stmnt[i] = "Dibujo y artes decorativas"
        i++
        
        stmnt[i] = "Dibujo y dibujos"
        i++
        
        stmnt[i] = "Perspectiva (gráfico)"
        i++
        
        stmnt[i] = "Dibujo y dibujos por tema"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Artes decorativas"
        i++
        
        stmnt[i] = "Arte Textil"
        i++
        
        stmnt[i] = "Decoración"
        i++
        
        stmnt[i] = "Vidrio"
        i++
        
        stmnt[i] = "Muebles y accesorios"
        i++
        
        stmnt[i] = "Pintura y pinturas"
        i++
        
        stmnt[i] = "Técnicas, equipo, formas"
        i++
        
        stmnt[i] = "Color"
        i++
        
        stmnt[i] = "El simbolismo, la alegoría, la mitología, la leyenda"
        i++
        
        stmnt[i] = "Pinturas de género"
        i++
        
        stmnt[i] = "La religión y el simbolismo religioso"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Las figuras humanas y sus partes"
        i++
        
        stmnt[i] = "Otros temas"
        i++
        
        stmnt[i] = "Geográficas, zonas históricas, el tratamiento las personas"
        i++
        
        stmnt[i] = "Las artes gráficas, grabado y grabados"
        i++
        
        stmnt[i] = "Procesos en relieve (xilografía)"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Litografía (planográfica) los procesos de"
        i++
        
        stmnt[i] = "Cromolitografía y serigrafía"
        i++
        
        stmnt[i] = "Metal grabado"
        i++
        
        stmnt[i] = "Mezzotinting y procesos relacionados"
        i++
        
        stmnt[i] = "Grabado y punta seca"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Imprime"
        i++
        
        stmnt[i] = "Fotografía y fotografías"
        i++
        
        stmnt[i] = "Técnicas, equipos, materiales"
        i++
        
        stmnt[i] = "Metálicos procesos de sal"
        i++
        
        stmnt[i] = "Los procesos de pigmentación de la impresión"
        i++
        
        stmnt[i] = "Holografía"
        i++
        
        stmnt[i] = "La fotografía digital"
        i++
        
        stmnt[i] = "Arte de la computadora"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Campos y clases de fotografía"
        i++
        
        stmnt[i] = "Fotografías"
        i++
        
        stmnt[i] = "Música"
        i++
        
        stmnt[i] = "Principios generales y formas musicales"
        i++
        
        stmnt[i] = "La música vocal"
        i++
        
        stmnt[i] = "Música para voces individuales, la voz"
        i++
        
        stmnt[i] = "Instrumentos y conjuntos instrumentales"
        i++
        
        stmnt[i] = "La música de cámara"
        i++
        
        stmnt[i] = "Teclado y otros instrumentos"
        i++
        
        stmnt[i] = "Instrumentos de cuerda (Cordófonos)"
        i++
        
        stmnt[i] = "Los instrumentos de viento (Aerófonos)"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Artes recreativas y de realizar"
        i++
        
        stmnt[i] = "Espectáculos Públicos"
        i++
        
        stmnt[i] = "Presentaciones escénicas"
        i++
        
        stmnt[i] = "Juegos de interior y diversiones"
        i++
        
        stmnt[i] = "Juegos de interior de la habilidad"
        i++
        
        stmnt[i] = "Los juegos de azar"
        i++
        
        stmnt[i] = "Los deportes atléticos y al aire libre y juegos"
        i++
        
        stmnt[i] = "Acuáticos y deportes al aire"
        i++
        
        stmnt[i] = "Hípica y carreras de animales"
        i++
        
        stmnt[i] = "Pesca, caza, tiro"
        i++
        
        stmnt[i] = "Literatura y retórica"
        i++
        
        stmnt[i] = "Filosofía y teoría"
        i++
        
        stmnt[i] = "Miscelánea"
        i++
        
        stmnt[i] = "Diccionarios y enciclopedias"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Las publicaciones seriadas"
        i++
        
        stmnt[i] = "Organizaciones"
        i++
        
        stmnt[i] = "Educación, investigación, temas relacionados"
        i++
        
        stmnt[i] = "Retórica y colecciones de literatura"
        i++
        
        stmnt[i] = "Historia y crítica literarias"
        i++
        
        stmnt[i] = "La literatura americana en Inglés"
        i++
        
        stmnt[i] = "Poesía"
        i++
        
        stmnt[i] = "Drama"
        i++
        
        stmnt[i] = "Ficción"
        i++
        
        stmnt[i] = "Ensayos"
        i++
        
        stmnt[i] = "Discursos"
        i++
        
        stmnt[i] = "Cartas"
        i++
        
        stmnt[i] = "La sátira y humor"
        i++
        
        stmnt[i] = "Otros escritos"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Literaturas Inglés Inglés y Antiguo"
        i++
        
        stmnt[i] = "Inglés poesía"
        i++
        
        stmnt[i] = "Inglés teatro"
        i++
        
        stmnt[i] = "Ficción Inglés"
        i++
        
        stmnt[i] = "Ensayos Inglés"
        i++
        
        stmnt[i] = "Discursos Inglés"
        i++
        
        stmnt[i] = "Cartas de Inglés"
        i++
        
        stmnt[i] = "Inglés sátira y humor"
        i++
        
        stmnt[i] = "Escritos varios Inglés"
        i++
        
        stmnt[i] = "Inglés Antiguo (Anglosajón)"
        i++
        
        stmnt[i] = "Literaturas de las lenguas germánicas"
        i++
        
        stmnt[i] = "La poesía alemana"
        i++
        
        stmnt[i] = "Drama alemán"
        i++
        
        stmnt[i] = "La novela alemana"
        i++
        
        stmnt[i] = "Ensayos alemán"
        i++
        
        stmnt[i] = "Discursos alemán"
        i++
        
        stmnt[i] = "Las letras alemanas"
        i++
        
        stmnt[i] = "La sátira y el humor alemán"
        i++
        
        stmnt[i] = "Escritos varios alemán"
        i++
        
        stmnt[i] = "Otras literaturas germánicas"
        i++
        
        stmnt[i] = "Literaturas de las lenguas romances"
        i++
        
        stmnt[i] = "La poesía francesa"
        i++
        
        stmnt[i] = "Drama francés"
        i++
        
        stmnt[i] = "Literatura francesa"
        i++
        
        stmnt[i] = "Ensayos franceses"
        i++
        
        stmnt[i] = "Discursos franceses"
        i++
        
        stmnt[i] = "Las letras francesas"
        i++
        
        stmnt[i] = "La sátira y el humor francés"
        i++
        
        stmnt[i] = "Francés escritos misceláneos"
        i++
        
        stmnt[i] = "Provenzal y catalán"
        i++
        
        stmnt[i] = "Italiano, rumano, romanche"
        i++
        
        stmnt[i] = "La poesía italiana"
        i++
        
        stmnt[i] = "Drama italiano"
        i++
        
        stmnt[i] = "Ficción italiana"
        i++
        
        stmnt[i] = "Ensayos italiano"
        i++
        
        stmnt[i] = "Discursos italiano"
        i++
        
        stmnt[i] = "Las letras italianas"
        i++
        
        stmnt[i] = "Sátira italianos y humor"
        i++
        
        stmnt[i] = "Escritos varios italianos"
        i++
        
        stmnt[i] = "Rumania y Rhaeto románico-"
        i++
        
        stmnt[i] = "Literaturas española y portuguesa"
        i++
        
        stmnt[i] = "La poesía española"
        i++
        
        stmnt[i] = "Teatro español"
        i++
        
        stmnt[i] = "La ficción española"
        i++
        
        stmnt[i] = "Ensayos español"
        i++
        
        stmnt[i] = "Discursos español"
        i++
        
        stmnt[i] = "Las letras españolas"
        i++
        
        stmnt[i] = "La sátira española y humor"
        i++
        
        stmnt[i] = "Español escritos misceláneos"
        i++
        
        stmnt[i] = "Portugués"
        i++
        
        stmnt[i] = "Literaturas cursiva; América"
        i++
        
        stmnt[i] = "La poesía latina,"
        i++
        
        stmnt[i] = "La poesía latina dramática y teatro"
        i++
        
        stmnt[i] = "América poesía épica y la ficción"
        i++
        
        stmnt[i] = "América poesía lírica"
        i++
        
        stmnt[i] = "Los discursos de América"
        i++
        
        stmnt[i] = "Las letras latinas"
        i++
        
        stmnt[i] = "América sátira y humor"
        i++
        
        stmnt[i] = "América escritos misceláneos"
        i++
        
        stmnt[i] = "Literaturas de otras lenguas itálicas"
        i++
        
        stmnt[i] = "Helénica literaturas, griego clásico"
        i++
        
        stmnt[i] = "La poesía griega clásica"
        i++
        
        stmnt[i] = "El drama clásico griego"
        i++
        
        stmnt[i] = "La poesía épica griega clásica y la ficción"
        i++
        
        stmnt[i] = "La poesía lírica griega clásica"
        i++
        
        stmnt[i] = "Clásica discursos griego"
        i++
        
        stmnt[i] = "Las letras griegas clásicas"
        i++
        
        stmnt[i] = "La sátira clásica griega y humor"
        i++
        
        stmnt[i] = "Escritos varios griegos clásicos"
        i++
        
        stmnt[i] = "El griego moderno"
        i++
        
        stmnt[i] = "Literatura en otras lenguas"
        i++
        
        stmnt[i] = "Indoeuropeas orientales y célticas"
        i++
        
        stmnt[i] = "Afro-asiática literaturas semíticas"
        i++
        
        stmnt[i] = "No-semita afro-asiática literaturas"
        i++
        
        stmnt[i] = "Ural-altaica, paleosiberianas, Dravidian"
        i++
        
        stmnt[i] = "Literaturas del Asia oriental y sudoriental"
        i++
        
        stmnt[i] = "Literaturas africanas"
        i++
        
        stmnt[i] = "América del Norte natal literaturas"
        i++
        
        stmnt[i] = "América del Sur natal literaturas"
        i++
        
        stmnt[i] = "Otras literaturas"
        i++
        
        stmnt[i] = "Historia y geografía"
        i++
        
        stmnt[i] = "Filosofía y teoría"
        i++
        
        stmnt[i] = "Sin asignar"
        i++
        
        stmnt[i] = "Diccionarios y enciclopedias"
        i++
        
        stmnt[i] = "Relatos colectivos de acontecimientos"
        i++
        
        stmnt[i] = "Las publicaciones seriadas"
        i++
        
        stmnt[i] = "Organizaciones y gestión"
        i++
        
        stmnt[i] = "Educación, investigación, temas relacionados"
        i++
        
        stmnt[i] = "Con respecto al tipo de personas"
        i++
        
        stmnt[i] = "La historia del mundo"
        i++
        
        stmnt[i] = "Geografía y viajes"
        i++
        
        stmnt[i] = "Geografía histórica"
        i++
        
        stmnt[i] = "Las representaciones gráficas de la tierra"
        i++
        
        stmnt[i] = "Mundo antiguo"
        i++
        
        stmnt[i] = "Europa"
        i++
        
        stmnt[i] = "Asia"
        i++
        
        stmnt[i] = "África"
        i++
        
        stmnt[i] = "América del Norte"
        i++
        
        stmnt[i] = "América del Sur"
        i++
        
        stmnt[i] = "Más temas"
        i++
        
        stmnt[i] = "Biografía, genealogía, insignias"
        i++
        
        stmnt[i] = "Esta gama se reserva como un lugar opcional para las biografías"
        i++
        
        stmnt[i] = "Esta gama se reserva como un lugar opcional para las biografías."
        i++
        
        stmnt[i] = "Esta gama se reserva como un lugar opcional para las biografías."
        i++
        
        stmnt[i] = "Esta gama se reserva como un lugar opcional para las biografías."
        i++
        
        stmnt[i] = "Esta gama se reserva como un lugar opcional para las biografías."
        i++
        
        stmnt[i] = "Esta gama se reserva como un lugar opcional para las biografías."
        i++
        
        stmnt[i] = "Esta gama se reserva como un lugar opcional para las biografías."
        i++
        
        stmnt[i] = "Esta gama se reserva como un lugar opcional para las biografías."
        i++
        
        stmnt[i] = "Genealogía, nombres, insignias"
        i++
        
        stmnt[i] = "Historia del mundo antiguo"
        i++
        
        stmnt[i] = "Historia del mundo antiguo, China"
        i++
        
        stmnt[i] = "Historia del mundo antiguo, Egipto"
        i++
        
        stmnt[i] = "Historia del mundo antiguo; Palestina"
        i++
        
        stmnt[i] = "Historia del mundo antiguo; India"
        i++
        
        stmnt[i] = "Historia del mundo antiguo, Mesopotamia y Meseta Iraní"
        i++
        
        stmnt[i] = "Historia del mundo antiguo, Europa del norte y oeste de Italia"
        i++
        
        stmnt[i] = "Historia del mundo antiguo, Italia y territorios adyacentes"
        i++
        
        stmnt[i] = "Historia del mundo antiguo, Grecia"
        i++
        
        stmnt[i] = "Historia del mundo antiguo; otras partes del mundo antiguo"
        i++
        
        stmnt[i] = "Historia general de Europa"
        i++
        
        stmnt[i] = "Historia general de Europa, las Islas Británicas"
        i++
        
        stmnt[i] = "Historia general de Europa, Inglaterra y Gales"
        i++
        
        stmnt[i] = "Historia general de Europa, Europa central, Alemania"
        i++
        
        stmnt[i] = "Historia general de Europa, Francia y Mónaco"
        i++
        
        stmnt[i] = "Historia general de Europa, la península italiana y las islas adyacentes"
        i++
        
        stmnt[i] = "Historia general de Europa, la Península Ibérica y las islas adyacentes"
        i++
        
        stmnt[i] = "Historia general de Europa, Europa Oriental, Rusia"
        i++
        
        stmnt[i] = "Historia general de Europa, el norte de Europa, Escandinavia"
        i++
        
        stmnt[i] = "Historia general de Europa, otras partes de Europa"
        i++
        
        stmnt[i] = "Historia general de Asia, el Lejano Oriente"
        i++
        
        stmnt[i] = "Historia general de Asia, China y áreas adyacentes"
        i++
        
        stmnt[i] = "Historia general de Asia, Japón"
        i++
        
        stmnt[i] = "Historia general de Asia, la Península Arábiga y áreas adyacentes"
        i++
        
        stmnt[i] = "Historia general de Asia, Asia del Sur, India"
        i++
        
        stmnt[i] = "Historia general de Asia, Irán"
        i++
        
        stmnt[i] = "Historia general de Asia, Medio Oriente (Cercano Oriente)"
        i++
        
        stmnt[i] = "Historia general de Asia, Siberia (Rusia asiática)"
        i++
        
        stmnt[i] = "Historia general de Asia, Asia Central"
        i++
        
        stmnt[i] = "Historia general de Asia, el sudeste de Asia"
        i++
        
        stmnt[i] = "Historia general de África"
        i++
        
        stmnt[i] = "Historia general de África, Túnez y Libia"
        i++
        
        stmnt[i] = "Historia general de África, Egipto y Sudán"
        i++
        
        stmnt[i] = "Historia general de África, Etiopía"
        i++
        
        stmnt[i] = "Historia general de África, Marruecos y las Islas Canarias"
        i++
        
        stmnt[i] = "Historia general de África, Argelia"
        i++
        
        stmnt[i] = "Historia general de África, África Occidental y las islas del litoral"
        i++
        
        stmnt[i] = "Historia general de África, África Central y las islas del litoral"
        i++
        
        stmnt[i] = "Historia general de África, África del Sur"
        i++
        
        stmnt[i] = "Historia general de África del Sur islas del Océano Índico"
        i++
        
        stmnt[i] = "Historia General de América del Norte"
        i++
        
        stmnt[i] = "Historia General de América del Norte, Canadá"
        i++
        
        stmnt[i] = "Historia General de América del Norte, América Central, México"
        i++
        
        stmnt[i] = "Historia General de América del Norte, Estados Unidos"
        i++
        
        stmnt[i] = "Historia General de América del Norte, noreste de Estados Unidos"
        i++
        
        stmnt[i] = "Historia General de América del Norte, sureste de Estados Unidos"
        i++
        
        stmnt[i] = "Historia General de América del Norte, Centro-sur de Estados Unidos"
        i++
        
        stmnt[i] = "Historia General de América del Norte, Norte central de Estados Unidos"
        i++
        
        stmnt[i] = "Historia General de América del Norte, Oeste de Estados Unidos"
        i++
        
        stmnt[i] = "Historia General de América del Norte, la pendiente de la Gran Cuenca y el Pacífico"
        i++
        
        stmnt[i] = "Historia General de América del Sur"
        i++
        
        stmnt[i] = "Historia General de América del Sur, Brasil"
        i++
        
        stmnt[i] = "Historia General de América del Sur, Argentina"
        i++
        
        stmnt[i] = "Historia General de América del Sur, Chile"
        i++
        
        stmnt[i] = "Historia General de América del Sur, Bolivia"
        i++
        
        stmnt[i] = "Historia General de América del Sur, Perú"
        i++
        
        stmnt[i] = "Historia General de América del Sur, Colombia y Ecuador"
        i++
        
        stmnt[i] = "Historia General de América del Sur, Venezuela"
        i++
        
        stmnt[i] = "Historia General de América del Sur Guayana"
        i++
        
        stmnt[i] = "Historia General de América del Sur, Paraguay y Uruguay"
        i++
        
        stmnt[i] = "Historia general de otras áreas"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "[Sin asignar]"
        i++
        
        stmnt[i] = "Historia general de otras áreas, Nueva Zelanda"
        i++
        
        stmnt[i] = "Historia general de otras áreas, Australia"
        i++
        
        stmnt[i] = "Historia general de otras áreas, Melanesia y Nueva Guinea"
        i++
        
        stmnt[i] = "Historia general de otras áreas, otras partes del Pacífico, Polinesia"
        i++
        
        stmnt[i] = "Historia general de otras áreas, las islas del Océano Atlántico"
        i++
        
        stmnt[i] = "Historia general de otras áreas, el Ártico y la Antártida islas"
        i++
        
        stmnt[i] = "Mundos extraterrestres"
        i++
            
/*      
def static main()
    db  : Database
    end : bool = false
    
    Database.open ("/tmp/.db.sqlite", out db)
    var a = new DeweyDb (ref db, ref end)
    if end == true
        print "should be done"
    
*/
