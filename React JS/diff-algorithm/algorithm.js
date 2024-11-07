const oldTree = {
    type: "div",
    props: { id: "root", className: "container" },
    children: [
        { type: "h1", props: { style: "color: red"}, children: ["Hello"] }, 
        { type: "p", props: {}, children: ["This is a paragraph"] },
    ]
};

const newTree = {
    type: "div",
    props: { id: "root", className: "container-fluid" },
    children: [
        { type: "h1", props: { style: "color: blue"}, children: ["Hello World"] },
        { type: "p", props: {}, children: ["This is a paragraph"] },
        { type: "span", props: {}, children: ["New element"] },
    ]
};

function diff (oldNode, newNode) {
    let changes = [];

    if (oldNode.type !== newNode.type) {
        changes.push({ type: "REPLACE",  oldNode, newNode });
        return changes;
    }

    const propChanges = {};
    for ( const key in { ...oldNode.props, ...newNode.props }) {
        if (oldNode.props[key] !== newNode.props[key]) {
            propChanges[key] = { oldValue: oldNode.props[key], newValue: newNode.props[key] };
        }
    }
    if (Object.keys(propChanges).length > 0) {
        changes.push({ type: "PROP_CHANGE", node: oldNode, propChanges });
    }

    const oldChildren = oldNode.children || [];
    const newChildren = newNode.children || [];
    const maxLength = Math.max(oldChildren.length, newChildren.length);

    for (let i = 0; i < maxLength; i++) {
        if (!oldChildren[i]) {
            changes.push({ type: "ADD", newNode: newChildren[i] });
        }
        else if (!newChildren[i]) { 
            changes.push({ type: "REMOVE", oldNode: oldChildren[i] });
        }
        else {
            changes = changes.concat(diff(oldChildren[i], newChildren[i]));
        }
    }

    return changes;
}


const differences = diff(oldTree, newTree);
console.log(JSON.stringify(differences, null, 2));

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