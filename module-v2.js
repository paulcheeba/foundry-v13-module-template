/**
 * My Foundry Module - v1.0.0
 * ApplicationV2 Support (Future Compatibility)
 * Compatible with Foundry VTT v11-v13
 */

console.log("My Foundry Module | Loading module-v2.js (ApplicationV2 Support)");

/**
 * Check for ApplicationV2 availability and create V2 class if available
 * ApplicationV2 is available in foundry.applications.api namespace
 */
if (typeof foundry !== 'undefined' && 
    foundry.applications && 
    foundry.applications.api && 
    foundry.applications.api.ApplicationV2) {
  
  console.log("My Foundry Module | ApplicationV2 detected, creating V2 class");
  
  /**
   * ApplicationV2 implementation for future Foundry versions
   */
  class MyModuleAppV2 extends foundry.applications.api.ApplicationV2 {
    constructor(options = {}) {
      super(options);
      this.data = {};
    }

    static DEFAULT_OPTIONS = {
      id: "my-module-app-v2",
      tag: "form",
      form: {
        handler: MyModuleAppV2.formHandler,
        closeOnSubmit: false
      },
      position: {
        width: 600,
        height: 400
      },
      window: {
        title: "My Module (V2)",
        icon: "fas fa-cog",
        resizable: true,
        minimizable: true
      },
      classes: ["my-module", "my-module-v2"]
    };

    static PARTS = {
      form: {
        template: "modules/my-foundry-module/templates/my-module-v2.hbs"
      }
    };

    async _prepareContext(options) {
      const context = await super._prepareContext(options);
      return foundry.utils.mergeObject(context, {
        title: this.options.window.title,
        data: this.data
      });
    }

    _onRender(context, options) {
      super._onRender(context, options);
      
      // Add event listeners for V2
      const html = this.element;
      html.querySelector('.my-button')?.addEventListener('click', this._onButtonClick.bind(this));
    }

    async _onButtonClick(event) {
      event.preventDefault();
      console.log("V2 Button clicked!");
      // Add your V2 button logic here
    }

    static async formHandler(event, form, formData) {
      console.log("V2 Form data:", formData);
      // Handle V2 form submission
    }
  }

  // Make V2 class globally available
  window.MyModuleAppV2 = MyModuleAppV2;
  
  // Add V2 ready hook
  Hooks.once('ready', async function() {
    if (game.user.isGM) {
      console.log("My Foundry Module | V2 Ready hook executed");
      // V2-specific initialization can go here
    }
  });

} else {
  console.log("My Foundry Module | ApplicationV2 not available, skipping V2 implementation");
}