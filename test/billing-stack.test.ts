import {App} from "@aws-cdk/core";
import {BillingStack} from "../lib/billing-stack";
import {SynthUtils} from "@aws-cdk/assert";

test("Billing satck", () =>{
    const app = new App();
    const billingStack = new BillingStack(app, "BillingStack" , {
        budgetAmount: 1,
        emailAddress: "mjmanav4@amazon.com"
    })

    expect(SynthUtils.toCloudFormation(billingStack)).toMatchSnapshot();
})