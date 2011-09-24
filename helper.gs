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
       
        
class Loading    : GLib.Object
    builder     : Builder
    localPath   : string
    window      : Window
    
    event isDone ()
                
    construct (ref args : unowned array of string)
        localPath = Path.get_dirname(args[0])
        builder = new Builder ()
        callback : SourceFunc = verify
        uiPath : string  = localPath +  "/bookzen.ui"
                
        try
            builder.add_from_file (uiPath)
            
            window      = builder.get_object ("initDlg") as Window
            
            window.show_all ()
            window.destroy.connect (this.terminate)
            Idle.add (callback)
            
        except e: Error
            error ("%s\nDoh, that means the UI can't be loaded: ", e.message)
            
    [CCode (instance_pos = -1)] [CCode (cname = "G_MODULE_EXPORT loading_terminate")] 
    def terminate ()
        isDone ()
        main_quit ()
        
    def verify() : bool
        
        tmp : string = Environment.get_tmp_dir ()
        tmp += "/bookzenlock"
        
        if FileUtils.test (tmp,FileTest.EXISTS)
            FileUtils.remove (tmp)
            window.destroy ()
            return false
        
        return true
                
init
    Gtk.init  (ref args)
    a : Loading = new Loading (ref args)
    a.isDone.connect (isFinished)
    Gtk.main ()
    
def isFinished ()
    print "Done"
