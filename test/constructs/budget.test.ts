import {App, Stack} from "@aws-cdk/core";
import {Budget} from "../../lib/constructs/budget";
import {expect as expectCdk, haveResource, haveResourceLike} from "@aws-cdk/assert";

test("Budget Construct", () => {
    const app = new App();
    const stack = new Stack(app, 'Stack');
    new Budget(stack, "Budget", {
        budgetAmount: 1,
        emailAddress: "manavjai@amazon.com"
    })

    expectCdk(stack).to(haveResourceLike('AWS::Budgets::Budget', {
        Budget: {
            BudgetLimit: {
                Amount: 1,
            }
        },
        NotificationsWithSubscribers: [
            {
                Subscribers: [{

                    Address: "manavjai@amazon.com"
                }]
            }
        ]
    }));
})