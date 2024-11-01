import React from 'react'
import { useParams, useRouter } from 'next/navigation';
import { Form, Field, ErrorMessage, useFormikContext, FieldArray } from 'formik';
import SubNav from '@/ui/common/SubNav'
import { initialContactFieldValues, initialContactValues } from '@/types/customerTypes';
import { FaRegTrashAlt } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { useCustomer } from '@/app/customers/[id]/context';


const BasicInfoEdit = ({handleSubmit, handleDelete }: any) => {

    const {values, resetForm, isValid, dirty, setFieldValue}: any = useFormikContext()

    const { error, loading } = useCustomer()

    const { id } = useParams();

    const router = useRouter();

    return (
      <>  { loading ?
              <div>
                <div className="m-3" style={{ color: "black", fontSize: "1.3rem" }}>Loading....</div>
              </div>
          : error ?
            <div>
              <div className="m-3" style={{ color: "black", fontSize: "1.3rem" }}>Error: {error}</div>
            </div> :
          <div>
              <SubNav>
                <div className="row d-flex justify-content-start">
                <div className="col-10 row d-flex justify-content-between">
                    <div className='col-auto row'>
                      <h3 className='col-auto'>{`Edit customer: ${values.customerName}`}</h3>
                      <h5 className='col-auto mt-2'>{`${values.company ? `(${values.company})` : ""}`}</h5>
                    </div>
                    <div className="col-3 d-flex justify-content-end">
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm me-2"
                        onClick={() => {
                          resetForm()
                          router.back();
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => {
                          handleSubmit(values); // Submit Formik form
                          alert("Customer saved");
                        }}
                        disabled={!isValid || !dirty} // Disable if form is not valid or clean
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm me-2"
                        onClick={() => {
                          handleDelete(id); // Submit Formik form
                        }}
                        disabled={id === "new"} // Disable if form is not valid or clean
                      >
                        Delete
                      </button> 
                  </div>
                </div>
                </div>
                </SubNav>
              <Form>
                  <div className="row mt-2">
                  <div className="form-group col-md-6">
                      <label htmlFor="customerName">Customer Name:</label>
                      <Field type="text" className="form-control" id="customerName" name="customerName" />
                      <ErrorMessage name="customerName" component="div" className="text-danger" />
                  </div>
                  <div className="form-group col-md-1">
                      <label htmlFor="customerNumber">Number:</label>
                      <Field type="number" className="form-control" id="customerNumber" name="customerNumber" />
                      <ErrorMessage name="customerNumber" component="div" className="text-danger" />
                  </div>
                  <div className="form-group col-md-2">
                      <label htmlFor="startDate">Start Date:</label>
                      <Field type="date" className="form-control" id="startDate" name="startDate" />
                      <ErrorMessage name="startDate" component="div" className="text-danger" />
                  </div>
                  <div className='col-12 col-md-3'>
                  <div className="form-group row align-items-center">
                      <div className="col-1">
                          <Field type="checkbox" className="form-check-input mt-4" id="enableEndDate" name="enableEndDate" />
                      </div>
                      <div className="col-9">
                          <label htmlFor="endDate" style={{color: `${!values.enableEndDate ? "gray": "black"}`}}>End Date:</label>
                          <Field type="date" className="form-control" id="endDate" name="endDate" disabled={!values.enableEndDate} />
                          <ErrorMessage name="endDate" component="div" className="text-danger" />
                      </div>
                      </div>
                  </div>
                  </div>
                  <div className="row mt-2">
                  <div className="form-group col-md-6">
                      <label htmlFor="customerType">Customer Type:</label>
                      <Field as="select" className="form-control" id="customerType" name="customerType">
                      <option value="">Select Customer Type</option>
                      <option value="Ejer Forening (E/F)">Ejer Forening (E/F)</option>
                      <option value="Andels Bolig Forening (A/B)">Andels Bolig Forening (A/B)</option>
                      <option value="Selskab">Selskab</option>
                      <option value="Virksomhed">Virksomhed</option>
                      <option value="Privat person">Privat person</option>
                      <option value="Custom label...">Custom label...</option>
                      </Field>
                      <ErrorMessage name="customerType" component="div" className="text-danger" />
                  </div>
                  <div className="form-group col-md-6">
                      <label htmlFor="customerStatus">Customer Status:</label>
                      <Field as="select" className="form-control" id="customerStatus" name="customerStatus">
                      <option value="">Select Customer Status</option>
                      <option value="Active regular">Active regular</option>
                      <option value="Active oneshot">Active oneshot</option>
                      <option value="Prospect">Prospect</option>
                      <option value="Offer out">Offer out</option>
                      <option value="Offer incomplete">Offer incomplete</option>
                      <option value="Offer reject">Offer reject</option>
                      <option value="Inactive">Inactive</option>
                      </Field>
                      <ErrorMessage name="customerStatus" component="div" className="text-danger" />
                  </div>
                  </div>
                  <div className="row mt-2">
                  <div className="form-group col-md-8">
                      <label htmlFor="exactAddress">Exact Address Location:</label>
                      <Field type="text" className="form-control" id="exactAddress" name="exactAddress" />
                      <ErrorMessage name="exactAddress" component="div" className="text-danger" />
                  </div>
                  </div>
                  <div className="row mt-2">
                  <div className="form-group col-md-12">
                      <label htmlFor="fullAddress">Full Address:</label>
                      <Field as="textarea" className="form-control" id="fullAddress" name="fullAddress" rows="2" />
                      <ErrorMessage name="fullAddress" component="div" className="text-danger" />
                  </div>
                  </div>
                  <div className="row mt-2">
                  <div className="form-group col-md-12">
                      <label htmlFor="summaryData">Summary Data on Property:</label>
                      <Field as="textarea" className="form-control" id="summaryData" name="summaryData" rows="2" />
                      <ErrorMessage name="summaryData" component="div" className="text-danger" />
                  </div>
                  </div>
                  <div className="row mt-2">
                  <div className="form-group col-md-12">
                      <label htmlFor="accessNotes">Access Notes:</label>
                      <Field as="textarea" className="form-control" id="accessNotes" name="accessNotes" rows="2" />
                      <ErrorMessage name="accessNotes" component="div" className="text-danger" />
                  </div>
                  </div>
                  <div className="row mt-2">
                    <div className="form-group col-md-12">
                        <label htmlFor="practicalData">Practical Data:</label>
                        <Field as="textarea" className="form-control" id="practicalData" name="practicalData" rows="2" />
                        <ErrorMessage name="practicalData" component="div" className="text-danger" />
                    </div>
                    </div>
                    <h4 className='row mt-2 ms-2'>Contacts</h4>
                    <FieldArray name="contacts">
                      {({ push, remove, swap }) => (
                        <>
                          { true ?
                              <div>
                                {values.contacts.map((contact: any, contactIndex: any) => (
                                  <div key={contactIndex} className="row border rounded m-2 mt-2">
                                    <div className="profile-image-container col-md-auto mt-4">
                                      <img src="/images/Big-profile.png" alt="Profile" className="profile-image-sm" />
                                      <Field type="file" id={`contacts.${contactIndex}.profilePic`} name={`contacts.${contactIndex}.profilePic`} style={{ display: 'none' }} />
                                      <label htmlFor={`contacts.${contactIndex}.profilePic`}></label>
                                      <button
                                        className="btn btn-primary btn-sm profile-lower-right-button-sm"
                                        type="button"
                                        onClick={() => document.getElementById(`contacts.${contactIndex}.profilePic`)?.click()}
                                      >
                                        <img src="/icons/upload-medium-light.svg" alt="Upload" />
                                      </button>
                                    </div>
                                    <div className="form-group col-md-4 mt-4">
                                      <label htmlFor={`contacts.${contactIndex}.contactType`}>Contact Type:</label>
                                      <Field
                                          as="select"
                                          className="form-control"
                                          id={`contacts.${contactIndex}.contactType`}
                                          name={`contacts.${contactIndex}.contactType`}
                                          required
                                          onChange={(e: any) => {
                                            const { value } = e.target;
                                            if (value === "Custom label...") {
                                              const customLabel = prompt("Please enter your custom label:");
                                              if (customLabel) {
                                                setFieldValue(`contacts.${contactIndex}.contactType`, customLabel);
                                              } else {
                                                setFieldValue(`contacts.${contactIndex}.contactType`, "");
                                              }
                                            } else {
                                              setFieldValue(`contacts.${contactIndex}.contactType`, value);
                                            }
                                          }}
                                        >
                                        <option value="">Select Contact Type</option>
                                        <option value="Main contact">Main contact</option>
                                        <option value="Foreman">Foreman</option>
                                        <option value="Deputy foreman">Deputy foreman</option>
                                        <option value="Key in charge">Key in charge</option>
                                        <option value="Cleaning in charge">Cleaning in charge</option>
                                        <option value="Resident">Resident</option>
                                        <option value="Custom label...">Custom label...</option>
                                      </Field>
                                      <ErrorMessage name={`contacts.${contactIndex}.contactType`} component="div" className="text-danger" />
                                    </div>
                                    <div className="form-group col-md-5 mt-4">
                                      <label htmlFor={`contacts.${contactIndex}.contactName`}>Name:</label>
                                      <Field type="text" className="form-control" id={`contacts.${contactIndex}.contactName`} name={`contacts.${contactIndex}.contactName`} required />
                                      <ErrorMessage name={`contacts.${contactIndex}.contactName`} component="div" className="text-danger" />
                                    </div>
                                    <div className='col'>
                                      <div className='row d-flex justify-content-end'>
                                        <div className='col-auto mt-4'>
                                          <button
                                            className="btn btn-primary btn-sm p-2 me-2"
                                            type="button"
                                            onClick={() => swap(contactIndex, contactIndex - 1)}
                                            disabled={contactIndex === 0}
                                          >
                                            <FaArrowUp style={{fontSize: "1.3rem"}}/>
                                          </button>
                                          <button
                                            className="btn btn-primary btn-sm p-2 me-2"
                                            type="button"
                                            onClick={() => swap(contactIndex, contactIndex + 1)}
                                            disabled={contactIndex === values.contacts.length - 1}
                                          >
                                            <FaArrowDown style={{fontSize: "1.3rem"}}/>
                                          </button>
                                          <button className="btn btn-danger btn-sm p-2" type="button" onClick={() => remove(contactIndex)}>
                                            <FaRegTrashAlt style={{fontSize: "1.3rem"}}/>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row mt-3">
                                      <div className="col-md-6">
                                        <label htmlFor={`contacts.${contactIndex}.contactTlf`}>Telephone nr.:</label>
                                        <Field type="text" className="form-control" id={`contacts.${contactIndex}.contactTlf`} name={`contacts.${contactIndex}.contactTlf`} required />
                                        <ErrorMessage name={`contacts.${contactIndex}.contactTlf`} component="div" className="text-danger" />
                                      </div>
                                      <div className="col-md-6">
                                        <label htmlFor={`contacts.${contactIndex}.contactEmail`}>Email address:</label>
                                        <Field type="text" className="form-control" id={`contacts.${contactIndex}.contactEmail`} name={`contacts.${contactIndex}.contactEmail`} />
                                        <ErrorMessage name={`contacts.${contactIndex}.contactEmail`} component="div" className="text-danger" />
                                      </div>
                                    </div>
                                    <div className="row ">
                                      <div>
                                        <label htmlFor={`contacts.${contactIndex}.contactAddress`}>{"Exact address (house nr, floor etc.):"}</label>
                                        <Field type="text" className="form-control" id={`contacts.${contactIndex}.contactAddress`} name={`contacts.${contactIndex}.contactAddress`} required />
                                        <ErrorMessage name={`contacts.${contactIndex}.contactAddress`} component="div" className="text-danger" />
                                      </div>
                                    </div>
                                    <h6 className='ms-3 mt-3'>Additional contact data</h6>
                                    <FieldArray name={`contacts.${contactIndex}.contactFields`}>
                                      {({ push, remove }) => (
                                        <div>
                                          {contact.contactFields.map((field: any, fieldIndex: any) => (
                                            <div className="row ms-1 me-3" key={fieldIndex}>
                                              <div className="form-group col-md-2">
                                                <label htmlFor={`contacts.${contactIndex}.contactFields.${fieldIndex}.label`}>Label:</label>
                                                <Field
                                                  as="select"
                                                  className="form-control"
                                                  id={`contacts.${contactIndex}.contactFields.${fieldIndex}.label`}
                                                  name={`contacts.${contactIndex}.contactFields.${fieldIndex}.label`}
                                                  required
                                                  onChange={(e: any) => {
                                                    const { value } = e.target;
                                                    if (value === 'Custom label...') {
                                                      const customLabel = prompt('Please enter your custom label:');
                                                      if (customLabel) {
                                                        setFieldValue(`contacts.${contactIndex}.contactFields.${fieldIndex}.label`, customLabel);
                                                      } else {
                                                        setFieldValue(`contacts.${contactIndex}.contactFields.${fieldIndex}.label`, '');
                                                      }
                                                    } else {
                                                      setFieldValue(`contacts.${contactIndex}.contactFields.${fieldIndex}.label`, value);
                                                    }
                                                  }}
                                                >
                                                  <option value="">Select</option>
                                                  <option value="Work tlf.">Work tlf.</option>
                                                  <option value="Home tlf.">Home tlf.</option>
                                                  <option value="Work email">Work email</option>
                                                  <option value="Privat email">Privat email</option>
                                                  <option value="Custom label...">Custom label...</option>
                                                </Field>
                                                <ErrorMessage name={`contacts.${contactIndex}.contactFields.${fieldIndex}.label`} component="div" className="text-danger" />
                                              </div>
                                              <div className="col-md-9">
                                                <label htmlFor={`contacts.${contactIndex}.contactFields.${fieldIndex}.data`}>Contact data:</label>
                                                <Field
                                                  type="text"
                                                  className="form-control"
                                                  id={`contacts.${contactIndex}.contactFields.${fieldIndex}.data`}
                                                  name={`contacts.${contactIndex}.contactFields.${fieldIndex}.data`}
                                                  required
                                                />
                                                <ErrorMessage name={`contacts.${contactIndex}.contactFields.${fieldIndex}.data`} component="div" className="text-danger" />
                                              </div>
                                              <div className='col-1'>
                                                <div className='row d-flex justify-content-end'>
                                                  <div className='col-auto mt-4'>
                                                    <button className="btn btn-danger btn-sm p-2" type="button" onClick={() => remove(fieldIndex)}>
                                                      <FaRegTrashAlt style={{fontSize: "1.3rem"}}/>
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                          <button
                                            className="btn btn-primary btn-sm ms-3 mt-2"
                                            type="button"
                                            onClick={() => push(initialContactFieldValues)}
                                          >
                                            Add contact data
                                          </button>
                                        </div>
                                      )}
                                    </FieldArray>
                                    <div className="row mt-3 mb-3">
                                      <div className="form-group col-md-12">
                                        <label htmlFor={`contacts.${contactIndex}.contactNotes`}>Contact notes:</label>
                                        <Field as="textarea" className="form-control" id={`contacts.${contactIndex}.contactNotes`} name={`contacts.${contactIndex}.contactNotes`} rows={2} />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                <button
                                  className="btn btn-primary btn ms-2 mt-2"
                                  type="button"
                                  onClick={() => push(initialContactValues)}
                                >
                                  Add contact person
                                </button>
                              </div>
                            : null
                          }
                        </>
                      )}
                    </FieldArray>
              </Form>
          </div>
      }    
      </>
    )
}

export default BasicInfoEdit
