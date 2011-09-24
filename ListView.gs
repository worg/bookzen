[indent = 4]
namespace Gtk

    class ListView  : TreeView
        iter        : TreeIter
        listStore   : ListStore
        cell        : CellRendererText
        nCols       : private int      
        
        construct (lstStore : ListStore, colContent : array of string)
            listStore = lstStore
            set_model(listStore)
            cell = new CellRendererText()
            
            i : int = 0
            for c in colContent
                insert_column_with_attributes(-1, c, cell, "text", i, null)
                var column = get_column(i)
                column.resizable = true
                column.set_sort_column_id (i)
                i++
                
            nCols = i
            reorderable = true
            rules_hint = true
            enable_search = true
            headers_clickable = true
    
        def clear()
            listStore.clear()
    
        def append(data : array of string)
            i : int = 0
            listStore.append(out iter)
            for d in data
                listStore.set_value(iter, i, d)
                i++
            listStore.set(iter, -1)
            
/*
init
    Gtk.init(ref args)
    var w = new Gtk.Window()
    var ls = new Gtk.ListStore(4 , typeof(string), typeof(string),
                                   typeof(string), typeof(string))
                                   
    sn : array of string = {"This", "is", "a", "sample"}
    snv : array of string = {"Demo", "of", "filling", "listViews"}
    var lv = new Gtk.ListView(ls, sn )
    lv.append(sn)
    lv.append(snv)
    
    w.add(lv)
    w.show_all()
    w.destroy.connect(Gtk.main_quit)
    Gtk.main()
    
*/
