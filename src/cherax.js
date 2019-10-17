/**
 * Cherax Component - Used to simplify implementing Custom HTML Componenets.
 * @constructor
 * @see {@link http://github.com/johnfacey|GitHub}
 */

const Cherax = {

    /**
    * Registers a Cherax Component.
    * @param {object} config - Object used to define a Cherax.
    * @memberof Cherax
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
    * Cherax.register(config);
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
                    this.setAttribute('cherax-component', true);
                    this.init = config.init;
                }

                connectedCallback() {

                    const shadowRoot = this.attachShadow({
                        mode: 'open'
                    });

                    shadowRoot.innerHTML = `<cherax-wrapper>${config.template}</cherax-wrapper>`;
                    this.init();
                }

                /**
                 * Gets the Wrapper Element of a Cherax Component.
                 * @instance
                 * @example
                 * this.getWrap().querySelector("b");
                 */
                getWrap() {
                    return this.shadowRoot.querySelector("cherax-wrapper");
                }

                /**
                 * Gets a Property of a Cherax Component.
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
                 * Gets the Cherax Component.
                 * @returns Cherax Component 
                 * @instance 
                 * @example
                 * this.getComp();
                 */
                getComp() {
                    return this.shadowRoot;
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
        console.log(`Cherax ${config.name} Registered`);
        return this;
    }

};