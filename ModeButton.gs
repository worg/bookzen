[indent = 4]

/*
ModeButton.gs

Copyright (C) 2008 Christian Hergert <chris@dronelabs.com>
modified by Mathijs Henquet <mathijs.henquet@gmail.com>
modified by Hiram Jeronimo Perez "wøRg" <worg@linuxmail.org>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

uses
    Gdk
    
namespace Gtk
    class ModeButton : EventBox
        event mode_added(index : int, widget : Widget)
        event mode_removed(index : int, widget : Widget)
        event mode_changed(index : int, widget : Widget)
        
        _selected : private int = -1
        _hovered : private int  = -1
        _mstyle : private int = 1
        box : private HBox
        button : Button
        init
            this.add_events(EventMask.POINTER_MOTION_MASK | 
                            EventMask.BUTTON_PRESS_MASK   |
                            EventMask.VISIBILITY_NOTIFY_MASK)
            
            this.box = new HBox(true, 1)
            this.button = new Button
            this.box.border_width = 0
            add(this.box)
            this.box.show()
            
            leave_notify_event.connect(on_leave_notify_event)            
            button_press_event.connect(on_button_press_event)
            motion_notify_event.connect(on_motion_notify_event)
            scroll_event.connect(on_scroll_event)
            expose_event.connect(on_expose_event)
            
        prop selected : int
            get
                return this._selected
                
            set
                if (value < -1 || value >= box.get_children().length())
                    return
                    
                if (_selected >= 0)
                    box.get_children ().nth_data(_selected).set_state(StateType.NORMAL)
                    
                _selected = value
                box.get_children().nth_data(_selected).set_state(StateType.SELECTED)
                queue_draw ()
                
                selectedItem : Widget = value >= 0 ? box.get_children().nth_data(value) : null
                mode_changed(selected, selectedItem)
                
        prop hovered : int
            get
                return _hovered
                
            set
                _hovered = value
                queue_draw ()
                
        prop mstyle : int
            get
                return _mstyle
            
            set
                _mstyle = value
                
        def append(widget : Widget)
            box.pack_start(widget, true, true, 5)
            index : int = (int) box.get_children().length() -2
            mode_added(index, widget)
            
        def new remove(index : int)
            child : Widget = box.get_children().nth_data(index)
            box.remove(child)
            
            if(selected == index)
                _selected = -1
            else if(_selected >= index)
                _selected--
            if(_hovered >= index)
                hovered--
            
            mode_removed(index, child)
            queue_draw ()
            
        def new focus(widget : Widget)
            select : int = box.get_children().index(widget)
            
            if(_selected >= 0)
                box.get_children().nth_data(_selected).set_state(StateType.NORMAL)
                
            _selected = select
            widget.set_state(StateType.SELECTED)
            queue_draw()
            
        def private on_scroll_event(evnt : EventScroll) : bool
            case evnt.direction
                when ScrollDirection.UP
                    if(selected < box.get_children().length() -1)
                        selected++
                    else
                        selected = 0
                when ScrollDirection.DOWN
                    if(selected > 0)
                        selected--
                    else
                        selected = (int) box.get_children().length() -1
                default
                    var d = 1
                    d += d
            queue_draw()
                    
            return true
                
        def private on_button_press_event(evnt : EventButton) : bool
            if(_hovered > -1 && _hovered != _selected)
                selected = _hovered;
                
            return true
                
        def private on_leave_notify_event(evnt : EventCrossing) : bool
            _hovered = -1
            queue_draw()
            
            return false
            
        def private on_motion_notify_event(evnt : EventMotion) : bool
            n_children : int = (int) box.get_children().length()
            
            if(n_children < 1)
                return false
                
            allocation : Allocation
            get_allocation(out allocation)
            
            child_size : double = allocation.width / n_children
            i : int = -1
            
            if(child_size > 0)
                i = (int) (evnt.x / child_size)
                
            if(i >= 0 && i < n_children)
                this.hovered = i
                
            return true
            
        def private on_expose_event(evnt : EventExpose) : bool
            clip_region : Rectangle = Gdk.Rectangle()
            
            this.button.show()
            this.button.hide()
            
            styleA : ShadowType
            styleB : ShadowType
            if(_mstyle == 0)
                styleA = ShadowType.IN
                styleB = ShadowType.OUT
            else //TODO: Add more styles
                styleA = ShadowType.ETCHED_OUT
                styleB = ShadowType.IN
                
                
            
            evnt.window.begin_paint_rect(evnt.area)
            
            n_children : int = (int) box.get_children().length()
            
            style.draw_box (evnt.window,
                            StateType.NORMAL,
                            styleA,
                            evnt.area,
                            this,
                            "button",
                            evnt.area.x,
                            evnt.area.y,
                            evnt.area.width,
                            evnt.area.height)
            
            if(_selected >= 0)
                if(n_children > 1)
                    clip_region.width = evnt.area.width / n_children
                    clip_region.x = (clip_region.width * _selected) + 1
                else
                    clip_region.x = 0
                    clip_region.width = evnt.area.width
                    
                clip_region.y = evnt.area.y
                clip_region.height = evnt.area.height 
                    
                style.draw_box (evnt.window,
                                StateType.SELECTED,
                                styleB,
                                clip_region,
                                this,
                                "button",
                                evnt.area.x,
                                evnt.area.y,
                                evnt.area.width,
                                evnt.area.height)
            if(_hovered >= 0 and _selected != hovered)
                if(n_children > 1)
                    clip_region.width = evnt.area.width / n_children
                    if(hovered == 0)
                        clip_region.x = 0
                    else
                        clip_region.x = clip_region.width * hovered + 1
                else
                    clip_region.x = 0
                    clip_region.width = evnt.area.width
                    
                clip_region.y = evnt.area.y
                clip_region.height = evnt.area.height
                
                style.draw_box (evnt.window, StateType.PRELIGHT,
                                styleA,
                                clip_region,
                                this,
                                "button",
                                evnt.area.x,
                                evnt.area.y,
                                evnt.area.width,
                                evnt.area.height)
            
                                
            for i : int = 1 to n_children
                var offset = (evnt.area.width / n_children) * i
                paint_vline(this.get_style(),
                            evnt.window,
                            StateType.NORMAL,
                            evnt.area,
                            this.button,
                            "button",
                            evnt.area.y + 1,
                            evnt.area.y + evnt.area.height - 2,
                            evnt.area.x + offset +1)
                
            propagate_expose(this.child, evnt)    
            evnt.window.end_paint()
            return true

/*
init
    Gtk.init(ref args)
    var w = new Gtk.Window()
    var m = new Gtk.ModeButton()
    var af = new Gtk.AspectFrame("", 1, 0, 1, true)
    w.destroy.connect(Gtk.main_quit)
    m.show()
    af.add(m)
    af.show()
    w.add(af)
    w.show()
    m.mstyle = 0
    var l1 = new Gtk.Label("Left")
    m.append(l1)
    l1.show()
    
    var l2 = new Gtk.Label("Center")
    m.append(l2)
    l2.show()
    
    var l3 = new Gtk.Label("Right")
    m.append(l3)
    l3.show()
    
    var l4 = new Gtk.Label("FarRight")
    m.append(l4)
    l4.show()
    
    w.set_size_request(640, 480)

    Gtk.main()
	
*/
