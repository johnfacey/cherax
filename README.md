# Cherax

Easy to use component-based UI library
<p>
<img src="res/cherax.jpg"
     alt="Cherax - Simple Component-based HTML UI Library"
     style="float: left; margin-left: 25%; margin-right: 50%; width:640px; height:320px" />
</p>

---

## Building from npm

First install dependencies:

```
parcel src/cherax.js
```
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

        this.getComp().addEventListener('click', e => {
			this.getComp().querySelector("b").innerHTML = new Date();
		});
    },
    watch : function(attribute) {
        if (attribute.name == 'name') {
            this.getComp().querySelector('b')textContent = `Hello, ${attribute.newValue}`;
        }
    }
}

Cherax.register(config);

```

## Cherax Methods
register - Registers the Cherax Component from the supplied configuration object as seen above

getProp - Used to get the property of a Cherax Component

Example: 

```
this.getProp('prop1')
```

getComp - Used to return this Cherax Component

This method will obtain the reference to the component in the Shadow DOM

Example: 

```
this.getComp().querySelector('div')
```

getWrap - Used to return this Cherax Component Wrapper

This method will obtain the reference to the wrapper element inside the Cherax Component

Example: 

```
this.getWrap()
```

getComp
register
Include the cherax.js in your html file:

```
<my-comp prop1="AAA" prop2="BBB">
```

## Using a Cherax Component in HTML

Include the cherax.js in your html file:

```
<my-comp prop1="AAA" prop2="BBB">
```
## Running

```sh
node dist/bundle.js
```

## Credits

Made with [johnfacey.dev](https://johnfacey.dev/)

