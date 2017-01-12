var shortid = require('shortid');
import component_structure from './component_structure.svg';

class Doc {
  constructor(doc = {}){
    this.name = doc.name || "Component";
    this.id = doc.id || shortid.generate();
    this.properties = doc.properties || null;
    this.state = doc.state || null;
    this.functions = doc.functions || null;
    this.description = doc.description || null;
    this.image = doc.image || null;
    this.visible = false;
  }
}

class Item {
  constructor(item = {}){
    this.name = item.name || "Item";
    this.dataType = item.dataType || "";
    this.description = item.description || null;
    this.defaultVal = item.defaultVal || null;
    this.parameters = item.parameters || null;
    this.optional = (item.required === true ? true : false);
    this.returns = item.returns || null;
  }
}

class Parameter {
  constructor(param = {}){
    this.name = param.name || "";
    this.dataType = param.dataType || null;
    this.description = param.description || null;
    this.optional = (param.required === true ? true : false);
  }
}

let Docs = [
  new Doc({
    name: "Component Structure",
    image: component_structure
  }),
  new Doc({
    name: '<Wizard />',
    description: "This component is the \"single source of truth\" for all of its children. This should be the only component that maintains its own state. This should also be the only component with functions that can manipulate data. This is important because whenever data changes it can be easily traced to one place.",
    properties: [
      new Item({
        name: "steps",
        description: "Inherits steps from wizard object passed from <File />"
      })
    ],
    state: [
      new Item({
        name: "steps",
        description: "defines the wizard steps.",
        defaultVal: "this.props.steps"
      }),
      new Item({
        name: "stepIndex",
        description: "Stores the index of the current step in the steps array",
        defaultVal: "0"
      })
    ],
    functions: [
      new Item({
        name: "pickStep",
        description: "Updates the stepIndex state with a new index, sets the \"active\" property on each step to true or false respectively.",
        parameters: [
          new Parameter({
            name: "index",
            dataType: "int",
            description: "Index of the step in the steps array to become the active step",
          })
        ]
      }),
      new Item({
        name: "setFieldValue",
        description: "Sets the value of a field",
        parameters: [
          new Parameter({
            name: "field",
            dataType: "object",
            description: "Contains the location of the field in the steps array, the new value, and any field-specific properties like the index of a selected value of a radio or select field."
          })
        ]
      }),
      new Item({
        name: "getSectionType",
        description: "Runs a switch statement to determine the type of section to be returned to the render function.",
        parameters: [
          new Parameter({
            name: "section",
            dataType: "object",
            description: "The section object passed from a map function during the <File /> render."
          }),
          new Parameter({
            name: "i",
            dataType: "int",
            description: "The index of the current item in the sections array. To be used as the React \"key\" property."
          })
        ],
        returns: [
          new Parameter({
            name: "",
            dataType: "React Component",
            description: "The section to be rendered"
          })
        ]
      })
    ]
  }),
  new Doc({
    name: "<Sidebar />",
    description: "The wizard sidebar containing buttons that link to each step.",
    properties: [
      new Item({
        name: "steps",
        description: "An array containing the wizard steps to mapped through and rendered as buttons",
        defaultVal: "this.state.steps"
      }),
      new Item({
        name: "pickStep",
        description: "The \"pickStep\" function from <Wizard />",
        defaultVal: "this.pickStep"
      })
    ],
    functions: [
      new Item({
        name: "pickStep",
        description: "calls the <Wizard /> \"pickStep\" function and passes in the index of a clicked <StepButton />",
        parameters: [
          new Parameter({
            name: "index",
            dataType: "int",
            description: "The index of the clicked <StepButton />"
          })
        ]
      })
    ]
  }),
  new Doc({
    name: "<StepButton />",
    description: "Buttons to be rendered into the sidebar, each one representing a step.",
    properties: [
      new Item({
        name: "id",
        defaultVal: "string",
        description: "A uniquely generated 8 digit id."
      }),
      new Item({
        name: "active",
        defaultVal: "boolean",
        description: "Denotes whether the step is active and highlights itself accordingly."
      }),
      new Item({
        name: "title",
        description: "The title of the step",
        defaultVal: "string"
      }),
      new Item({
        name: "pickStep",
        defaultVal: "this.pickStep",
        description: "The \"pickStep\" function from <Sidebar />"
      }),
      new Item({
        name: "index",
        defaultVal: "int",
        description: "The index of the step in the steps array"
      })
    ],
    functions: [
      new Item({
        name: "pickStep",
        description: "Bubbles the current step index up to the \"pickStep()\" function of  <Wizard />",
      })
    ]
  }),
  new Doc({
    name: "<Body> ... </Body>",
    description: "A generic container which accepts children as a property, and renders them next to the wizard sidebar.",
    properties: [
      new Item({
        name: "this.props.children",
        description: "The elements to be rendered within the body. This is a special property in that the elements are passed between the opening and closing component tags rather than as a typical property passed on a self-closing tag.",
        defaultVal: "React Component"
      })
    ]
  }),
  new Doc({
    name: "<Toolbar />",
    description: "A toolbar which sits at the bottom of the wizard body and contains navigation and submission buttons.",
    properties: [
      new Item({
        name: 'stepIndex',
        defaultVal: "this.state.stepIndex",
        description: "The index of the current step in the steps array"
      }),
      new Item({
        name: "stepLength",
        defaultVal: "this.state.steps.length",
        description: "The number of steps in the steps array."
      }),
      new Item({
        name: "pickStep",
        defaultVal: "this.pickStep",
        description: "Passes a reference to the \"pickStep()\" function from <Wizard />"
      })
    ],
    functions: [
      new Item({
        name: "nextStep",
        description: "Calls the \"pickStep()\" function from <Wizard />, passing in the current index + 1. This has the effect of advancing the current step."
      }),
      new Item({
        name: "prevStep",
        description: "Calls the \"pickStep()\" function from <Wizard />, passing in the current index - 1. This has the effect of degressing the current step."
      })
    ]
  }),
  new Doc({
    name: "<Confirm />",
    description: "This is a more specialized type of <Section /> component. Instead of rendering a set of editable fields, it instead loops through all sections flagged to be included in the confirm step, and renders a read-only overview of the entire wizard.",
    properties: [
      new Item({
        name: "steps",
        defaultVal: "this.state.steps",
        description: "An array containing all steps."
      }),
      new Item({
        name: "index",
        defaultVal: "i",
        description: "The index of the section in the section array that was looped through during the render function of <Wizard />"
      })
    ]
  }),
  new Doc({
    name: "<ConfirmStep",
    description: "A child component of <Confirm />. This is a container representing a wizard step.",
    properties: [
      new Item({
        name: "title",
        defaultVal: "string",
        description: "The title of the step"
      })
    ]
  }),
  new Doc({
    name: "<ConfirmSection",
    description: "A child component of <ConfirmStep />. This is a container representing a section of a wizard step.",
    properties: [
      new Item({
        name: "section",
        defaultVal: "object",
        description: "An object representing a section of a wizard step."
      })
    ],
    functions: [
      new Item({
        name: "getField",
        description: "Runs a switch statement during the render function of <ConfirmSection /> and returns a properly formatted, read-only field.",
        parameters: [
          new Parameter({
            name: "field",
            dataType: "object",
            description: "An object representing a field. This object is passed in during rendering, by the map function which loops through all fields in a section."
          }),
          new Parameter({
            name: "i",
            dataType: "int",
            description: "The index of the field in the field array being mapped through on render of <ConfirmSection />"
          })
        ],
        returns: [
          new Parameter({
            name: "<ConfirmField />",
            dataType: "React Component",
            description: "Returns a <ConfirmField /> component."
          })
        ]
      })
    ]
  }),
  new Doc({
    name: "<ConfirmField />",
    description: "A const which renders a simple bootstrap row containing the field label and value",
    properties: [
      new Item({
        name: "label",
        defaultVal: "string",
        description: "The field's label"
      }),
      new Item({
        name: "value",
        defaultVal: "string",
        description: "Converts the fields value to a string before passing."
      })
    ]
  }),
  new Doc({
    name: "<Section />",
    description: "Represents a step section. This component will loop through and render a list of fields.",
    properties: [
      new Item({
        name: "section",
        defaultVal: "object",
        description: "An object representing a step section."
      }),
      new Item({
        name: "setFieldValue",
        defaultVal: "function()",
        description: "A reference to the \"setFieldValue\" function of <Wizard />"
      })
    ],
    functions: [
      new Item({
        name: "setFieldValue",
        description: "Bubbles an object containing a field's indices and a new value up to the \"setFieldValue\" function of <Wizard />",
        parameters: [
          new Parameter({
            name: "field",
            dataType: "object",
            description: "contains the necessary indices to locate the field in the steps array, and contains a value to be set as the field's new value."
          })
        ]
      }),
      new Item({
        name: "getFields",
        description: "Runs a switch statement to return the proper <Field /> component",
        parameters: [
          new Parameter({
            name: "field",
            dataType: "object",
            description: "An object representing a field"
          }),
          new Parameter({
            name: "i",
            dataType: "int",
            description: "The index of the current field's location in the field array. Passed from the mapping function that loops through all the fields in a section during the render function of <Section />"
          })
        ]
      })
    ]
  }),
  new Doc({
    name: "<Field />",
    description: "Renders the container for each field (including the field label and description etc...), and then runs a function which will return and render the proper type of input control.",
    properties: [
      new Item({
        name: "field",
        defaultVal: "object",
        description: "An object representing a field."
      }),
      new Item({
        name: "type",
        defaultVal: "string",
        optional: true,
        description: "This nomenclature may appear confusing at first. This is not the type of field being rendered (text, radio, checkbox, etc..), this is the type of the field's parent. This is necessary because some fields are custom inputs that may contain multiple child fields. For example, a \"dependentCheck\" field has a parent field (A checkbox), and then whether or not that checkbox is checked determines the rendering of some child fields. The type of the parent field is \"dependentCheck\", while each of the children may have their own type (text, radio, checkbox, etc...). This parameter is the parent's type."
      }),
      new Item({
        name: "valid",
        defaultVal: "boolean",
        description: "This represents whether or not the value of the field is valid. Chris Patty may deprecate this method of determining field validity at a later date, but for now this is how it's done."
      }),
      new Item({
        name: "index",
        defaultVal: "int",
        description: "This is the index of a field in the field array."
      }),
      new Item({
        name: "parentIndex",
        defaultVal: "int",
        description: "Once again, don't be confused by this nomenclature. This represents the index of a parent field for special field types like \"addressBlock\" and \"dependentRadio\". ",
        optional: true
      }),
      new Item({
        name: "setFieldValue",
        defaultVal: "function",
        description: "A reference to the \"setFieldValue()\" function of <Section />, which in turn will bubble all the way up to same function in <Wizard />"
      }),
      new Item({
        name: "animationClass",
        defaultVal: "string",
        description: "This allows you to pass css classes that control entrance and exit animations. Currently we are using the animate.css library to manage common UI animations.",
        optional: true
      })
    ],
    functions: [
      new Item({
        name: "setFieldValue",
        description: "Gets the onChange even object and bubbles it up to the \"setFieldValue()\" function of <Wizard />.",
        parameters: [
          new Parameter({
            name: "e",
            dataType: "object",
            description: "An object representing a synthetic React event."
          })
        ]
      }),
      new Item({
        name: "getField",
        description: "This function is called during this component's render function. It will take passed-in field object and switch on the field type. It then returns the proper React component for each type of field.",
        returns: [
          new Parameter({
            name: "",
            description: "Returns a React Component representing a field type.",
            dataType: "React Component"
          })
        ]
      })
    ]
  }),
  new Doc({
    name: "<TextInput />",
    description: "A const that takes in the properties of a text input, and returns that text input wrapped in a div.",
    properties: [
      new Item({
        name: "value",
        defaultVal: "string",
        description: "The field value. Rendered into the html \"value\" attribute."
      }),
      new Item({
        name: "placeholder",
        defaultVal: "string",
        description: "The field placeholder. Rendered into the html \"placeholder\" attribute."
      }),
      new Item({
        name: "setFieldValue",
        defaultVal: "function",
        description: "A reference to the \"setFieldValue()\" function of <Field />, which in turn bubbles up to the same function in <Wizard />. This function is bound to the \"onChange\" event of the input."
      }),
      new Item({
        name: "required",
        defaultVal: "boolean",
        description: "The html \"required\" attribute is rendered as true or false respectively, depending on whether or not the field is required."
      }),
      new Item({
        name: "style",
        defaultVal: "object",
        description: "An object containing the width, and clear css attributes of the field. This is rendered into the html \"style\" attribute as an inline-style."
      }),
      new Item({
        name: "className",
        defaultVal: "string",
        description: "Any custom classes to be applied to the div that wraps the input. This is used primarily to apply css classes that visually denote field validity (\"valid\" and \"invalid\")."
      }),
      new Item({
        name: "disabled",
        defaultVal: "boolean",
        description: "A value of \"true\" will disable the field, while a value of \"false\" will leave it enabled. This is rendered into the html \"disabled\" attribute of the input."
      })
    ]
  }),
  new Doc({
    name: "<RadioInput />",
    description: "This is a wrapper class around <RadioGroup />. <RadioGroup /> is a pre-built React component installed via npm. As such its documentation is not found in this document. <RadioInput /> passes its props to <RadioGroup />, and runs a map function on \"this.props.options\" to render the radio options.",
    properties: [
      new Item({
        name: "value",
        defaultVal: "string",
        description: "The field value. Rendered into the html \"value\" attribute."
      }),
      new Item({
        name: "setFieldValue",
        defaultVal: "function",
        description: "A reference to the \"setFieldValue()\" function of <Field />, which in turn bubbles up to the same function in <Wizard />. This function is bound to the \"onChange\" event of the input."
      }),
      new Item({
        name: "required",
        defaultVal: "boolean",
        description: "The html \"required\" attribute is rendered as true or false respectively, depending on whether or not the field is required."
      }),
      new Item({
        name: "options",
        defaultVal: "array",
        description: "An array of option objects, each containing a label and a value."
      }),
      new Item({
        name: "disabled",
        defaultVal: "boolean",
        description: "A value of \"true\" will disable the field, while a value of \"false\" will leave it enabled. This is rendered into the html \"disabled\" attribute of the input."
      })
    ],
    functions: [
      new Item({
        name: "setFieldValue",
        description: "Bound to the \"onChange\" event of the <RadioGroup /> component. Takes the new value and bubbles it up to the same function in <Wizard />",
        parameters: [
          new Parameter({
            name: "e",
            description: "Typically this would be an object representing a synthetic React event, but <RadioGroup /> strips everything out of the object and instead returns a string representing the new selected value of the radio."
          })
        ]
      })
    ]
  }),
  new Doc({
    name: "<Select />",
    description: "Renders an html Select element, and loops through a passed-in array of options to render the select options.",
    properties: [
      new Item({
        name: "value",
        defaultVal: "string",
        description: "The field value. Rendered into the html \"value\" attribute."
      }),
      new Item({
        name: "setFieldValue",
        defaultVal: "function",
        description: "A reference to the \"setFieldValue()\" function of <Field />, which in turn bubbles up to the same function in <Wizard />. This function is bound to the \"onChange\" event of the input."
      }),
      new Item({
        name: "options",
        defaultVal: "array",
        description: "An array of option objects, each containing a label and a value."
      }),
      new Item({
        name: "style",
        defaultVal: "object",
        description: "An object containing the \"width\", and \"clear\" css attributes of the field. This is rendered into the html \"style\" attribute as an inline-style."
      }),
    ]
  }),
  new Doc({
    name: "<Checkbox />",
    description: "Renders an html input of type, \"checkbox\". In order to override the typical styles applied by the browser, a second label is rendered which is styled to look like a more modern checkbox. The actual checkbox element is hidden by its css, and its checked state is bound to the appearance of the aforementioned label.",
    properties: [
      new Item({
        name: "value",
        defaultVal: "string",
        description: "The field value. Rendered into the html \"value\" attribute."
      }),
      new Item({
        name: "setFieldValue",
        defaultVal: "function",
        description: "A reference to the \"setFieldValue()\" function of <Field />, which in turn bubbles up to the same function in <Wizard />. This function is bound to the \"onChange\" event of the input."
      }),
      new Item({
        name: "name",
        defaultVal: "string",
        description: 'This is technically just the id of the field. It\'s passed as the "name" since an html "name" attribute is required in order to tie a label to an input. This allows the user to click on a label, and the state of the input will change.'
      }),
      new Item({
        name: "label",
        defaultVal: 'string',
        description: "The checkbox's label."
      })
    ]
  })
]

export {Docs};
