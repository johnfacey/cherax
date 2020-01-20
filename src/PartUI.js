/**
 * PartUI Component - Used to simplify implementing Custom HTML Components.
 * @constructor
 * @see {@link http://github.com/johnfacey|GitHub}
 */

const PartUI = {

    /**
    * Registers a PartUI Component.
    * @param {object} config - Object used to define a PartUI.
    * @memberof PartUI
    * @example
    * 
    * <my-comp prop1="Test"></my-prop>
    * 
    * var config = {
    *   "name" : "my-comp",
    *   "props": ['prop1','prop2'],
    *   "template": `<b>Click for the timestamp</b><slot name="slot1">Test Slot</slot>`,
    *   "init" : function() {
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
    * PartUI.register(config);
     * 
     */
    register(config) {
        window.customElements.define(
            config.name,
            class extends HTMLElement {

                static get observedAttributes() {
                    return [config.props];
                }

                constructor() {

                    super();
                    this.setAttribute('PartUI-component', true);
                    this.init = config.init;
                }

                connectedCallback() {
                    if (config.shadow) {
        
                      const shadowRoot = this.attachShadow({
                        mode: "open"
                      });
                    }
                    
                   const elRoot = this;
                    
                    this.innerHTML = `<PartUI-wrapper>${
                      config.template
                    }</PartUI-wrapper>`;
        
                    this.init();
                    if (config.append != undefined && config.append != "") {
                        document.querySelector("head").replaceChild(this, document.querySelector("head"));
                    }
                  }

                /**
                 * Gets the Wrapper Element of a PartUI Component.
                 * @instance
                 * @example
                 * this.getWrap().querySelector("b");
                 */
                getWrap() {
                    return this.shadowRoot.querySelector("PartUI-wrapper");
                }

                /**
                 * Gets a Property of a PartUI Component.
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
                 * Gets the PartUI Component.
                 * @returns PartUI Component 
                 * @instance 
                 * @example
                 * this.getComp();
                 */
                getComp() {
                    return this;
                }

                slots() {

                    var slots = this.querySelectorAll("[slot]"); //find children with slot attributes
                    for (i=0;i<slots.length;i++) {
                        var slot = slots[i];
                        var slotName = slot.slot;       //elements
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
                    }
                    try {
                        config.watch(attribute);
                    } catch(e) {

                    }
                }
            }
        );
        console.log(`PartUI ${config.name} Registered`);
        return this;
    }

};