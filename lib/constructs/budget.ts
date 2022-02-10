import {Construct} from "@aws-cdk/core";
import * as cdk from "@aws-cdk/core";
import {CfnBudget} from "@aws-cdk/aws-budgets";

interface BudgetProps {
 budgetAmount: number,
 emailAddress: string,
}

export class Budget extends Construct {
    constructor(scope: cdk.Construct, id: string, props: BudgetProps) {
        super(scope, id);


        new CfnBudget(this, "Budget", {
            budget: {
                budgetLimit: {
                    amount: props.budgetAmount,
                    unit: 'USD'
                },
                budgetName: "Monthly budget",
                budgetType: "COST",
                timeUnit: "MONTHLY"
            },

            notificationsWithSubscribers: [{
                notification:{
                    threshold: 5,
                    notificationType: "ACTUAL",
                    comparisonOperator: "GREATER_THAN",
                    thresholdType: "ABSOLUTE_VALUE"
                },
                subscribers:[{
                    subscriptionType: 'EMAIL',
                    address: props.emailAddress
                }]
            }]

    })
    }

}