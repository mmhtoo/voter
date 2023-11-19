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
