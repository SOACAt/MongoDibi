"use strict";
var S = require("../win/__sss");
var ViewModule;
(function (ViewModule) {
    var bodytemplate = "<div class=\"window\">\n    <header class=\"toolbar toolbar-header\">\n      <!-- Large button group -->\n      <div id='HeaderMenu' class=\"btn-group\">\n        \n      </div>\n    </header>\n    <div class=\"window-content\">\n      <div class=\"pane-group\">\n        <div class=\"pane-sm sidebar\">\n          <nav id=\"NavServers\" class=\"nav-group\">\n            <h5 class=\"nav-group-title\">Servers</h5>\n          </nav>\n        </div>\n      <div class=\"pane\">\n        <div class=\"tab-group\" id=\"TabServers\">\n        </div>\n      </div>\n      </div>\n    </div>\n    <footer class=\"toolbar toolbar-footer\">\n      <textarea role=\"5\" style=\"width:100%; background-color:black; color:green;\"></textarea>\n    </footer>\n  </div>'";
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
        subtitleDiv.style.fontSize = '60%';
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
    function AddTabItem(id, title, navItems) {
        var _id = "tab" + S.Join + id;
        var _ele = document.getElementById(_id);
        if (_ele === null) {
            var spanHead = document.createElement('span');
            spanHead.className = 'icon icon-cancel icon-close-tab';
            spanHead.addEventListener("click", function () {
                Remove(_id);
            });
            var spanTitle = document.createElement('span');
            spanTitle.innerHTML = title;
            var tabItem = document.createElement('div');
            tabItem.className = 'tab-item';
            tabItem.appendChild(spanHead);
            tabItem.id = _id;
            tabItem.appendChild(spanTitle);
            var wind = document.createElement('div');
            wind.className = "window-content";
            var paneGroup = document.createElement('div');
            paneGroup.className = "pane-group";
            var paneLeft = document.createElement('div');
            paneLeft.id = id + S.Join + "Left";
            paneLeft.className = "pane-sm sidebar";
            paneLeft.style.backgroundColor = "#000000";
            var paneRight = document.createElement('div');
            paneRight.id = id + S.Join + "Right";
            paneRight.className = "pane";
            if (navItems !== null) {
                for (var _i = 0, navItems_1 = navItems; _i < navItems_1.length; _i++) {
                    var nav = navItems_1[_i];
                    var _nav = document.createElement("nav");
                    _nav.id = id + S.Join + nav;
                    _nav.className = "nav-group";
                    var span = document.createElement('span');
                    span.className = "icon {0}".replace('{0}', "icon-database");
                    _nav.appendChild(span);
                    var _tit = document.createElement("span");
                    _tit.innerHTML = nav;
                    _nav.appendChild(_tit);
                    paneLeft.appendChild(_nav);
                }
            }
            paneGroup.appendChild(paneLeft);
            paneGroup.appendChild(paneRight);
            wind.appendChild(paneGroup);
            tabItem.appendChild(wind);
            AddTabServerElement(tabItem);
        }
        else {
            _ele.focus();
        }
    }
    ViewModule.AddTabItem = AddTabItem;
    function GetHeaderMenuId() {
        return 'HeaderMenu';
    }
    function GetNavServersId() {
        return 'NavServers';
    }
    function GetTabServersId() {
        return 'TabServers';
    }
    function AddHeaderMenuElement(element) {
        AddElement(GetHeaderMenuId(), element);
    }
    function AddNavServerElement(element) {
        AddElement(GetNavServersId(), element);
    }
    function AddTabServerElement(element) {
        AddElement(GetTabServersId(), element);
    }
    function AddElement(parentId, element) {
        document.getElementById(parentId).appendChild(element);
    }
    function Remove(EId) {
        var EObj = document.getElementById(EId);
        return (EObj !== null ? EObj.parentNode.removeChild(EObj) : false);
    }
})(ViewModule = exports.ViewModule || (exports.ViewModule = {}));
//# sourceMappingURL=view.js.map