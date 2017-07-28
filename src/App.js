import React, { Component } from 'react';
import 'normalize.css';
import './prism.css';
import './App.css';
import {Files} from './docs.js';
import {PrismCode} from "react-prism";
import ReactHtmlParser from 'react-html-parser';
import queryString from 'query-string';
import scrollToElement from 'scroll-to-element';
import VisibilitySensor from 'react-visibility-sensor';

class App extends Component {
  constructor(){
    super();
    var current = 0;
    Files[0].active = true;
    for (var i = 0; i < Files.length; i++){
      if(window.location.hash === "#" + Files[i].id){
        current = i;
        Files[i].active = true;
      }else if(window.location.hash !== ""){
        Files[i].active = false;
      }
    }
    this.state = {currentFile: current, files: Files}
  }
  toggleButton = (i,e) => {
    var files = this.state.files;
    files[this.state.currentFile].docs[i].visible = e;
    this.setState({
      files: files
    })
  }
  switchFile = (index) => {
    var files = this.state.files;
    for (var i = 0; i < files.length; i++){
      if(index === i){
        files[i].active = true
      }else{
        files[i].active = false;
      }
    }
    window.location.hash = files[index].id;
    this.setState({
      files: files,
      currentFile: index
    })
  }
  render() {
    return (
      <div className="App">
        <div className="app-header">
          {
            this.state.files.map((file, i) => {
              return <FileButton name={file.name} index={i} active={file.active} key={i} switchFile={this.switchFile}/>
            })
          }
        </div>
        <div className="sidebar">
          <div className="sidebar-wrapper">
            {
              this.state.files[this.state.currentFile].docs.map((doc, i) => {
                return <Link name={doc.name} visible={doc.visible} href={doc.id} key={i} />
              })
            }
          </div>
        </div>
        <div className="body">
          {
            this.state.files[this.state.currentFile].docs.map((doc, i) => {
              return <Doc doc={doc} index={i} toggleButton={this.toggleButton} key={i} />
            })
          }
        </div>
      </div>
    );
  }
}

class FileButton extends Component {
  constructor(props){
    super();
  }
  switchFile = () => {
    this.props.switchFile(this.props.index);
  }
  render(){
    return(
      <a className={"file-link " + (this.props.active ? "active" : "")} onClick={this.switchFile}>{this.props.name}</a>
    )
  }
}

class Link extends Component {
  constructor(props){
    super();
  }
  scrollTo = () => {
    scrollToElement("#" + this.props.href, {
      offset: -67,
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
  constructor(props){
    super();
  }
  shouldComponentUpdate = (nextProps) => {
    if(nextProps.doc.name === this.props.doc.name){
      return false;
    }else{
      return true;
    }

  }
  handleScroll = (e) => {
    this.props.toggleButton(this.props.index, e);
  }
  render(){
    var doc = this.props.doc;
    return(
      <VisibilitySensor onChange={this.handleScroll} scrollDelay={10} scrollCheck={true} partialVisibility={true} minTopValue={50}>
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
            doc.image ?
            <img src={doc.image} alt={doc.image}/>
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
            doc.code != "" ?
            <PrismCode className="language-javascript prism-block">
              {doc.code}
            </PrismCode>
            :
            null
          }
          {
            doc.customItems ?
            doc.customItems.map((item, i) => {
              return <CustomItem item={item} key={i} />
            })
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
          code={item.code}
          key={i}
        />)
      })
    }
  </div>
)

const Item = ({name, dataType, defaultVal, parameters, description, returns, code, optional}) => (
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
      {
        code ?
        <span className="parameter-container">
        <PrismCode className="language-javascript prism-block">
          {code}
        </PrismCode>
        </span>
        :
        null
      }
    </div>
  </div>
)

const CustomItem = ({item}) => (
  <div className="item custom">
    {
      item.description != "" && item.description ?
      <div className="doc-description">{item.description}</div>
      :
      null
    }
    {
      item.image ?
      <img src={item.image} />
      :
      null
    }
    {
      item.code ?
      <PrismCode className="language-javascript prism-block">
        {item.code}
      </PrismCode>
      :
      null
    }
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
