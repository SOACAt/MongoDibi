"use strict";
var ViewModule;
(function (ViewModule) {
    var bodytemplate = "<div class=\"window\">\n    <header class=\"toolbar toolbar-header\">\n      <!-- Large button group -->\n      <div id='HeaderMenu' class=\"btn-group\">\n        \n      </div>\n    </header>\n    <div class=\"window-content\">\n      <div class=\"pane-group\">\n        <div class=\"pane-sm sidebar\">\n          <nav class=\"nav-group\">\n            <h5 class=\"nav-group-title\">Servers</h5>\n            <a class=\"nav-group-item active\">\n              <span class=\"icon icon-database\"></span> Local\n            </a>\n            <span class=\"nav-group-item\">\n                    <span class=\"icon icon-database\"></span> T6\n            </span>\n            <span class=\"nav-group-item\">\n                     <span class=\"icon icon-database\"></span> SRVLOGS\n            </span>\n           \n          </nav>\n        </div>\n        <div class=\"pane\">...</div>\n      </div>\n    </div>\n    <footer class=\"toolbar toolbar-footer\">\n      <textarea role=\"5\" style=\"width:100%; background-color:black; color:green;\"></textarea>\n    </footer>\n  </div>'";
    function CreateBody() {
        document.body.innerHTML = bodytemplate;
    }
    ViewModule.CreateBody = CreateBody;
    function AddHeaderMenuIconButton(iconClass, click_function) {
        var button = document.createElement('button');
        button.className = "btn btn-large btn-default";
        var span = document.createElement('span');
        span.className = "icon {0}".replace('{0}', iconClass);
        button.appendChild(span);
        button.addEventListener("click", click_function);
        AddHeaderMenuElement(button);
    }
    ViewModule.AddHeaderMenuIconButton = AddHeaderMenuIconButton;
    function GetHeaderMenuId() {
        return 'HeaderMenu';
    }
    function AddHeaderMenuElement(element) {
        document.getElementById(GetHeaderMenuId()).appendChild(element);
    }
})(ViewModule = exports.ViewModule || (exports.ViewModule = {}));
//# sourceMappingURL=view.js.map