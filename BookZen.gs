[indent = 4]

/*
*       Copyright 2010 Hiram Jeronimo Perez "wøRg" <worg@linuxmail.org>
*
*      This program is free software; you can redistribute it and/or modify
*       it under the terms of the GNU General Public License version 3
*		as published by the Free Software Foundation; .
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
    Gtk
    Sqlite
    
class BookZen : GLib.Object
    builder     : Builder
    localPath   : string
    homePath    : string = Environment.get_home_dir ()
    dbPath      : string
    bm          : BookModel
    db          : Database
    window      : Window
    initDlg     : Window
    errorD      : MessageDialog
    btnBox      : HButtonBox
    modeBtn     : ModeButton 
    homeFrame   : AspectFrame
    regFrame    : Box
    srchFrame   : Box
    orderFrame  : Viewport
    homeImg     : Image
    entryLast   : Entry
    entryMid    : Entry
    entryName   : Entry
    entryTit    : Entry
    entryEdit   : Entry
    entryPlace  : Entry
    entryEditor : Entry
    entryYear   : Entry
    entrySerie  : Entry
    comboClass  : ComboBox
    srCombo     : ComboBox
    
    srchTit     : Entry
    srchAut     : Entry
    srchClass   : Entry
    srchView    : ScrolledWindow
    orderView   : ScrolledWindow
    srchResults : ListView
    orderField  : ListView
    comboLst    : ListStore
    comboIter   : TreeIter
        
    construct (ref args : unowned array of string)
        localPath = Path.get_dirname(args[0])
        
        builder = new Builder ()
        dbPath  = homePath + "/.config/bookzen/db.sqlite"
        uiPath : string  = localPath +  "/bookzen.ui"
        
        
        try
            builder.add_from_file (uiPath)
            
            window      = builder.get_object ("bookzen") as Window
            initDlg      = builder.get_object ("initDlg") as Window
            errorD      = builder.get_object ("errorDialog") as MessageDialog
            
            btnBox      = builder.get_object ("BtnBox") as HButtonBox
            modeBtn     = new ModeButton()
            
            homeFrame   = builder.get_object ("homeFrame") as AspectFrame
            regFrame    = builder.get_object ("registerFrame") as Box
            srchFrame   = builder.get_object ("searchFrame") as Box
            orderFrame  = builder.get_object ("orderFrame") as Viewport
            homeImg     = builder.get_object ("homeImg") as Image
            entryLast   = builder.get_object ("entryLast") as Entry
            entryMid    = builder.get_object ("entryMid") as Entry
            entryName   = builder.get_object ("entryName") as Entry
            entryTit    = builder.get_object ("entryTit") as Entry
            entryEdit   = builder.get_object ("entryEdit") as Entry
            entryPlace  = builder.get_object ("entryPlace") as Entry
            entryEditor = builder.get_object ("entryEditor") as Entry
            entryYear   = builder.get_object ("entryYoE") as Entry
            entrySerie  = builder.get_object ("entrySerie") as Entry
            comboClass  = builder.get_object ("comboClass") as ComboBox
            srCombo     = builder.get_object ("srCombo") as ComboBox
                        
            srchTit   = builder.get_object ("searchTit") as Entry
            srchAut   = builder.get_object ("searchAut") as Entry
            srchClass = builder.get_object ("searchClas") as Entry
            
            srchView  = builder.get_object ("searchResult") as ScrolledWindow
            orderView = builder.get_object ("orderView") as ScrolledWindow
            
            itemStock : array of string = {Stock.EDIT, Stock.FIND, Stock.INDEX}
            itemLbl   : array of string = {"_Registrar", "_Buscar", "_Ordenar"}
            
            for i : int = 0 to 2
                var h = new HBox(false, 0)
                var l = new Label.with_mnemonic (itemLbl[i])
                var im = new Image.from_stock(itemStock[i], IconSize.MENU)
                h.add(im)
                h.add(l)
                h.show_all()
                modeBtn.append(h)
                
            initListViews ()
            
            btnBox.pack_start (modeBtn)
            srchView.add(srchResults)
            orderView.add(orderField)
            homeImg.set_from_file(localPath + "/books.png")   
            
            builder.connect_signals(this)
            modeBtn.mode_changed.connect (setView)
            
            window.default_width = 800
            window.default_height = 600
            srchView.set_policy(PolicyType.AUTOMATIC, PolicyType.AUTOMATIC)
            orderView.set_policy(PolicyType.AUTOMATIC, PolicyType.AUTOMATIC)
            modeBtn.show_all()
            srchView.show_all()
            orderView.show_all()
            window.show_all ()
            
            if !FileUtils.test (dbPath, FileTest.IS_REGULAR)
                firstRun()
            else
                bm = new BookModel(dbPath)
                db = #bm.db
                initComboData ()                   
        except e: Error
            error ("%s\nDoh, that means the UI can't be loaded", e.message)
            
    def initListViews ()
        var srchLst = new ListStore(9, typeof(string), typeof(string),
                                      typeof(string), typeof(string),
                                      typeof(string), typeof(string), 
                                      typeof(string), typeof(string),
                                      typeof(string))

        var orderLst = new ListStore(9, typeof(string), typeof(string),
                                      typeof(string), typeof(string),
                                      typeof(string), typeof(string), 
                                      typeof(string), typeof(string),
                                      typeof(string))
        
        comboLst = new ListStore(2, typeof(string), typeof(string))
                    
        hdrs : array of string
        hdrs = {"Autor", "Título", "Edición", "Lugar de Edición",
                "Editorial", "Año de Edición", "Serie o Colección",
                "Clasificación (No.)", "Clasificación"}
                
        srchResults = new ListView(srchLst, hdrs)
        orderField = new ListView(orderLst, hdrs)
        orderField = new ListView(orderLst, hdrs)
        comboClass.set_model(comboLst)
        srCombo.set_model(comboLst)

    def async initComboData ()
        var cell = new CellRendererText()
        comboClass.pack_start(cell, true)
        comboClass.set_attributes (cell, "text", 0)
        
        cell = new CellRendererText()
        srCombo.pack_start(cell, true)
        srCombo.set_attributes (cell, "text", 0)
        var stmnt = "SELECT * FROM class"
        
        db.exec (stmnt, setComboD, null)
        
        
    def setComboD (nColumns : int, values : array of string, colNames : array of string) : int
        comboLst.append(out comboIter)
        comboLst.set_value(comboIter, 0, values[1])
        comboLst.set_value(comboIter, 1, values[0])
        
        
        comboLst.set(comboIter, -1)
        return 0
        
    def firstRun ()
        /*waitPID : Pid
        waitRun : array of string = {"helper", null }*/
        callback : SourceFunc = showDlg
        DirUtils.create_with_parents (homePath + "/.config/bookzen/", 0755)
        //window.hide ()        
        //initDlg.show_all ()
        
        bm = new BookModel (dbPath)
        bm.isDone.connect (isDb)
        Timeout.add (3,callback)
        bm.initDewey ()
                
    def isDb ()
        print "\n DEBUG \n---hi---\n DEBUG \n"
        db = #bm.db
        initComboData.begin ()
        window.show_all ()
        initDlg.destroy ()
        
    def showDlg () : bool
        if !initDlg.visible
            initDlg.show_all ()
            print "show dialog"        
        return true
        
    [CCode (instance_pos = -1)] [CCode (cname = "G_MODULE_EXPORT book_zen_terminate")] 
    def terminate (widget : Widget)
        main_quit ()
        
    def setView (index : int, widget : Widget)
        if (this.homeFrame.visible)
            this.homeFrame.visible = false
            this.homeFrame.destroy()
        if 0 == index
            this.srchFrame.hide ()
            this.orderFrame.hide ()
            this.srchFrame.visible = false
            this.orderFrame.visible = false
            if(this.regFrame.no_show_all) //nasty hack
                this.regFrame.no_show_all = false
                this.window.show_all ()
            else
                this.regFrame.visible = true
                this.regFrame.show_all()
        else if 1 == index
            this.regFrame.hide ()
            this.orderFrame.hide ()
            this.regFrame.visible = false
            this.orderFrame.visible = false
            this.srchFrame.visible = true
            this.srchFrame.show_all ()
        else if 2 == index
            this.regFrame.visible = false
            this.srchFrame.visible = false
            this.orderFrame.visible = true
            this.regFrame.hide ()
            this.srchFrame.hide ()
            this.orderFrame.show_all ()
            orderField.clear ()
            db.exec ("SELECT * FROM books ORDER BY clasifn", order)
    
    def clearTexts ()
        entryLast.set_text ("Apellido Paterno")
        entryMid.set_text ("Apellido Materno")
        entryName.set_text ("Nombre(s)")
        entryTit.set_text ("")
        entryEdit.set_text ("")
        entryPlace.set_text ("")
        entryEditor.set_text ("")
        entryYear.set_text ("")
        entrySerie.set_text ("")
        comboClass.set_active (-1)
        srCombo.set_active (-1)
        srchAut.set_text ("")
        srchTit.set_text ("")

    def find (nColumns : int, values : array of string, colNames : array of string) : int
        i : int
        name : string
        val : array of string
        val = new array of string[9]
        
        name = string.join (" ", values[0], values[1], values[2])
        val[0] = name
        
        for i = 1 to 8
            val[i] = values[i + 2]
        
        srchResults.append (val)
        
        return 0
    
    def order (nColumns : int, values : array of string, colNames : array of string) : int
        i : int
        name : string
        val : array of string
        val = new array of string[9]
        
        name = string.join (" ", values[0], values[1], values[2])
        val[0] = name
        
        for i = 1 to 8
            val[i] = values[i + 2]
        orderField.append (val)
        
        return 0
    
    [CCode (instance_pos = -1)] [CCode (cname = "G_MODULE_EXPORT book_zen_search")]
    def search (widget : Widget?)
        aut       : array of string = srchAut.text.up ().split (" ")
        tit       : array of string = srchTit.text.up ().split (" ")
        clasn     : string = srCombo.get_active().to_string()
        stmnt     : string
        srchT     : string
        sqlResult : int = Sqlite.OK
        srchResults.clear ()
        clearTexts ()
        
        if aut[0] != null
            for term in aut
                srchT = "'%" + term + "%'"
                stmnt = "SELECT * FROM books WHERE name like " + srchT +" OR (lastNm LIKE " + srchT + " OR midNm LIKE " + srchT + ")"
                sqlResult = db.exec (stmnt, find, null)
        else if tit[0] != null
            for term in tit
                srchT = "'%" + term + "%'"
                stmnt = "SELECT * FROM books WHERE title LIKE " + srchT
                sqlResult = db.exec (stmnt, find, null)
        else
            clasn = "'" + clasn + "'"
            stmnt = "SELECT * FROM books WHERE clasifn = " + clasn
            sqlResult = db.exec (stmnt, find, null)
            
        if (sqlResult != Sqlite.OK)
            error ("SQL error: %d, %s\n", sqlResult, db.errmsg ())
            
    [CCode (instance_pos = -1)] [CCode (cname = "G_MODULE_EXPORT book_zen_cancelSave")]
    def cancelSave ( widget : Widget?)
        clearTexts()
    
    [CCode (instance_pos = -1)] [CCode (cname = "G_MODULE_EXPORT book_zen_save")]
    def save (widget : Widget?)
        last    : string = entryLast.text.up ()
        mid     : string = entryMid.text.up ()
        name    : string = entryName.text.up ()
        title   : string = entryTit.text.up ()
        edition : string = entryEdit.text.up ()
        place   : string = entryPlace.text.up ()
        editor  : string = entryEditor.text.up ()
        year    : string = entryYear.text.up ()
        serie   : string = entrySerie.text.up ()
        clasn   : string = comboClass.get_active().to_string()
        clas    : string 
                
        comboClass.get_active_iter(out comboIter)
        comboLst.get(comboIter, 0, out clas, -1)
        
        clas = clas.up()
                
        data : array of string = {last, mid, name, title, edition, place, editor, year, serie, clasn, clas}
        showDialog : bool = false
        
        for d in data
            if "" == d
            showDialog = true
        
        if (showDialog)
            errorD.set_property ("text", "Hay información incompleta")
            errorD.format_secondary_text ("No se puede guardar por que hay información faltante,\nverifique los datos y reintente")
            errorD.run ()
            errorD.hide ()
        else
            i : int = 0
            for d in data 
                d = "'" + d + "'"
                data[i] = d
                i++
                
            stmnt : string = "INSERT INTO books "
            stmnt += "VALUES (" + string.joinv (", ", data) + ")"
            db.exec (stmnt)
            clearTexts ()
        
    [CCode (instance_pos = -1)] [CCode (cname = "G_MODULE_EXPORT book_zen_delSuggest")] 
    def delSuggest (entry : Entry?)
        entry.set_text ("")
        
init
    Gtk.init  (ref args) //gtk must be initialized when using GtkBuilder, otherwise the program will segfault
    app : BookZen = new BookZen (ref args)
    Gtk.main ()
