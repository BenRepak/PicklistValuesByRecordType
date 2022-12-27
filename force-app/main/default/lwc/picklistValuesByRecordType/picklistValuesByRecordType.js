import { LightningElement, track, wire, api } from "lwc";
import { getPicklistValuesByRecordType } from "lightning/uiObjectInfoApi";
import { FlowAttributeChangeEvent } from "lightning/flowSupport";

export default class PicklistValuesByRecordType extends LightningElement {
  @track options;
  @track _value;
  @api fieldApiName;
  @api fieldLabel;
  @api objApiName;
  @api recTypeId;
  @api outputValue;
  @api isRequired = false;
  @api placeholder = "Select One";

  @wire(getPicklistValuesByRecordType, {
    objectApiName: "$objApiName",
    recordTypeId: "$recTypeId"
  })
  PicklistValues({ error, data }) {
    if (data) {
      //console.log("data >>> " + data);
      this.options = data.picklistFieldValues[this.fieldApiName].values;
      // console.log('data.picklistFieldValues[this.fieldApiName] ' + JSON.stringify(data.picklistFieldValues[this.fieldApiName]));
    } else if (error) {
      console.log("error =====> " + JSON.stringify(error));
    }
  }

  handleChange(event) {
    console.log("handleChange event");

    this._value = event.target.value;
    this.value = this._value;
    // set to undefined to so validate works properly if switching from value to no value on required input
    if(this._value == ""){
      this._value = undefined;
    }
 

    console.log("this._value >>> " + this._value);

    const attributeChangeEvent = new FlowAttributeChangeEvent(
      "outputValue",
      this._value
    );
    this.dispatchEvent(attributeChangeEvent);
    //this.handlePushChangeToFlow();
    // TODO https://developer.salesforce.com/docs/component-library/bundle/lightning-flow-support/documentation
    //https://salesforce.stackexchange.com/questions/282026/how-to-use-flowattributechangeevent-to-affect-component-visibility-in-flow
    //https://help.salesforce.com/articleView?id=flow_considerations_design_conditional_visibility.htm&type=0
    // console.log("this.isRequired >>> " + this.isRequired);
    // console.log("this.outputValue >>> " + this.outputValue);
    // console.log("this.placeholder >>> " + this.placeholder);
  }

  //https://developer.salesforce.com/docs/component-library/documentation/en/lwc/use_build_for_flow_screens
  @api
  validate() {
    // known issue summer 20 https://success.salesforce.com/issues_view?id=a1p3A000001pXVmQAM
    // console.log("validate");
    // console.log("this.isRequired >>> " + this.isRequired);
    // console.log("this.outputValue >>> " + this.outputValue);
    // console.log("this.placeholder >>> " + this.placeholder);
    // console.log("this.placeholder >>> " + this.placeholder);



    if (this.isRequired === false) {
      return { isValid: true };
    } else if (this.isRequired == true && this.outputValue !== undefined) {
      return { isValid: true };
    } else {
      // If the component is invalid, return the isValid parameter
      // as false and return an error message.
      return {
        isValid: false,
        errorMessage: "Please choose one."
      };
    }
  }
}
