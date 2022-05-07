/**
 * Drow Component - Simple Web Component Library for creating custom HTML Components.
 * @constructor
 * @see {@link https://github.com/drowjs|GitHub}
 */
var DrowElements = [];
const Drow = {
  /**
   * Registers a Drow Component.
   * @param {object} config - Object used to define a Drow.
   * @memberof Drow
   * @example
   *
   * <my-comp prop1="Test"></my-prop>
   *
   * var config = {
   *   "name" : "my-comp",
   *   "props": ['prop1','prop2'],
   *   "template": `
   *              <div>
   *                <b>Click for the timestamp</b>{{prop1}}</slot>
   *                  {{bind}}
   *              </div>
   * `,
   *   "init" : function(config) {
   *      let prop1 = this.getProp('prop1') ? this.getAttribute('prop1') : "";
   *      this.getComp().addEventListener('click', e => {
   *			this.getComp().querySelector("b").innerHTML = new Date();
   *		});
   *   },
   *    watch : function(attribute) {
   *        if (attribute.name == 'name') {
   *           this.getComp().querySelector('b').textContent = `Hello, ${attribute.newValue}`;
   *        }
   *   }
   * }
   *
   * Drow.register(config);
   *
   */
  register(config) {
    for (const element of DrowElements) {
      if (element === config.name) {
        console.log(`Drow ${config.name} already Registered`);
        return;
      }
    }
    DrowElements.push(config.name);

    window.customElements.define(
      config.name,
      class extends HTMLElement {
        static get observedAttributes() {
          return [config.props];
        }

        constructor() {
          super();
          this.setAttribute("Drow-component", true);
          this.setAttribute("Drow-name", config.name);
          this.init = config.init;
        }

        connectedCallback() {
          if (config.shadow) {
            const shadowRoot = this.attachShadow({
              mode: "open"
            });
          }
          let configVar = JSON.parse(JSON.stringify(config));
          configVar = this.updateVars(configVar);

          let innerHTML = this.innerHTML;
          configVar.template = configVar.template.replaceAll(`{{bind}}`, innerHTML);

          this.innerHTML = `<drow-wrapper>${
              configVar.template
             }</drow-wrapper>`;

          this.init(config);
          if (config.append !== undefined && config.append !== "") {
            document
              .querySelector("head")
              .replaceChild(this, document.querySelector("head"));
          }
        }

        /**
         * Updates the template with the props provided to the Drow Component.
         * Variables are replaced in the template Ex: {{variable_name}} 
         * {{bind}} is used as an internal reference so that elements can exist within a Drow Component instead of being removed
         * @instance
         * @example
         * updateVars(config) -- used internally
         */
        updateVars(config) {
          let newConfig = config;
          for (let i = 0; i < this.getAttributeNames().length; i++) {
            let thisAttr = this.getAttributeNames()[i];
            let thisAttrValue = this.getAttribute(thisAttr);
            if (thisAttr != 'bind') {
              newConfig.template = newConfig.template.replaceAll("{{" + thisAttr + "}}", thisAttrValue);
            }
          }

          return newConfig;
        }
        /**
         * Gets the Wrapper Element of a Drow Component.
         * @instance
         * @example
         * this.getWrap().querySelector("b");
         */
        getWrap() {
          return this.shadowRoot.querySelector("drow-wrapper");
        }

        /**
         * Gets a Property of a Drow Component.
         * @property {string} propName - returns of Property used in Componenet.
         * @returns {string} Property
         * @instance
         * @example
         * this.getProp('prop1');
         */
        getProp(propName) {
          return this.getAttribute(propName);
        }

        /**
         * Gets the Drow Component.
         * @returns Drow Component
         * @instance
         * @example
         * this.getComp();
         */
        getComp() {
          return this;
        }

         /**
         * Unused sloting method.
         * @instance
         * @example
         * this.slots();
         */
        slots() {
          var drowSlots = document.querySelectorAll("[slot]"); //find children with slot attributes
          for (var i = 0, len = drowSlots.length; i < len; i++) {
            var slot = slots[i];
            var slotEl = slot.el; //elements <slot append
            this.querySelector(slotEl).appendChild(slot);
          }
        }

        // Respond to attribute changes.
        attributeChangedCallback(attr, oldValue, newValue) {
          var attribute = {
            name: attr,
            oldValue: oldValue,
            newValue: newValue,
            comp: this.getComp()
          };
          try {
            config.watch(attribute);
          } catch (e) {}
        }
      }
    );
    console.log(`Drow ${config.name} Registered`);
    return this;
  },
  slots() {
    var drowSlots = document.querySelectorAll("[attach]"); //find children with slot attributes
    for (var i = 0, len = drowSlots.length; i < len; i++) {
      var thisSlot = drowSlots[i];
      var slotEl = thisSlot.getAttribute('attach'); //elements <slot append
      document.querySelector(slotEl).appendChild(thisSlot);
    }
  }
};

if ((typeof process !== 'undefined') && (process.release.name === 'node')) {
  module.exports = {
    Drow: Drow
  };
} else {
  window.Drow = Drow;
}