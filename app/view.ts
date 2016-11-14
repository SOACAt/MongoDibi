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
          <nav class="nav-group">
            <h5 class="nav-group-title">Servers</h5>
            <a class="nav-group-item active">
              <div>
              <span class="icon icon-database"></span> Local
              <div style="font-size:10px">port: 27017 - user: admin</div>
              
              </div>
            </a>
            <span class="nav-group-item">
                    <span class="icon icon-database"></span> T6
            </span>
            <span class="nav-group-item">
                     <span class="icon icon-database"></span> SRVLOGS
            </span>
           
          </nav>
          <nav class="nav-group">
            <h5 class="nav-group-title">Collections</h5>
            <a class="nav-group-item active">
              <div>
              <span class="icon icon-cc-zero"></span> Collection1
              <div style="font-size:10px">kkk</div>
              
              </div>
            </a>
            
           
          </nav>
        </div>
        <div class="pane">
        <div class="tab-group">
  <div class="tab-item">
    <span class="icon icon-cancel icon-close-tab"></span>
    Tab
  </div>
  <div class="tab-item active">
    <span class="icon icon-cancel icon-close-tab"></span>
    Tab active
  </div>
  <div class="tab-item">
    <span class="icon icon-cancel icon-close-tab"></span>
    Tab
  </div>
  <div class="tab-item tab-item-fixed">
    <span class="icon icon-plus"></span>
  </div>
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
  function GetHeaderMenuId(): string {
    return 'HeaderMenu';
  }
  function AddHeaderMenuElement(element: HTMLElement) {
    document.getElementById(GetHeaderMenuId()).appendChild(element);
  }

}