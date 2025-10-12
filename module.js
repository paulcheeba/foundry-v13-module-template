/**
 * My Foundry Module - v1.0.0
 * Main Module Entry Point (Application V1)
 * Compatible with Foundry VTT v11-v13
 */

console.log("My Foundry Module | Loading module.js (Application V1)");

/**
 * Main Application class using Foundry Application V1
 */
class MyModuleApp extends Application {
  constructor(options = {}) {
    super(options);
    this.data = {};
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "my-module-app",
      title: "My Module",
      template: "modules/my-foundry-module/templates/my-module.hbs",
      width: 600,
      height: 400,
      resizable: true,
      minimizable: true,
      classes: ["my-module"]
    });
  }

  getData() {
    return {
      title: this.title,
      data: this.data
    };
  }

  activateListeners(html) {
    super.activateListeners(html);
    
    // Add your event listeners here
    html.find('.my-button').click(this._onButtonClick.bind(this));
  }

  async _onButtonClick(event) {
    event.preventDefault();
    console.log("Button clicked!");
    // Add your button logic here
  }

  async _updateObject(event, formData) {
    // Handle form submission if needed
    console.log("Form data:", formData);
  }
}

/**
 * Module initialization
 */
Hooks.once('init', async function() {
  console.log("My Foundry Module | Initializing");
  
  // Register module settings here
  game.settings.register("my-foundry-module", "exampleSetting", {
    name: "Example Setting",
    hint: "This is an example setting for your module",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });
});

/**
 * Ready hook - module fully loaded
 */
Hooks.once('ready', async function() {
  console.log("My Foundry Module | Ready");
  
  // Add toolbar button for GM users
  if (game.user.isGM) {
    const toolbar = document.querySelector("#chat-controls");
    if (toolbar) {
      const button = document.createElement("a");
      button.className = "my-module-toolbar-btn";
      button.innerHTML = '<i class="fas fa-cog"></i>';
      button.title = "Open My Module";
      button.addEventListener("click", () => {
        new MyModuleApp().render(true);
      });
      toolbar.appendChild(button);
      console.log("My Foundry Module | Toolbar button added");
    }
  }
});

/**
 * Global reference for the application class
 */
window.MyModuleApp = MyModuleApp;