const JSONFormatter = require("../node_modules/json-formatter-js/dist/json-formatter.js");
const JSONEditor = require("../node_modules/jsoneditor/dist/jsoneditor.js")

const S = require("../win/__sss")
export module ViewModule {

  let bodytemplate: string = `<div class="window">
    <header class="toolbar toolbar-header">
      <!-- Large button group -->
      <div id='HeaderMenu' class="btn-group">
        
      </div>
    </header>
    <div class="window-content">
      <div class="pane-group">
        <div id="NavServers" class="pane-sm sidebar">
          
        </div>
      <div class="pane">
        <div class="tab-group" id="TabDocuments">
        </div>
      </div>
      </div>
    </div>
    <footer class="toolbar toolbar-footer">
      <textarea role="5" style="width:100%; background-color:black; color:green;"></textarea>
    </footer>
  </div>'`;

  export function CreateBody() {
    document.body.innerHTML = bodytemplate;
  }

  export function AddHeaderMenuIconButton(iconClass: string, click_function: any) {
    var button = document.createElement('button');
    button.className = "btn btn-large btn-default";
    var span = document.createElement('span');
    span.className = "icon {0}".replace('{0}', iconClass);
    button.appendChild(span);
    button.addEventListener("click", click_function);
    AddHeaderMenuElement(button);
  }
  export function AddNavServerItemDb(iconClass: string, itemId: string, dbname: string, click_function: any) {
    var _nav = document.getElementById(itemId);

    var titleIcon = document.createElement('span');
    titleIcon.className = "icon {0}".replace('{0}', iconClass);
    var titleSpan = document.createElement('span');
    titleSpan.innerHTML = dbname;

    var container = document.createElement("div");
    container.appendChild(titleIcon);
    container.appendChild(titleSpan);
    container.addEventListener("click", click_function);
    var navgroupitem = document.createElement("div"); // a
    //navgroupitem.className = "nav-group-item";
    navgroupitem.style.padding = '1px 1px 10px 1px';
    navgroupitem.id = itemId + S.JoinDb + dbname;
    navgroupitem.appendChild(container);
    //navgroupitem.addEventListener("click", click_function);

    _nav.appendChild(navgroupitem);
    AddNavServerElement(_nav);
  }
  export function AddNavServerItemDbCollection(iconClass: string, itemId: string, dbname: string, navItems: Array<string>, click_function: any) {
    var _itemId = itemId + S.JoinDb + dbname;
    var navgroupitem = document.getElementById(_itemId);
    if ((navgroupitem !== null) && (navItems !== null)) {
      if (navgroupitem.childElementCount > 1) {
        var obj = document.getElementById(itemId + 'lu');
        navgroupitem.removeChild(obj);
      }
      var lu = document.createElement('lu');
      lu.style.listStyleType = 'none';
      lu.style.fontSize = '11px';
      lu.id = itemId + 'lu';
      for (var nav of navItems) {
        var spanicon = document.createElement('span');
        spanicon.className = "icon {0}".replace('{0}', iconClass);
        var spantit = document.createElement('span');
        spantit.innerHTML = nav;
        var li = document.createElement('li');
        li.appendChild(spanicon);
        li.appendChild(spantit);
        spantit.addEventListener("click", click_function);
        li.style.padding = '1px 1px 1px 10px';
        lu.appendChild(li);
        li.id = navgroupitem.id + S.JoinCollection + nav;

        //navgroupitem.addEventListener("click", click_function);
        //AddNavServerElement(navgroupitem);
      }
      navgroupitem.appendChild(lu);
    }

  }
  export function AddNavServerItem(iconClass: string, itemId: string, title: string, subtitle: string) {
    var _nav = document.createElement("nav");
    _nav.id = itemId;
    _nav.style.paddingLeft = "5px";
    _nav.className = "nav-group";
    var span = document.createElement('span');
    span.className = "icon {0}".replace('{0}', iconClass)
    _nav.appendChild(span);
    var _tit = document.createElement("span");
    _tit.className = "nav-group-title";
    _tit.style.fontSize = '14px';
    _tit.style.fontWeight = 'bolder';
    _tit.style.color = '#228B22';
    _tit.innerHTML = title;
    _nav.appendChild(_tit);


    AddNavServerElement(_nav);



    /* var titleIcon = document.createElement('span');
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
     AddNavServerElement(navgroupitem);*/
  }

  export function AddDocuments(docs: Array<any>) {
    var _container = document.getElementById('TabDocuments');
    var jsonString = docs; // JSON.stringify(docs[0]);
    var formatter = new JSONFormatter(jsonString);
    var options = {};
    var editor = new JSONEditor(_container,options);
    editor.set(jsonString);

    _container.appendChild(formatter.render());
    _container.appendChild(editor);


  }
  export function AddTabItem(id: string, title: string, navItems: Array<string>) {
    var _id: string = "tab" + S.Join + id;
    var _ele: HTMLElement = document.getElementById(_id);

    if (_ele === null) {
      var spanHead = document.createElement('span');
      spanHead.className = 'icon icon-cancel icon-close-tab';
      spanHead.addEventListener("click", () => {
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
      wind.className = "window-content"; //  <div class="window-content">
      wind.style.height = "400px";
      var paneGroup = document.createElement('div');
      paneGroup.className = "pane-group";
      var paneLeft = document.createElement('div');
      paneLeft.id = id + S.Join + "Left";
      paneLeft.className = "pane-sm sidebar";
      var paneRight = document.createElement('div');
      paneRight.id = id + S.Join + "Right";
      paneRight.className = "pane";

      if (navItems !== null) {
        for (var nav of navItems) {
          var _nav = document.createElement("nav");
          _nav.id = id + S.Join + nav;
          _nav.className = "nav-group";
          var span = document.createElement('span');
          span.className = "icon {0}".replace('{0}', "icon-database")
          _nav.appendChild(span);
          var _tit = document.createElement("span");
          _tit.className = "nav-group-title";
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
    } else {
      _ele.focus();
    }



  }

  function GetHeaderMenuId(): string {
    return 'HeaderMenu';
  }
  function GetNavServersId(): string {
    return 'NavServers';
  }
  function GetTabServersId(): string {
    return 'TabServers';
  }

  function AddHeaderMenuElement(element: HTMLElement) {
    AddElement(GetHeaderMenuId(), element);
  }
  function AddNavServerElement(element: HTMLElement) {
    AddElement(GetNavServersId(), element);
  }
  function AddTabServerElement(element: HTMLElement) {
    AddElement(GetTabServersId(), element);
  }
  function AddElement(parentId: string, element: HTMLElement) {
    document.getElementById(parentId).appendChild(element);
  }

  function Remove(EId: string) {
    var EObj: HTMLElement = document.getElementById(EId);
    return (EObj !== null ? EObj.parentNode.removeChild(EObj) : false);
  }
}