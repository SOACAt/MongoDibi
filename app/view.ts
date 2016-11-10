export module ViewModule {

    let bodytemplate:string=`<div class="window">
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
              <span class="icon icon-database"></span> Local
            </a>
            <span class="nav-group-item">
                    <span class="icon icon-database"></span> T6
            </span>
            <span class="nav-group-item">
                     <span class="icon icon-database"></span> SRVLOGS
            </span>
           
          </nav>
        </div>
        <div class="pane">...</div>
      </div>
    </div>
    <footer class="toolbar toolbar-footer">
      <textarea role="5" style="width:100%; background-color:black; color:green;"></textarea>
    </footer>
  </div>'`;

    export function CreateBody() {
        document.body.innerHTML=bodytemplate;
    }
   
    export function AddHeaderMenuIconButton(iconClass:string, click_function:any) {
        var button=document.createElement('button');
        button.className="btn btn-large btn-default";
        var span=document.createElement('span');
        span.className="icon {0}".replace('{0}',iconClass);
        button.appendChild(span);
        button.addEventListener("click",click_function);
        AddHeaderMenuElement(button);
    }
    function GetHeaderMenuId():string {
        return 'HeaderMenu';
    }
    function AddHeaderMenuElement(element:HTMLElement){
        document.getElementById(GetHeaderMenuId()).appendChild(element);
    }
    
}