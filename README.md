# Cherax

Easy to use component-based UI library
<p>
<img src="res/cherax.jpg"
     alt="Cherax - Simple Component-based HTML UI Library"
     style="float: left; margin-left: 25%; margin-right: 50%; width:640px; height:320px" />
</p>

---
## Setup

Include the cherax.js in your html file:

```
<script src="js/cherax.js"></script>
```

## Define a Cherax Component

Define a Cherax Object to setup a componet:

Component needs to have a <br />
- **name** - name of HTML Custom Component <br />
- **props** - properties set on the Custom Component <br />
- **template** - standard html template <br />
- **init** - function() <br />
- **watch** - function(obj) <br />

HTML
```
<my-comp prop1="AAA" prop2="BBB">
```
JavaScript 
```
var config = {
    "name" : "my-comp",
    "props": ['prop1','prop2'],
    "template": `<b>Click for the timestamp</b><slot name="slot1">Test Slot</slot>`,
    "init" : function() {

        let prop1 = this.getProp('prop1') ? this.getAttribute('prop1') : "";

        //in the init this.getComp() is used to obtain the component

        this.getComp().addEventListener('click', e => {
			this.getComp().querySelector("b").innerHTML = new Date();
		});
    },
    watch : function(attribute) {
        if (attribute.name == 'name') {
            //in the watch this.comp is a reference to this component
            this.comp.querySelector('b').innerHTML = `Hello, ${attribute.newValue}`;
        }
    }
}

Cherax.register(config);

```

## Examples

Basic Example:

```
 [!Example 1](src/index.html)
```

## Building from npm

First install dependencies:

```
parcel src/cherax.js
```

## Credits

Author [johnfacey.dev](https://johnfacey.dev/)
Twitter [twitter.com/johnfacey](https://twitter.com/johnfacey)

