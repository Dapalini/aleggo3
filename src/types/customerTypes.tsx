import * as Yup from 'yup';
import mongoose, { Schema } from 'mongoose';

export const initialContactFieldValues = {
  label: '',
  data: ''
}

export const initialContactValues = {
  profilePic: '',
  contactType: '',
  contactName: '',
  contactTlf: '',
  contactEmail: '',
  contactAddress: '',
  contactFields: [],
  contactNotes: ''
}


export const initialCustomerValues = {
    customerName: '',
    customerNumber: '',
    startDate: '',
    enableEndDate: false,
    endDate: '',
    customerType: '',
    customerStatus: '',
    exactAddress: '',
    fullAddress: '',
    summaryData: '',
    accessNotes: '',
    practicalData: '',
    contacts: []
  };
  

  export const customerValidationSchema = Yup.object().shape({
    customerName: Yup.string().required('Customer Name is required'),
    customerNumber: Yup.number().positive().integer(),
    startDate: Yup.date(),
    enableEndDate: Yup.boolean(),
    endDate: Yup.mixed().test('required-if-enabled', 'Required', function (value) {
      const { enableEndDate } = this.parent;
      if (enableEndDate) {
        return value !== undefined && value !== null && value !== '';
      }
      return true;
    }).nullable(),
    customerType: Yup.string().required('Customer Type is required'),
    customerStatus: Yup.string().required('Customer Status is required'),
    exactAddress: Yup.string(),
    fullAddress: Yup.string(),
    summaryData: Yup.string(),
    accessNotes: Yup.string(),  
    practicalData: Yup.string(),
    contacts: Yup.array(
      Yup.object().shape({
            profilePic: Yup.mixed(),
            contactType: Yup.string().test(
              'required-if-contacts-not-empty',
              'Contact Type is required if contacts array is not empty',
              function (value) {
                const { contacts } = this.parent;
                if (contacts && contacts.length > 0) {
                  return !!value;
                }
                return true;
              }
            ),
            contactName: Yup.string().test(
              'required-if-contacts-not-empty',
              'Contact Type is required if contacts array is not empty',
              function (value) {
                const { contacts } = this.parent;
                if (contacts && contacts.length > 0) {
                  return !!value;
                }
                return true;
              }
            ),
            contactTlf: Yup.string(),
            contactEmail: Yup.string().email('Invalid email address'),
            contactAddress: Yup.string(),
            contactFields: Yup.array().of(
              Yup.object().shape({
                label: Yup.string().test(
                  'required-if-contacts-not-empty',
                  'Contact Type is required if contacts array is not empty',
                  function (value) {
                    const { contactFields } = this.parent;
                    if ( contactFields && contactFields.length > 0) {
                      return !!value;
                    }
                    return true;
                  }
                ),
                data: Yup.string().test(
                  'required-if-contacts-not-empty',
                  'Contact Type is required if contacts array is not empty',
                  function (value) {
                    const { contactFields } = this.parent;
                    if ( contactFields && contactFields.length > 0) {
                      return !!value;
                    }
                    return true;
                  }
                ),
              })
            ),
            contactNotes: Yup.string()
          })
      )
  });


interface IContactFields {
  label: string;
  data: string;
}

// Define the interface for Contacts
interface IContact {
  contactType: string;
  contactName: string;
  contactTlf?: string;
  contactEmail?: string;
  contactAddress?: string;
  contactFields?: IContactFields[];
  contactNotes?: string;
}

// Define the interface for the Customer
export interface ICustomer {
  customerName: string;
  customerNumber: string;
  startDate?: Date | string;
  enableEndDate?: boolean;
  endDate?: Date | string;
  customerType: string;
  customerStatus: string;
  exactAddress?: string;
  fullAddress?: string;
  summaryData?: string;
  accessNotes?: string;
  practicalData?: string;
  contacts?: IContact[];
}

// Define the schema for Contact Fields
const contactFieldsSchema = new Schema<IContactFields>({
  label: {
    type: String,
  },
  data: {
    type: String,
  },
}, { _id: false });

// Define the schema for Contacts
const contactSchema = new Schema<IContact>({
  contactType: {
    type: String,
  },
  contactName: {
    type: String,
  },
  contactTlf: {
    type: String,
  },
  contactEmail: {
    type: String,
  },
  contactAddress: {
    type: String,
  },
  contactFields: {
    type: [contactFieldsSchema],
  },
  contactNotes: {
    type: String,
  },
}, { _id: false });

// Define the schema for Customers
const customerSchema = new Schema<ICustomer>({
  customerName: {
    type: String,
    required: [true, 'Customer Name is required'],
  },
  customerNumber: {
    type: String,
    min: [1, 'Customer Number must be a positive integer'],
  },
  startDate: {
    type: Date,
    set: (v: any) => (typeof v === 'string' ? new Date(v) : v), // Convert string to Date if necessary
  },
  enableEndDate: {
    type: Boolean,
  },
  endDate: {
    type: Date,
    validate: {
      validator: function (this: ICustomer, value: Date | string | null) {
        return !this.enableEndDate || (value !== undefined && value !== null && value !== '');
      },
      message: 'End Date is required when Enable End Date is true',
    },
    set: (v: any) => {
      if (typeof v === 'string' && v.trim() === '') {
        return null;
      }
      return typeof v === 'string' ? new Date(v) : v;
    },
  },
  customerType: {
    type: String,
    required: [true, 'Customer Type is required'],
  },
  customerStatus: {
    type: String,
    required: [true, 'Customer Status is required'],
  },
  exactAddress: {
    type: String,
  },
  fullAddress: {
    type: String,
  },
  summaryData: {
    type: String,
  },
  accessNotes: {
    type: String,
  },
  practicalData: {
    type: String,
  },
  contacts: {
    type: [contactSchema],
    required: false, // Contacts array itself is not required
  },
});

export const createCustomer = async () => {
  const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);
  return Customer
}