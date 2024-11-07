// Diffing Algorithm = in React, Differences Algorithm is used to differentiate the DOM Tree for efficient updates

// Lines 1 to 8 = oldTree object
const oldTree = { // declare a constant object named "oldTree", representing a virtual DOM structure 
    type: "div", // root node
    props: { id: "root", className: "container" }, // defines properties of "div": id is set to "root", and className is set to "container".
    children: [ // children nodes = an array that contains 2 child nodes
        { type: "h1", props: { style: "color: red"}, children: ["Hello"] }, // A node that represents h1 element, with a style property of "color: red", and a text "Hello".
        { type: "p", props: {}, children: ["This is a paragraph"] }, // A node that represents a paragraph element, without any properties, and a text "This is a paragraph".
    ]
};

// Lines 10 to 18 = newTree object
const newTree = { // declare a constant object named "newTree"
    type: "div", // root node
    props: { id: "root", className: "container-fluid" }, // defines properties of "div": id is set to "root", and className is set to "container-fluid".
    children: [ // an array that contains 3 child nodes
        { type: "h1", props: { style: "color: blue"}, children: ["Hello World"] }, // A node that represents an h1 element, with a style property of "color: blue", and content of "Hello World".
        { type: "p", props: {}, children: ["This is a paragraph"] }, // A node that represents a paragraph element, without any properties, and content of "This is a paragraph".
        { type: "span", props: {}, children: ["New element"] }, // A node that represents a span element, without any properties, and content of "New element".
    ]
};


// diff function => compares oldNode and newNode to identify differences
function diff (oldNode, newNode) {
    let changes = []; // initialize the "changes"  array

    if (oldNode.type !== newNode.type) { // checks if oldNode's type is different from the newNode's type
        changes.push({ type: "REPLACE",  oldNode, newNode }); // if the types of oldNode and newNode are different, push an object to the "changes" array. The object contains property "type" with a value "REPLACE", the oldNode, and the newNode.
        return changes; // return the "changes" array. codes below will not be executed.
    }

    // this code compares the properties of oldNode and newNode. Any differences are stored in the propChanges.
    const propChanges = {}; // initialize an empty object named "propChanges" to store any changes in the props
    for ( const key in { ...oldNode.props, ...newNode.props }) { // loop through all keys of oldNode.props and newNode.props. // A spread operator is used in both oldNode.props and newNode.props, and then combines them into a single object 
        if (oldNode.props[key] !== newNode.props[key]) { // checks if "key" value in oldNode is different from newNode
            propChanges[key] = { oldValue: oldNode.props[key], newValue: newNode.props[key] }; // if the value of key is different, insert an object containing oldValue (oldNode) and newValue (newNode)
        }
    }


    // if there are any changes in the properties under propChanges, push/add them to the "changes" array.
    if (Object.keys(propChanges).length > 0) { // gets all keys in the propChanges object. if there is atleast one key (length > 0), next block of code will execute
        changes.push({ type: "PROP_CHANGE", node: oldNode, propChanges }); // there are some changes in the property,  push an object to the "changes" array. The object contains property "type" with a value "PROP_CHANGE", node: oldNode (indicates which node has properties that have changed), and propChanges (contains the changes in properties).
    }

    const oldChildren = oldNode.children || []; // initialize a constant variable named oldChildren. If oldNode has a children property, oldNode.children is assigned to oldChildren. Else, an empty array is set.
    const newChildren = newNode.children || []; // initialize a constant variable named newChildren. If newNode has a children property, newNode.children is assigned to newChildren. Else, an empty array is set.
    const maxLength = Math.max(oldChildren.length, newChildren.length); // calculates which array is larger, by comparing the lengths of oldChildren and newChildren. the larger value is saved in a constant variable named maxLength. Math.max() function returns the largest number provided in  the arguments.

    // this loop iterates through the children of oldnode and newNode, to check for any added and removed children.
    for (let i = 0; i < maxLength; i++) { // loop will run starting from 0 upto when i is less than the value of maxLength
        if (!oldChildren[i]) { // checks if there is no children at index i in oldChildren. if no children , it means oldChildren[i] is a newly added child node
            changes.push({ type: "ADD", newNode: newChildren[i] }); // if there is no children at index i in oldChildren, an object was added to the changes array. The object contains property "type" with a value "ADD", and newNode, containing newChildren with an index i
        }
        else if (!newChildren[i]) { // checks if there is no children at index i in newChildren. if no children , it means oldChildren[i] has to be removed
            changes.push({ type: "REMOVE", oldNode: oldChildren[i] }); // if there is no children at index i in newChildren, an object was added to the changes array. The object contains property "type" with a value "REMOVE", and oldNode, containing oldChildren with an index i
        }
        else { // this will run if there is both oldChildren[i] and newChildren[i]
            changes = changes.concat(diff(oldChildren[i], newChildren[i])); // the diff function is called to compare oldChildren and newChildren at index i. Then the result is concatenated into the "changes" array.
        }
    }

    return changes; // return the "changes" array.
}

// the diff function is invoked. The result wil be saved in the "differences" variable.
const differences = diff(oldTree, newTree);

// changes are logged
console.log(JSON.stringify(differences, null, 2));

// Line 60:
// JSON.stringify() - a javascript function to convert data into JSON string
    // differences = value parameter = the value to be converted.
    // null = this is a replacer parameter. Nothing will be altered in the "differences" array, so this was set to null.
    // 2 = space parameter = number of indentation to be inserted to the output, for readability

// Without JSON.stringify, the result will look like this:
[
    {
        type: 'PROP_CHANGE',
        node: { type: 'div', props: [Object], children: [Array] },
        propChanges: { className: [Object] }
    },
    {
        type: 'PROP_CHANGE',
        node: { type: 'h1', props: [Object], children: [Array] },
        propChanges: { style: [Object] }
    },
    {
        type: 'ADD',
        newNode: { type: 'span', props: {}, children: [Array] }
    }
]
// We cannot view the data inside the Objects and Arrays





// OUTPUT
[
    {
        "type": "PROP_CHANGE",
        "node": {
            "type": "div",
            "props": {
                "id": "root",
                "className": "container"
            },
            "children": [
                {
                    "type": "h1",
                    "props": {
                        "style": "color: red"
                    },
                    "children": [
                        "Hello"
                    ]
                },
                {
                    "type": "p",
                    "props": {},
                    "children": [
                        "This is a paragraph"
                    ]
                }
            ]
        },
        "propChanges": {
            "className": {
                "oldValue": "container",
                "newValue": "container-fluid"
            }
        }
    },
    {
        "type": "PROP_CHANGE",
        "node": {
            "type": "h1",
            "props": {
                "style": "color: red"
            },
            "children": [
                "Hello"
            ]
        },
        "propChanges": {
            "style": {
                "oldValue": "color: red",
                "newValue": "color: blue"
            }
        }
    },
    {
        "type": "ADD",
        "newNode": {
            "type": "span",
            "props": {},
            "children": [
                "New element"
            ]
        }
    }
]