'use server'

import {
  UpdatePaymentMethodWithAccountForm,
  UpdatePaymentMethodWithPhoneForm,
  updatePaymentMethodSchemaWithAccount,
  updatePaymentMethodSchemaWithPhone,
} from '@/libs/schemas'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import getPaymentMethodByNameAndAccount from './getPaymentMethodByNameAndAccount'
import getPaymentMethodByNameAndPhone from './getPaymentMethodByNameAndPhone'
import { today } from '@/libs/utils'

export default async function updatePaymentMethod(
  param: UpdatePaymentMethodWithAccountForm & UpdatePaymentMethodWithPhoneForm,
  target: 'account' | 'phone'
): Promise<ActionResponse> {
  try {
    const validation =
      target == 'account'
        ? updatePaymentMethodSchemaWithAccount.safeParse(param)
        : updatePaymentMethodSchemaWithPhone.safeParse(param)

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

    if (savedPayemnt && savedPayemnt.id != param.id) {
      return {
        message: `You have already used as payment method with current ${
          target == 'account' ? 'account!' : 'phone!'
        }`,
        status: 'Failed',
      }
    }

    if (
      savedPayemnt &&
      savedPayemnt.id === param.id &&
      savedPayemnt.name == param.name &&
      (savedPayemnt.phone == param.phone ||
        savedPayemnt.account_number == param.accountNumber)
    ) {
      return {
        message: 'Nothing was changed!',
        status: 'Success',
      }
    }

    const result = await sql`
      UPDATE payment_methods 
      SET name = ${param.name}, phone = ${param.phone}, 
      account_number = ${param.accountNumber}, updated_at = ${today()}
      WHERE id = ${param.id};
    `
    if (result.rowCount === 0) {
      return {
        message: 'Failed to updated!',
        status: 'Failed',
      }
    }

    revalidatePath('/admin/dashboard/payment-methods')

    return {
      message: 'Successfully updated!',
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
