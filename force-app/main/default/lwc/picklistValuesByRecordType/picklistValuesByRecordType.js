import { LightningElement, track, wire, api } from "lwc";
import {
  getPicklistValuesByRecordType,
  getFieldValue
} from "lightning/uiObjectInfoApi";
import { getRecord } from "lightning/uiRecordApi";
import { FlowAttributeChangeEvent } from "lightning/flowSupport";

export default class PicklistValuesByRecordType extends LightningElement {
  @track options;
  @track value;
  @api fieldApiName;
  @api objApiName;
  @api recTypeId;
  @api outputValue;

  @wire(getPicklistValuesByRecordType, {
    objectApiName: "$objApiName",
    recordTypeId: "$recTypeId"
  })
  PicklistValues({ error, data }) {
    if (data) {
      console.log("data >>> " + data);
      this.options = data.picklistFieldValues[this.fieldApiName].values;
    } else if (error) {
      console.log("error =====> " + JSON.stringify(error));
    }
  }

  handleChange(event) {
    console.log("changed6");

    this.value = event.target.value;
    //this.outputValue = event.target.value;
    console.log("this.value >>> " + this.value);
    const attributeChangeEvent = new FlowAttributeChangeEvent(
      "outputValue",
      this.value
    );
    this.dispatchEvent(attributeChangeEvent);
    //this.handlePushChangeToFlow();
    // TODO https://developer.salesforce.com/docs/component-library/bundle/lightning-flow-support/documentation
    //https://salesforce.stackexchange.com/questions/282026/how-to-use-flowattributechangeevent-to-affect-component-visibility-in-flow
    //https://help.salesforce.com/articleView?id=flow_considerations_design_conditional_visibility.htm&type=0
  }

  // handlePushChangeToFlow() {
  //   // notify the flow of the new value
  //   console.log("handlePushChangeToFlow");
  //   console.log("this.value >>> " + this.value());
  //   const attributeChangeEvent = new FlowAttributeChangeEvent(
  //     "outputValue",
  //     this.value
  //   );
  //   this.dispatchEvent(attributeChangeEvent);
  // }
}
