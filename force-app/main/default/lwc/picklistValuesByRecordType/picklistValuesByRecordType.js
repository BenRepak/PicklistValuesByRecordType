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
    } else if (error) {
      console.log("error =====> " + JSON.stringify(error));
    }
  }

  handleChange(event) {
    console.log("changed6");
    this._value = event.target.value;
    // console.log("this.value >>> " + this._value);
    const attributeChangeEvent = new FlowAttributeChangeEvent(
      "outputValue",
      this._value
    );
    this.dispatchEvent(attributeChangeEvent);
    //this.handlePushChangeToFlow();
    // TODO https://developer.salesforce.com/docs/component-library/bundle/lightning-flow-support/documentation
    //https://salesforce.stackexchange.com/questions/282026/how-to-use-flowattributechangeevent-to-affect-component-visibility-in-flow
    //https://help.salesforce.com/articleView?id=flow_considerations_design_conditional_visibility.htm&type=0
  }

  //https://developer.salesforce.com/docs/component-library/documentation/en/lwc/use_build_for_flow_screens
  @api
  validate() {
    // console.log("validate");
    // console.log("this.isRequired >>> " + this.isRequired);
    // console.log("this.outputValue >>> " + this.outputValue);
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
