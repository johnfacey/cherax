/**
 * DrowJS Component - Simple Web Component Library for creating custom HTML Components.
 * @constructor
 * @see {@link https://github.com/drowjs|GitHub}
 */
 var DrowElements = [];
 const DrowJS = {
   /**
    * Registers a DrowJS Component.
    * @param {object} config - Object used to define a DrowJS.
    * @memberof DrowJS
    * @example
    *
    * <my-comp prop1="Test"></my-prop>
    *
    * var config = {
    *   "name" : "my-comp",
    *   "props": ['prop1','prop2'],
    *   "template": `<b>Click for the timestamp</b>{{prop1}}</slot>`,
    *   "init" : function(config) {
    *
    *      let prop1 = this.getProp('prop1') ? this.getAttribute('prop1') : "";
    *
    *        this.getComp().addEventListener('click', e => {
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
    * DrowJS.register(config);
    *
    */
   register(config) {
     for (const element of DrowElements) {
       if (element === config.name) {
         console.log(`DrowJS ${config.name} already Registered`);
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
           this.setAttribute("DrowJS-component", true);
           this.setAttribute("DrowJS-name", config.name);
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
 
           this.innerHTML = `<DrowJS-wrapper>${
             configVar.template
            }</DrowJS-wrapper>`;
           
           this.init(config);
           if (config.append !== undefined && config.append !== "") {
             document
               .querySelector("head")
               .replaceChild(this, document.querySelector("head"));
           }
         }
 
         /**
          * Updates the template with the props provided to the DrowJS Component.
          * @instance
          * @example
          * updateVars(config) -- used internally
          */
         updateVars(config) {
           let newConfig = config;
           for (var i = 0; i < this.getAttributeNames().length; i++) {
             var thisAttr = this.getAttributeNames()[i];
             var thisAttrValue = this.getAttribute(thisAttr);
             newConfig.template = newConfig.template.replaceAll("{{" + thisAttr + "}}", thisAttrValue);
           }
 
           return newConfig;
         }
         /**
          * Gets the Wrapper Element of a DrowJS Component.
          * @instance
          * @example
          * this.getWrap().querySelector("b");
          */
         getWrap() {
           return this.shadowRoot.querySelector("DrowJS-wrapper");
         }
 
         /**
          * Gets a Property of a DrowJS Component.
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
          * Gets the DrowJS Component.
          * @returns DrowJS Component
          * @instance
          * @example
          * this.getComp();
          */
         getComp() {
           return this;
         }
 
         slots() {
           var drowSlots = document.querySelectorAll("[slot]"); //find children with slot attributes
           for (var i = 0, len = drowSlots.length; i < len; i++) {
             //var slot = slots[i];
             //var slotName = slot.slot; //elements
             // this.querySelector("#"+slotName).appendChild(slot);
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
     console.log(`DrowJS ${config.name} Registered`);
     return this;
   }
 };

 if ((typeof process !== 'undefined') && (process.release.name === 'node')) {
      module.exports = {
        DrowJS: DrowJS
    };
  }  else {
    window.DrowJS = DrowJS;
  }