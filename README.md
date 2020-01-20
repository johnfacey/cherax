# PartUI

Easy to use Component-based UI library
<div style="clear:both;padding-bottom:100px">
<p>
<img src="res/PartUI.png"
     alt="PartUI - Simple Component-based HTML UI Library"
     style="float: left;  width:100px; height:100px" />
</p>
</div>

---
## Setup

Include the PartUI.js in your html file:

```
<script src="PartUI.js"></script>
```

## Define a PartUI Component

Define a PartUI Object to setup a componet:

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
            attribute.comp.querySelector('b').innerHTML = `Hello, ${attribute.newValue}`;
        }
    }
}

PartUI.register(config);

```

## Examples

Basic Example:

 [Example 1](src/index.html)



## Setup from npm

First install dependencies:

```
npm install
```

Run commands:
```
npm run start
```

## Credits

Author [johnfacey.dev](https://johnfacey.dev/)

Twitter [twitter.com/johnfacey](https://twitter.com/johnfacey)

