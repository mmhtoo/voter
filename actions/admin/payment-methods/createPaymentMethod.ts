'use server'

import {
  AddPaymentMethodWithAccountForm,
  AddPaymentMethodWithPhoneForm,
  addPaymentMethodSchemaWithPhone,
  addPaymentMethodSchemeWithAccount,
} from '@/libs/schemas'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import getPaymentMethodByNameAndAccount from './getPaymentMethodByNameAndAccount'
import getPaymentMethodByNameAndPhone from './getPaymentMethodByNameAndPhone'

export default async function createPaymentMethod(
  param: AddPaymentMethodWithPhoneForm & AddPaymentMethodWithAccountForm,
  target: 'account' | 'phone'
): Promise<ActionResponse> {
  try {
    const validation =
      target == 'account'
        ? addPaymentMethodSchemeWithAccount.safeParse(param)
        : addPaymentMethodSchemaWithPhone.safeParse(param)

    if (!validation.success) {
      return { message: 'Invalid request data!', status: 'Failed' }
    }

    const savedPayemnt =
      target == 'account'
        ? await getPaymentMethodByNameAndAccount(
            param.name,
            param.accountNumber
          )
        : await getPaymentMethodByNameAndPhone(param.name, param.phone)

    if (savedPayemnt) {
      return {
        message: `You have already used as payment method with current ${
          target == 'account' ? 'account!' : 'phone!'
        }`,
        status: 'Failed',
      }
    }

    const result = await sql`
      INSERT INTO payment_methods (name,phone,account_number)
      VALUES(${param.name},${param.phone || null},${
      param.accountNumber || null
    })
    `
    if (result.rowCount === 0) {
      return {
        message: 'Failed to add new payment method!',
        status: 'Failed',
      }
    }

    revalidatePath('/admin/dashboard/payment-methods')

    return {
      message: 'Successfully added!',
      status: 'Success',
    }
  } catch (e) {
    console.log('Error at createPaymentMethod ', e)
    return {
      message: 'Something went wrong, please try again or later!',
      status: 'Failed',
    }
  }
}
