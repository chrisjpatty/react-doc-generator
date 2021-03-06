import shortid from 'shortid';
import component_structure from './component_structure.svg';
import wizard from './wizard.png';
import stepButton from './stepButton.png';
import toolbar from './toolbar.png';
import wizardExample from './wizardExample.png';
import cra from './cra.png';
import repeater from './repeater.png';

class File {
  constructor(file = {}){
    this.name = file.name || "file",
    this.active = file.active || false;
    this.docs = file.docs || [];
    this.id = file.id || "";
  }
}

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
    this.code = doc.code || "";
    this.customItems = doc.customItems || null;
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
    this.code = item.code || null;
    this.image = item.image || null;
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

let Files = [
  new File({
    name: "file.js",
    id: 'file',
    docs: [
      new Doc({
        name: "<File />",
        description: "This is the parent container for <Wizard /> and <Intro />. This component is only responsible for controlling which of the previously mentioned components should be rendered. The intro will be shown by default, and when the start button is clicked, the <Intro /> component is unmounted, and <Wizard /> is mounted.",
        state: [
          new Item({
            name: "started",
            defaultVal: "false",
            description: "A boolean representing whether the user has clicked the \"Get Started\" button."
          })
        ],
        properties: [
          new Item({
            name: "intro",
            defaultVal: "object",
            description: "An object representing an intro."
          }),
          new Item({
            name: "wizard",
            defaultVal: "object",
            description: "An object representing a wizard."
          })
        ],
        functions: [
          new Item({
            name: "start",
            description: "Sets the \"started\" property of the state to true."
          })
        ]
      })
    ]
  }),
  new File({
    name: "wizard-data.js",
    id: "wizardData",
    docs: [
      new Doc({
        name: "Overview",
        description: "wizard-data.js holds the json definitions for each form wizard. To define a new wizard, adhere to the following structure:",
        code: "var wizardName = {\n  intro: {\n    title: 'Intro Title',\n    instructions: [\n      new Instruction({\n        title: \"Instruction Title\",\n        bullets: [\n          new Bullet({content: \"HTML content goes <b>here</b>\"})\n        ]\n      })\n    ]\n  },\n  wizard: {\n    steps: [\n      new Step({\n        title: \"Step Name\",\n        sections: [\n          new Section({\n            title: 'Section Title',\n            fields: [\n              new Field({\n                label: \"Field Label\",\n                type: \"text\",\n              })\n            ]\n          })\n        ]\n      })\n    ]\n  }\n}",
        customItems: [
          new Item({
            description: "The above code will output the following wizard:",
            image: wizardExample
          })
        ]
      }),
      new Doc({
        name: "Instruction",
        description: "A class representing a set of instructions for an introduction component.",
        properties: [
          new Item({
            name: "title",
            defaultVal: "string",
            description: "The title of the instruction group to be used as a header."
          }),
          new Item({
            name: "bullets",
            defaultVal: "array",
            description: "An array of bullets to be rendered under the instruction header."
          })
        ]
      }),
      new Doc({
        name: "Bullet",
        description: "A class representing a bullet to be rendered under the instruction header of an instruction group.",
        properties: [
          new Item({
            name: "content",
            defaultVal: "string",
            description: "The content of the bullet. If html is included in this string it will be parsed to proper html."
          })
        ]
      }),
      new Doc({
        name: "Step",
        description: "A class representing a Wizard Step.",
        properties: [
          new Item({
            name: "stepId",
            defaultVal: "string",
            description: "A short, url-friendly id, automatically generated at runtime."
          }),
          new Item({
            name: "title",
            defaultVal: "string",
            description: "The title of the Step."
          }),
          new Item({
            name: "active",
            defaultVal: "boolean",
            description: "Denotes whether or not a step is currently active. This is used to render the proper sections in the <Body></Body> component of Wizard.js"
          }),
          new Item({
            name: "sections",
            defaultVal: "array",
            description: "An array of Section objects representing sections of the Step."
          }),
          new Item({
            name: "confirm",
            defaultVal: "boolean",
            description: "Denotes if the step should be included in the special <Confirm /> component of Wizard.js"
          })
        ]
      }),
      new Doc({
        name: "Section",
        description: "A class representing a section of a step.",
        properties: [
          new Item({
            name: "sectionId",
            defaultVal: "string",
            description: "A short, url-friendly id, automatically generated at runtime."
          }),
          new Item({
            name: "title",
            defaultVal: "string",
            description: "The title of the Section."
          }),
          new Item({
            name: "type",
            defaultVal: "string",
            description: "The type of section. This property is not currently implemented, but is included to leave the possiblity of creating custom section types."
          }),
          new Item({
            name: "fields",
            defaultVal: "array",
            description: "An array of fields that will be rendered inside of the"
          })
        ]
      }),
      new Doc({
        name: "Confirm",
        description: "Extends Section. This class represents a special section which will trigger React to loop through and render a read-only overview of all of the steps marked with the \"confirm\" property.",
        properties: [
          new Item({
            name: "type",
            defaultVal: "string",
            description: "Overrides the \"type\" attribute of the extended Section class. Defaults to \"confirm\"."
          })
        ]
      }),
      new Doc({
        name: "Field",
        description: "A class representing a form field. Some field types may have a set of subfields (for example: \"addressBlock\"). This class should be used to create those subfields as well.",
        properties: [
          new Item({
            name: "fieldId",
            defaultVal: "string",
            description: "A short url-friendly id which is generated at runtime."
          }),
          new Item({
            name: "label",
            defaultVal: 'string',
            description: "Will be rendered preceding the field input in a <label> tag."
          }),
          new Item({
            name: "description",
            defaultVal: "string",
            description: "A description which will be rendered between the field label and input."
          }),
          new Item({
            name: "type",
            defaultVal: "string",
            description: 'The type of field input to be rendered. Currently the possible valid values include, "text", "radio", "select", "checkbox", "date", "dependentRadio", "dependentSelect", "dependentCheck", "addressBlock", and "confirmFields".'
          }),
          new Item({
            name: "width",
            defaultVal: "string",
            description: "The width of the field input. This value must be a valid css width, as it will be passed to the input as an inline-style. Defaults to \"60%\"."
          }),
          new Item({
            name: "clear",
            defaultVal: "string",
            description: '[Deprecated] The css "clear" attribute which determines if fields can sit next to each other. This attribute is currently not implemented.'
          }),
          new Item({
            name: "placeholder",
            defaultVal: "string",
            description: "A placeholder for the field input. Defaults to no placholder."
          }),
          new Item({
            name: "value",
            defaultVal: "various dataTypes",
            description: "The value of the field input. Typically a string, but some field types may require a different data type. For example, \"checkbox\" will require a boolean value representing a checked or unchecked state."
          }),
          new Item({
            name: "validation",
            defaultVal: "object",
            description: "An object which defines the types of validation to be run on the field. ",
            parameters: [
              new Parameter({
                name: "onChange",
                dataType: "array",
                description: "An array of validation objects which will be run every time the field value changes. "
              }),
              new Parameter({
                name: "onBlur",
                dataType: "array",
                description: "An array of validation objects which will be run as soon as the field loses focus."
              }),
              new Parameter({
                name: "onAdvance",
                dataType: "array",
                description: "An array of validation objects which will be run as soon as the user attempts to advance to a different step."
              })
            ]
          }),
          new Item({
            name: "errorMessage",
            defaultVal: "string",
            description: "An error message to be displayed to the user. This property generally should not initially be set or the user would see an error message before they've attempted to fill out the form. This property is used by validation.js to return an error message if the input is invalid. (For more information, see the entry for validation.js)"
          }),
          new Item({
            name: "mask",
            defaultVal: 'object',
            description: "An object representing a mask function to be applied to the field input. This property is described in more detail in validation.js."
          }),
          new Item({
            name: "isValid",
            defaultVal: "boolean",
            description: "Represents whether the user's input is valid, invalid, or null (meaning there has been no input). This value defaults to null, but if a user's data is being pulled from a database, this property should be overridden with the validity of the initial data, as currently there is no function to perform this check on the client side."
          }),
          new Item({
            name: 'required',
            defaultVal: "boolean",
            description: "Represents whether or not the field requires input before the user may advance to another step, or submit the form. Defaults to false."
          }),
          new Item({
            name: "disabled",
            defaultVal: 'boolean',
            description: "Represents whether or not the field input should be disabled. Defaults to false."
          }),
          new Item({
            name: "selectedIndex",
            defaultVal: "int",
            description: "This property is only required by certain field types, namely, \"select\", and \"radio\". It indicates the index of the selected option object. To be clear, the \"value\" property of Field holds the string value of the option, while this property is that option's index."
          }),
          new Item({
            name: "options",
            defaultVal: "array",
            description: "An array of option objects which will be rendered as options for \"select\" and \"radio\" field types. When rendered, these field types will default to the first option in this array, unless a different value has been specified by setting the appropriate value property AND selectedIndex property.",
            parameters: [
              new Parameter({
                name: "value",
                dataType: "string",
                description: "This is the back-end value of the option. This property is not presented to the user, but is instead used uniquely identify each option. As such, the value property of each object in the options array must be unique per field, and should generally be \"url-safe\"."
              }),
              new Parameter({
                name: "label",
                dataType: 'string',
                description: "This label will be shown to the user to represent each option."
              })
            ]
          })
        ]
      }),
      new Doc({
        name: "ConfirmFields",
        description: "Extends Field. This class represents a special kind of field which renders two inputs whose values must match to be considered valid.",
        properties: [
          new Item({
            name: 'confirmFieldId',
            defaultVal: 'string',
            description: "A special type of field Id which represents both fields together as a group. This is a short, url-friendly id which is generated at run-time."
          }),
          new Item({
            name: "fields",
            defaultVal: "array",
            description: "An array of Field objects which represent the fields whose values should match. Currently this field type only supports two fields, but if it neccessary, support for multiple fields can be added."
          }),
          new Item({
            name: "type",
            defaultVal: "string",
            description: "overrides the \"type\" property of Field. Defaults to \"confirmFields\", which is required for proper rendering of these fields."
          }),
          new Item({
            name: "match",
            defaultVal: "boolean",
            description: "Represents whether or not the provided fields' values match. If both of the values are null, this property will be null. This property is distinct from the \"valid\" property of Field, in that this only tracks whether or not the fields match, not whether or not their input is valid. For example, two fields which ask the user to confirm the name of a business could match, but the business name could still be invalid. This field requires both the match and valid properties to equal \"true\" in order for the UI to reflect their validity."
          })
        ],
        code: '...\nnew ConfirmFields({\n   type: "confirmFields",\n   fields: [\n     new Field({\n       label: "Business Entity Name",\n       width: "40%",\n       required: true\n     }),\n     new Field({\n       label: "Confirm Name",\n       width: "40%",\n       required: true\n     })\n   ]\n })\n...'
      }),
      new Doc({
        name: "AddressBlock",
        description: "A class representing a group of pre-defined address fields.",
        properties: [
          new Item({
            name: 'type',
            defaultVal: "string",
            description: "Defines the field type as \"addressBlock\"."
          }),
          new Item({
            name: "label",
            defaultVal: "string",
            description: "This label will be rendered above all of the address fields to denote the type of address to be entered."
          }),
          new Item({
            name: "fields",
            defaultVal: "array",
            description: "An array of Field objects. This property is defined by the constructor, and cannot be overridden. Currently the included fields are, \"Street Address\", \"Suite or Apartment Number\", \"City\", \"State\", \"County\", \"Country\", and \"Postal Code\"."
          })
        ],
        code: '...\nnew AddressBlock({label: "Agent Address"})\n...'
      }),
      new Doc({
        name: "DependentRadio",
        description: "Extends Field. A class representing a special field type where the fields that are rendered proceeding it are determined by the value of a radio input.",
        properties: [
          new Item({
            name: "type",
            defaultVal: "string",
            description: "dependentRadio"
          }),
          new Item({
            name: "options",
            defaultVal: "array",
            description: 'An array of option objects. These options will be rendered as the radio input\'s options.',
            parameters: [
              new Parameter({
                name: "value",
                dataType: "string",
                description: "This is the back-end value of the option. This property is not presented to the user, but is instead used to uniquely identify each option. As such, the value property of each object in the options array must be unique per field, and should generally be \"url-safe\"."
              }),
              new Parameter({
                name: "label",
                dataType: 'string',
                description: "This label will be shown to the user to represent each option."
              }),
              new Parameter({
                name: "fields",
                dataType: 'array',
                description: "This is an array of Field objects that will be rendered if this option is selected."
              })
            ]
          }),
          new Item({
            name: "value",
            defaultVal: "string",
            description: "The value of the radio input. Defaults to the value of the first option object in the options array."
          }),
          new Item({
            name: "label",
            defaultVal: "string",
            description: "Overrides the label property of Field. This is the label of the radio input."
          })
        ],
        customItems: [
          new Item({
            code: '/*The following code example will render no fields if "Domestic North Dakota Business" \nis checked, and will render 4 fields if "Foreign Business is checked."*/\nnew DependentRadio({\n  label: "Formation Locale",\n  options: [\n    {value: "domestic", label: "Domestic North Dakota Business", fields: []},\n    {value: "foreign", label: "Foreign Business", fields: [\n      new Field({\n        type: "text",\n        label: "State or Country of Formation",\n        width: "30%"\n      }),\n      new Field({\n        type: "date",\n        label: "Formed On:",\n        width: "20%"\n      }),\n      new Field({\n        type: "date",\n        label: "Commenced Doing Business in North Dakota on:",\n        width: "20%"\n      }),\n      new Field({\n        type: "date",\n        label: "Certificate of Existence Date",\n        width: "20%"\n      })\n    ]}\n  ]\n})'
          })
        ]
      }),
      new Doc({
        name: "DependentSelect",
        description: "Extends Field. A class representing a special field type where the fields that are rendered proceeding it are determined by the value of a select input.",
        properties: [
          new Item({
            name: "type",
            defaultVal: "string",
            description: "dependentSelect"
          }),
          new Item({
            name: "options",
            defaultVal: "array",
            description: 'An array of option objects. These options will be rendered as the select input\'s options.',
            parameters: [
              new Parameter({
                name: "value",
                dataType: "string",
                description: "This is the back-end value of the option. This property is not presented to the user, but is instead used to uniquely identify each option. As such, the value property of each object in the options array must be unique per field, and should generally be \"url-safe\"."
              }),
              new Parameter({
                name: "label",
                dataType: 'string',
                description: "This label will be shown to the user to represent each option."
              }),
              new Parameter({
                name: "fields",
                dataType: 'array',
                description: "This is an array of Field objects that will be rendered if this option is selected."
              })
            ]
          }),
          new Item({
            name: "value",
            defaultVal: "string",
            description: "The value of the select input. Defaults to the value of the first option object in the options array."
          }),
          new Item({
            name: "label",
            defaultVal: "string",
            description: "Overrides the label property of Field. This is the label of the radio input."
          })
        ]
      }),
      new Doc({
        name: "DependentCheck",
        description: "Extends Field. This class represents a special field type that will render a set of fields depending on the checked state of a checkbox.",
        properties: [
          new Item({
            name: "type",
            defaultVal: "string",
            description: "Overrides the \"type\" value of Field with \"dependentCheck\""
          }),
          new Item({
            name: "value",
            defaultVal: 'boolean',
            description: "Overrides the \"value\" property of Field with a boolean value. Defaults to false (unchecked)."
          }),
          new Item({
            name: "label",
            defaultVal: "string",
            description: "Overrides the \"label\" property of Field."
          }),
          new Item({
            name: "checkedFields",
            defaultVal: "array",
            description: "An array of Field objects which will be rendered if the value of the checkbox is true (checked)."
          }),
          new Item({
            name: "uncheckedFields",
            defaultVal: "array",
            description: "An array of Field objects which will be rendered if the value of the checkbox is false (unchecked)."
          })
        ]
      }),
      new Doc({
        name: "<Repeater />",
        description: "Renders a repeatable grid of fields.",
        image: repeater,
        properties: [
          new Item({
            name: 'value',
            defaultVal: 'array',
            description: 'Repeaters hold the value of each row of the grid as an array of objects in the format below.',
            code:
`  [
    {
      [fieldId]: {
        [fieldName]: 'value',
        ...
      },
      ...
    }
  ]`,
          }),
          new Item({
            name: 'template',
            defaultVal: 'array',
            description: 'When a repeater component renders, it loops through this array of fieldIds to determine which fields to render.'
          })
        ]
      }),
      new Doc({
        name: '<RegisteredAgentSearch />',
        description: 'Renders a specialized component for both searching for, and creating new registered agents.',
        image: cra,
        properties: [
          new Item({
            name: 'value',
            defaultVal: 'object',
            description: 'This component holds its value in an object with the following structure: ',
            code:
`
  {
    INDIVIDUAL_YN: "y",
    COMMERCIAL_YN: "y",
    CRA_ID: "0",
    FIRST_NAME: "",
    MIDDLE_NAME: "",
    LAST_NAME: "",
    ORGANIZATION: "",
    ADDR1: "",
    ADDR2: "",
    ADDR3: "",
    CITY: "",
    STATE: "ND",
    COUNTY: "",
    COUNTRY: "USA",
    POSTAL_CODE: ""
  }
`
          })
        ]
      })
    ]
  }),
  new File({
    name: "wizard.js",
    id: 'wizard',
    docs: [
      new Doc({
        name: "Component Structure",
        image: component_structure
      }),
      new Doc({
        name: '<Wizard />',
        description: "This component is the \"single source of truth\" for all of its children. This should be the only component that maintains its own state. This should also be the only component with functions that can manipulate data. This is important because whenever data changes it can be easily traced to one place. \n \n There are some minor exceptions to the above rule for certain special components that require fetching data from the server to function. For example, <ServerSearch/> maintains some internal state that manages the loading states of the AJAX calls. However, the value of the fields are still inherited from the the state of <Wizard/>.",
        image: wizard,
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
            ],
            code: "pickStep = (index) => {\n    /* Gets the steps from the state and stores them in a variable to be manipulated. */\n    var steps = this.state.steps;\n     /* Loops through the steps, sets the new step to active, and sets all other steps to inactive. */\n    for (var i = 0; i < steps.length; i++){\n      if(i != index){\n        steps[i].active = false\n      }else{\n        steps[i].active = true\n      }\n    }\n    /* Updates the state with the new steps array, and the new stepIndex. */\n    this.setState({\n     stepIndex: index,\n     steps: steps\n    }, function(){\n      /* Scrolls the user to the top of the new step. */\n      scroll.top(page, 125, {ease: ease.outQuint, duration: 500});\n    })\n}"
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
        image: stepButton,
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
        image: toolbar,
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
  }),
  new File({
    name: "validate.js"
  })
]

export {Files};
