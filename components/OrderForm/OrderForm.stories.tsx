import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {OrderForm, OrderFormProps} from "./OrderForm";

export default {
    component: OrderForm,
    title: "Order/Form",
} as Meta;

const Template: ComponentStory<typeof OrderForm> = (args: OrderFormProps) => <OrderForm {...args} />;
export const DefaultOrderForm = Template.bind({});
const props: Partial<OrderFormProps> = {};

DefaultOrderForm.args = props;
