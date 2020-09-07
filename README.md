[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/johnfacey/drowjs)

# DrowJS

Simple Web Component Library for creating custom HTML Components.
<div style="clear:both;padding-bottom:100px">
<p>
<img src="res/DrowJS.png"
     alt="DrowJS - Simple Web Component Library for creating custom HTML Components."
     style="float: left;  width:100px; height:100px" />
</p>
</div>

---
## Setup

Include the drow.js in an html file:

```
<script src="dist/drow.js"></script>
```

Or as an NPM Module
```
import DrowJS from 'drow';
```

## Define a DrowJS Component

Define a DrowJS Object to setup a componet:

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

DrowJS.register(config);

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
npm run server
```

## Credits

Author [johnfacey.dev](https://johnfacey.dev/)

Twitter [twitter.com/johnfacey](https://twitter.com/johnfacey)

