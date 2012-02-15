PROGRAM        = bookzen

ARCH           = $(shell uname -s)
VALAC          = valac
VALACOPTS      = -g -D $(ARCH) -X -O3 -X -fomit-frame-pointer -X -lgthread-2.0
PKGS		   = --pkg sqlite3 --pkg gmodule-2.0 --thread --pkg gio-2.0
SRC            = BookZen.gs ListView.gs DeweyDb.gs
ADDS           = ModeButton.gs 
ADDS3          = ModeButton.vala

ifeq ($(ARCH),windows32)
	GTK2           = --pkg gtk+-2.0
	GTK3           = --pkg gtk+-3.0
else
	GTK2           = --pkg gtk+-2.0
	GTK3           = --pkg gtk+-3.0
endif



all:
	@$(VALAC) $(VALACOPTS) $(ADDS) $(PKGS) $(GTK2) $(SRC) -o $(PROGRAM)
            
gtk3:
	@$(VALAC) $(VALACOPTS) $(ADDS3) $(PKGS) $(GTK3) $(SRC) -o $(PROGRAM) 
        
helper:
	@$(VALAC) $(VALACOPTS) $(ADDS) $(PKGS) $(GTK2) helper.gs -o helper
	
# clean all built files
clean:
	@rm -v -fr *~ *.c $(PROGRAM)

