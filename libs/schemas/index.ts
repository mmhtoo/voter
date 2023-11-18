import * as z from 'zod'

export const createTopicSchema = z.object({
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
})

export type CreateTopicForm = z.infer<typeof createTopicSchema>
