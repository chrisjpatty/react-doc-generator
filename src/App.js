import React, { Component } from 'react';
import 'normalize.css';
import './App.css';
import {Docs} from './docs.js';
var scrollToElement = require('scroll-to-element');
var VisibilitySensor = require('react-visibility-sensor');

class App extends Component {
  constructor(){
    super();
    this.state = {docs: Docs}
  }
  toggleButton = (i,e) => {
    var docs = this.state.docs;
    docs[i].visible = e;
    this.setState({
      docs: docs
    })
  }
  render() {
    return (
      <div className="App">
        <div className="sidebar">
          <div className="sidebar-wrapper">
            {
              this.state.docs.map((doc, i) => {
                return <Link name={doc.name} visible={doc.visible} href={doc.id} key={i} />
              })
            }
          </div>
        </div>
        <div className="body">
          {
            this.state.docs.map((doc, i) => {
              return <Doc doc={doc} index={i} toggleButton={this.toggleButton} key={i} />
            })
          }
        </div>
      </div>
    );
  }
}

class Link extends Component {
  constructor(props){
    super();
  }
  scrollTo = () => {
    scrollToElement("#" + this.props.href, {
      offset: -10,
      ease: 'inOutCube',
      duration: 800
    });
  }
  render() {
    return (
      <a onClick={this.scrollTo} className={this.props.visible ? "visible" : ""}>{this.props.name}</a>
    )
  }
}

class Doc extends Component{
  constructor(){
    super();
  }
  shouldComponentUpdate = () => {
    return false;
  }
  handleScroll = (e) => {
    this.props.toggleButton(this.props.index, e);
  }
  render(){
    var doc = this.props.doc;
    return(
      <VisibilitySensor onChange={this.handleScroll} scrollDelay={10} scrollCheck={true} partialVisibility={true} minTopValue={200}>
        <div className="doc" id={doc.id}>
          <div className="header">
            {doc.name}
          </div>
          {
            doc.description ?
            <div className="doc-description">
              {doc.description}
            </div>
            :
            null
          }
          {
            doc.properties ?
            <Row title={"props"} items={doc.properties} />
            :
            null
          }
          {
            doc.state ?
            <Row title={"state"} items={doc.state} />
            :
            null
          }
          {
            doc.functions ?
            <Row title={"functions"} items={doc.functions} />
            :
            null
          }
          {
            doc.image ?
            <img src={doc.image} alt={doc.image}/>
            :
            null
          }
        </div>
      </VisibilitySensor>
    )
  }
}

const Row = ({title, items}) => (
  <div className="row">
    <h4>{title}</h4>
    {
      items.map((item, i) => {
        return (<Item
          name={item.name}
          dataType={item.dataType ? item.dataType + " - " : ""}
          defaultVal={item.defaultVal}
          parameters={item.parameters}
          description={item.description ? item.description : ""}
          optional={item.optional}
          returns={item.returns}
          key={i}
        />)
      })
    }
  </div>
)

const Item = ({name, dataType, defaultVal, parameters, description, returns, optional}) => (
  <div className="item">
    <div className="col name">
      {name}
    </div>
    <div className="col description">
      {
        defaultVal ?
        <span className="default-val">[{defaultVal}] - </span>
        :
        null
      }
      <span className="data-type">{optional ? "[optional: " + dataType + "]" : dataType}</span>{description}
      {
        parameters ?
        <span className="parameter-container">
        <h4 className="sub-header">Parameters</h4>
        {
          parameters.map((param, i) => {
            return <Parameter name={param.name} dataType={param.dataType} description={param.description} optional={param.optional} key={i}/>
          })
        }
        </span>
        :
        null
      }
      {
        returns ?
        <span className="parameter-container">
        <h4 className="sub-header">Returns</h4>
        {
          returns.map((ret, i) => {
            return <Parameter name={ret.name} dataType={ret.dataType} description={ret.description} optional={ret.optional} key={i}/>
          })
        }
        </span>
        :
        null
      }
    </div>
  </div>
)

const Parameter = ({name, dataType, description, optional}) => (
  <div className="parameter">
    <div className="param-name">
      {"[" + dataType + "] "}<b>{name}</b>
    </div>
    <div className="param-description">
      <i>{description}</i>
    </div>
  </div>
)

export default App;
