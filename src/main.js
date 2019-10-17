var config = {
    "name" : "my-comp",
    "props": ['message'],
    "template": `Hello <b> Universe</b>`,
    "init" : function() {

        let prop1 = this.getProp('message') ? this.getAttribute('message') : "";

        this.getComp().addEventListener('click', e => {
			this.getComp().querySelector("b").innerHTML = " DOM - Clicked: " + new Date();
		});
    },
    watch : function(attribute) {
        if (attribute.name == 'message') {
            attribute.comp.querySelector('b').innerHTML = ` - altered value, ${attribute.newValue}`;
        }
    }
}

Cherax.register(config);