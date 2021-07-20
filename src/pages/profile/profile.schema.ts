import * as Yup from 'yup';
import moment from 'moment';

export const profileSchema = Yup.object({
    birthday: Yup.date().nullable().max(moment().add(-16, 'years'), 'age-16'),
    first_name: Yup.string().required().name(),
    last_name: Yup.string().required().name(),
    email: Yup.string().required().email(),
    phone_number: Yup.string().nullable().phone(),
    addresses: Yup.array(Yup.object({
        postal_code: Yup.string().nullable().zip()
    })).nullable()
    // payment_info: Yup.object({
    //     account_number: Yup.string()
    //         .number().min(6).max(12),
    //     tax_id: Yup.string().number()
    //         .min(4).max(17),
    //     name_on_account: Yup.string().name(true)
    // })
});
