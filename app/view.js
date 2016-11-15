"use strict";
var ViewModule;
(function (ViewModule) {
    var bodytemplate = "<div class=\"window\">\n    <header class=\"toolbar toolbar-header\">\n      <!-- Large button group -->\n      <div id='HeaderMenu' class=\"btn-group\">\n        \n      </div>\n    </header>\n    <div class=\"window-content\">\n      <div class=\"pane-group\">\n        <div class=\"pane-sm sidebar\">\n          <nav id=\"NavServers\" class=\"nav-group\">\n            <h5 class=\"nav-group-title\">Servers</h5>\n            <a class=\"nav-group-item\">\n              <div>\n              <span class=\"icon icon-database\"></span> Local\n              <div style=\"font-size:10px\">port: 27017 - user: admin</div>\n              \n              </div>\n            </a>\n            <span class=\"nav-group-item\">\n                    <span class=\"icon icon-database\"></span> T6\n            </span>\n            <span class=\"nav-group-item\">\n                     <span class=\"icon icon-database\"></span> SRVLOGS\n            </span>\n           \n          </nav>\n          <nav class=\"nav-group\">\n            <h5 class=\"nav-group-title\">Collections</h5>\n            <a class=\"nav-group-item active\">\n              <div>\n              <span class=\"icon icon-cc-zero\"></span> Collection1\n              <div style=\"font-size:10px\">kkk</div>\n              \n              </div>\n            </a>\n            \n           \n          </nav>\n        </div>\n        <div class=\"pane\">\n        <div class=\"tab-group\">\n  <div class=\"tab-item\">\n    <span class=\"icon icon-cancel icon-close-tab\"></span>\n    Tab\n  </div>\n  <div class=\"tab-item active\">\n    <span class=\"icon icon-cancel icon-close-tab\"></span>\n    Tab active\n  </div>\n  <div class=\"tab-item\">\n    <span class=\"icon icon-cancel icon-close-tab\"></span>\n    Tab\n  </div>\n  <div class=\"tab-item tab-item-fixed\">\n    <span class=\"icon icon-plus\"></span>\n  </div>\n</div>\n        \n        \n        \n        </div>\n      </div>\n    </div>\n    <footer class=\"toolbar toolbar-footer\">\n      <textarea role=\"5\" style=\"width:100%; background-color:black; color:green;\"></textarea>\n    </footer>\n  </div>'";
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
    function AddNavServerItem(iconClass, itemId, title, subtitle, click_function) {
        var titleIcon = document.createElement('span');
        titleIcon.className = "icon {0}".replace('{0}', iconClass);
        var titleSpan = document.createElement('span');
        titleSpan.innerHTML = title;
        var subtitleDiv = document.createElement('div');
        subtitleDiv.innerHTML = subtitle;
        var container = document.createElement("div");
        container.appendChild(titleIcon);
        container.appendChild(titleSpan);
        container.appendChild(subtitleDiv);
        var navgroupitem = document.createElement("a");
        navgroupitem.className = "nav-group-item";
        navgroupitem.id = itemId;
        navgroupitem.appendChild(container);
        navgroupitem.addEventListener("click", click_function);
        AddNavServerElement(navgroupitem);
    }
    ViewModule.AddNavServerItem = AddNavServerItem;
    function GetHeaderMenuId() {
        return 'HeaderMenu';
    }
    function GetNavServersId() {
        return 'NavServers';
    }
    function AddHeaderMenuElement(element) {
        AddElement(GetHeaderMenuId(), element);
    }
    function AddNavServerElement(element) {
        AddElement(GetNavServersId(), element);
    }
    function AddElement(parentId, element) {
        document.getElementById(parentId).appendChild(element);
    }
})(ViewModule = exports.ViewModule || (exports.ViewModule = {}));
//# sourceMappingURL=view.js.map