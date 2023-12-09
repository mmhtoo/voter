import * as z from 'zod'

const commonTopicSchema = {
  name: z
    .string({ required_error: "Topic's name is required!" })
    .min(10, 'Minimum is 10 characters!')
    .max(200, 'Maximum is 0 characters!')
    .max(200, 'Maximum is 200 characters!'),
  description: z
    .string({ required_error: "Topic's description is required!" })
    .min(200, 'Minimum is 200 characters!')
    .max(1000, 'Maximum is 1000 characters!'),
  pointsPerVote: z
    .string({
      required_error: 'Required points per one vote is required to add!',
    })
    .regex(/^\d+\.?\d*$/, 'Invalid input!'),
  fromDate: z.date({
    required_error:
      'Need to choose for start date and end date for voting period to Topic!',
  }),
  imageName: z.string({
    required_error: "Topic's image is required!",
  }),
  toDate: z.date({
    required_error:
      'Need to choose for start date and end date for voting period to Topic!',
  }),
}

export const createTopicSchema = z.object({
  ...commonTopicSchema,
})

export type CreateTopicForm = z.infer<typeof createTopicSchema>

export const editTopicSchema = z.object({
  ...commonTopicSchema,
  id: z.string({
    required_error: "Topic's id is required!",
  }),
})

export type EditTopicForm = z.infer<typeof editTopicSchema>

export const createContestantSchema = z.object({
  name: z
    .string({
      required_error: "Contestant's name is required!",
    })
    .min(5, 'Name should have minium 5 characters!')
    .max(100, 'Name should not have more then 100 characters!'),
  description: z
    .string({
      required_error: "Contestant's description is required!",
    })
    .min(30, 'Description should have minimum 30 characters!')
    .max(300, 'Description should not have more than 300 characters!'),
  image_name: z.string({
    required_error: 'Contestant image name is required!',
  }),
})

export type CreateContestantFormType = z.infer<typeof createContestantSchema>

export const commonPricingSchema = {
  point: z
    .string({
      required_error: 'Required points per one vote is required to add!',
    })
    .min(2, 'Allowed minimum is 10!')
    .max(6, 'Allowed maximum is 100000!')
    .regex(/^[1-9][0-9]+$/, 'Invalid point!'),
  amount: z
    .string({
      required_error: 'Amount is required for point pricing!',
    })
    .min(3, 'Allowed minimum is 100!')
    .max(6, 'Allowed maximum is 100000!')
    .regex(/^[1-9][0-9]+$/, 'Invalid amount!'),
}

export const createPricingSchema = z.object({
  ...commonPricingSchema,
})

export type CreatePricingForm = z.infer<typeof createPricingSchema>

export const updatePricingSchema = z.object({
  ...commonPricingSchema,
  id: z
    .string({
      required_error: 'Id is required!',
    })
    .uuid('Invalid id for pricing!'),
})

export type UpdatePricingForm = z.infer<typeof updatePricingSchema>

export const commonPaymentMethodSchema = {
  name: z
    .string({
      required_error: "Payment method's name is required!",
    })
    .min(5, 'Allowed minimum is 5 characters!')
    .max(50, 'Allowed maximum is 50 characters!'),
}

export const addPaymentMethodSchemaWithPhone = z.object({
  ...commonPaymentMethodSchema,
  phone: z
    .string({
      required_error: 'Phone number is required to add!',
    })
    .min(6, 'Allowed minimum is 6 characters!')
    .max(13, 'Allowed maximum is 13 characters!')
    .regex(/^\d+[0-9]{5,13}$/, 'Invalid phone number!'),
})

export type AddPaymentMethodWithPhoneForm = z.infer<
  typeof addPaymentMethodSchemaWithPhone
>

export const addPaymentMethodSchemeWithAccount = z.object({
  ...commonPaymentMethodSchema,
  accountNumber: z
    .string({
      required_error: 'Account number is required to add!',
    })
    .min(8, 'Allowed minimum is 8!')
    .max(17, 'Allowed maximum is 17!')
    .regex(
      /^\d+[0-9]{7,17}$/,
      "You can't contain any characters except numbers, invalid format!"
    ),
})

export type AddPaymentMethodWithAccountForm = z.infer<
  typeof addPaymentMethodSchemeWithAccount
>

export const updatePaymentMethodSchemaWithPhone = z.object({
  ...commonPaymentMethodSchema,
  id: z.number({
    required_error: 'Payment method id is required!',
  }),
  phone: z
    .string({
      required_error: 'Phone number is required to add!',
    })
    .min(6, 'Allowed minimum is 6 characters!')
    .max(13, 'Allowed maximum is 13 characters!')
    .regex(/^\d+[0-9]{5,13}$/, 'Invalid phone number!'),
})

export type UpdatePaymentMethodWithPhoneForm = z.infer<
  typeof updatePaymentMethodSchemaWithPhone
>

export const updatePaymentMethodSchemaWithAccount = z.object({
  ...commonPaymentMethodSchema,
  id: z.number({
    required_error: 'Payment method id is required!',
  }),
  accountNumber: z
    .string({
      required_error: 'Account number is required to add!',
    })
    .min(8, 'Allowed minimum is 8!')
    .max(17, 'Allowed maximum is 17!')
    .regex(
      /^\d+[0-9]{7,17}$/,
      "You can't contain any characters except numbers, invalid format!"
    ),
})

export type UpdatePaymentMethodWithAccountForm = z.infer<
  typeof updatePaymentMethodSchemaWithAccount
>

export const requestBuyPointsSchema = z.object({
  clerkId: z.string({
    required_error: 'User Id is required!',
  }),
  pricingId: z
    .string({
      required_error: 'Need to select pricing!',
    })
    .uuid('Invalid Pricing Id!'),
  paymentMethodId: z.string({
    required_error: 'Payment Method is needed to choose!',
  }),
  screenshoot: z.string({
    required_error: "Transaction's screenshoot is required!",
  }),
})

export type RequestBuyPointsForm = z.infer<typeof requestBuyPointsSchema>
