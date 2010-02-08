// Copyright (c) Thaddee Tyl. All rights reserved.
//This program is free software: you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation, either version 3 of the License, or
//(at your option) any later version.
//
//This program is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//GNU General Public License for more details.
//
//You should have received a copy of the GNU General Public License
//along with this program.  If not, see <http://www.gnu.org/licenses/>.
/** RULE.js
 * ---------
 *  This file rules the behaviour of spider, the html page
 *  designed to build html pages.
 */

/* This class creates the EDITABLE FRAME */
var sources;
var editor;
var typeSource = true; // or type WYSIWYG.
function load() {
    sources = new Source();
    editor = new designEditor();
	setTimeout(updateUI, 100);
}
function updateUI() {
	if(typeSource)
		editor.updateView();
	else
		sources.updateView();
	setTimeout(updateUI, 100);
}
function onSource() {
	editor.innerDocument.designMode = "off";
	typeSource = true;
}
function outSource() {
	editor.innerDocument.designMode = "on";
	typeSource = false;
}
function Source() {
    this.view = 0;  // 0 is html source, 1 is CSS
    this.htmlSource = document.getElementById("source");
    this.htmlSource.contentEditable = 'true';
    this.cssSource = document.getElementById("CSS");
    this.cssSource.contentEditable = 'true';
    this.switchTab = function(which) {
        if( which == 1 )
        {   this.htmlSource.style.display = "none";
            this.cssSource.style.display = "block";
            this.view = 1;
        }
        else
        {   this.htmlSource.style.display = "block";
            this.cssSource.style.display = "none";
            this.view = 0;
        }
    }
    this.updateHTML = function() {
        this.htmlSource.textContent = editor.innerDocument.body.innerHTML;
    }
    this.updateCSS = function() {
        this.cssSource.textContent = editor.cssTag.innerHTML;
    }
	this.updateView = function() {
		if(this.view == 0)
			this.updateHTML();
		else
			this.updateCSS();
	}
}

function designEditor() {
	this.frame = document.getElementById("design");
	this.innerDocument = this.frame.contentDocument;
	this.cssTag = this.innerDocument.getElementsByTagName("style")[0];
	this.esc = function( text ) {
		var output = text;
		output = output.replace(/<br>/g,"\n");
		output = output.replace(/&lt;/g,'<').replace(/&gt;/g,'>');
		return output;
	}
	this.updateHTML = function() {
		var target = this.innerDocument;
		var weaver = target.body;
		var source = document.getElementById("source").innerHTML;
		weaver.innerHTML = this.esc(source);
	}
	this.updateCSS = function() {
		var source = document.getElementById("CSS").textContent;
		this.cssTag.textContent = source;
	}
	this.updateView = function() {
		if(sources.view == 0) // html
			this.updateHTML();
		else
			this.updateCSS();
	}
	this.loadHTMLFile = function(uri) {
		frame.setAttribute("src", uri);
	}
}

/* This function is bounded to the file selector */
function loadFile() {
	var fileComponent = document.getElementById("fileselector");
	var uri = fileComponent.value;
	editor.loadHTMLFile(uri);
}

