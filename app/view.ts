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
        <div class="pane-sm sidebar">
          <nav id="NavServers" class="nav-group">
            <h5 class="nav-group-title">Servers</h5>
          </nav>
        </div>
      <div class="pane">
        <div class="tab-group" id="TabServers">
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

  export function AddNavServerItem(iconClass: string, itemId: string, title: string, subtitle: string, click_function: any) {
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


  export function AddTabItem(id:string,title: string, navItems : Array<string>) {
    var _id: string = "tab" + S.Join + id;
    var _ele: HTMLElement = document.getElementById(_id);

    if (_ele === null) {
      var spanHead = document.createElement('span');
      spanHead.className = 'icon icon-cancel icon-close-tab';
      spanHead.addEventListener("click",()=>{
        Remove(_id);
      } );
      var spanTitle = document.createElement('span');
      spanTitle.innerHTML = title;
      var tabItem = document.createElement('div');
      tabItem.className = 'tab-item';
      tabItem.appendChild(spanHead);
      tabItem.id = _id;
      tabItem.appendChild(spanTitle);

      var paneGroup = document.createElement('div');
      paneGroup.className="pane-group";
      var paneLeft = document.createElement('div');
      paneLeft.className="pane-sm sidebar";
      var paneRight = document.createElement('div');
      paneGroup.className="pane";
      
      paneGroup.appendChild(paneLeft);
      paneGroup.appendChild(paneRight);
      tabItem.appendChild(paneGroup);

      AddTabServerElement(tabItem);
    }else{
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

  function Remove(EId:string)
  {
    var EObj: HTMLElement=document.getElementById(EId);
    return(EObj!==null?EObj.parentNode.removeChild(EObj):false);
  }
}