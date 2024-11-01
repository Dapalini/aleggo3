"use client"

import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import SubNav from '@/ui/common/SubNav';
import { IUser } from '@/types/userTypes';
import { userValidationSchema, initialUserValues } from '@/types/userTypes';
import { useUser } from '../../context';
import { useParams } from 'next/navigation';

const UserEdit = () => {
  const router = useRouter();

  const { userData } = useUser()

  const { id } = useParams()

  const handleSubmit = async (values: IUser) => {
    try {
 
      // Determine whether to create or update based on the existence of id
      const url = id && id !== "new" ? `/api/users/${id}` : '/api/users';
  
      const response = await fetch(url, {
        method: id && id !== "new" ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        // Handle non-OK response
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to save user data');
      }
      const data = await response.json();
  
      console.log("Data after trying", data)
      router.back(); // Navigate back to the previous route
    } catch (error: any) {
      console.error('Error creating or updating user:', error);
      alert(`Error: ${error.message}`); // Display alert with error message
    }
  }

  const handleDelete = async (id: any) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    
    if (!confirmed) {
      return; // User cancelled deletion
    }
  
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to delete user');
      }
  
      const data = await response.json();
      console.log('User deleted:', data);
  
      // Optionally show a success message
      alert('User deleted successfully');
  
      // Navigate to user table or any other appropriate route
      router.back(); // Navigate back to the previous route
    } catch (error: any) {
      console.error('Error deleting user:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const skillsAndDuties = [
    'Cleaning',
    'Vicevært',
    'Gardening',
    'Weeding',
    'Snow handling',
    'Window cleaning',
  ];

  return (
    <div>
      <Formik
        initialValues={id === "new" ? initialUserValues : userData}
        validationSchema={userValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ values, setFieldValue, isValid, dirty, resetForm }) => (
          <>
            <SubNav>
              <div className="row d-flex justify-content-center">
                <div className="col-10 row d-flex justify-content-between">
                    <div className='col-auto row'>
                      <h3 className='col-auto'>{`Edit user: ${values.name}`}</h3>
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
              <div className="container mt-4">
                <div className="row d-flex justify-content-beginning">
                  <div className="profile-image-container col-md-12 col-lg-auto">
                    <img src="/images/Big-profile.png" alt=":)" className="profile-image" />
                    <input
                      type="file"
                      id="profile-pic"
                      name="profile-pic"
                      style={{ display: 'none' }}
                      onChange={(event) => {
                        const file = event.currentTarget.files![0];
                        setFieldValue('profilePic', file);
                      }}
                    />
                    <label htmlFor="profile-pic"></label>
                    <button
                      className="btn btn-primary btn-sm profile-lower-right-button"
                      type="button"
                      onClick={() => document.getElementById('profile-pic')?.click()}
                    >
                      <img src="/icons/upload-medium-light.svg" alt="Upload" />
                    </button>
                  </div>
                  <div className="col-md-12 col-lg-10">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="name">Name:</label>
                          <Field type="text" id="name" name="name" className="form-control" />
                          <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="company">Company / Contracted:</label>
                          <Field type="text" id="company" name="company" className="form-control" />
                          <ErrorMessage name="company" component="div" className="text-danger" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="postTitle">Post Title:</label>
                          <Field type="text" id="postTitle" name="postTitle" className="form-control" />
                          <ErrorMessage name="postTitle" component="div" className="text-danger" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="role">Role:</label>
                          <Field as="select" id="role" name="role" className="form-control">
                            <option value="" selected>Select Role</option>
                            <option value="super_admin" disabled>Super admin</option>
                            <option value="economy" disabled>Economy</option>
                            <option value="admin">Admin</option>
                            <option value="operations">Operations</option>
                            <option value="worker">Worker</option>
                          </Field>
                          <ErrorMessage name="role" component="div" className="text-danger" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 col-lg-4">
                        <div className="form-group">
                          <label htmlFor="email">Email:</label>
                          <Field type="email" id="email" name="email" className="form-control" />
                          <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-8">
                        <div className="form-group">
                          <label htmlFor="homeAddress">Home Address:</label>
                          <Field id="homeAddress" name="homeAddress" className="form-control" />
                          <ErrorMessage name="homeAddress" component="div" className="text-danger" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="workTelephone">Work Telephone:</label>
                          <Field type="text" id="workTelephone" name="workTelephone" className="form-control" />
                          <ErrorMessage name="workTelephone" component="div" className="text-danger" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="privateTelephone">Private Telephone:</label>
                          <Field type="text" id="privateTelephone" name="privateTelephone" className="form-control" />
                          <ErrorMessage name="privateTelephone" component="div" className="text-danger" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="duties-skills">Duties and Skills:</label>
                        <FieldArray
                          name="dutiesSkills"
                          render={arrayHelpers => (
                            <div className="container border rounded p-2 d-flex justify-content-between">
                              <div>
                                {values.dutiesSkills.map((skill, index) => (
                                  <div key={index} className="label-container ms-2">
                                    <span>{skill}</span>
                                    <button
                                      type="button"
                                      className="delete-btn"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <img src="/icons/delete-x.svg" alt="Delete" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                              <div className="dropdown">
                                <button
                                  className="btn btn-primary dropdown-toggle"
                                  role="button"
                                  id="addSkillDropdown"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <img src="/icons/plus.svg" alt="Add Skill" />
                                </button>
                                <div className="dropdown-menu" aria-labelledby="addSkillDropdown">
                                  {skillsAndDuties.map((skill, index) => (
                                    <a
                                      key={index}
                                      className="dropdown-item"
                                      href="#"
                                      onClick={() => {
                                        // Check if skill is already in dutiesSkills array
                                        if (!values.dutiesSkills.includes(skill)) {
                                          arrayHelpers.push(skill);
                                        }
                                      }}
                                    >
                                      {skill}
                                    </a>
                                  ))}
                                  <div className="dropdown-divider"></div>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => {
                                      const customSkill = prompt('Enter custom skill:');
                                      if (customSkill) {
                                        // Check if customSkill is already in dutiesSkills array
                                        if (!values.dutiesSkills.includes(customSkill)) {
                                          arrayHelpers.push(customSkill);
                                        }
                                      }
                                    }}
                                  >
                                    Custom label ...
                                  </a>
                                </div>
                              </div>
                            </div>
                          )}
                        />
                        <label htmlFor="user-notes">Additional notes:</label>
                        <Field as="textarea" id="user-notes" name="userNotes" className="form-control" />
                        <ErrorMessage name="userNotes" component="div" className="text-danger" />
                      </div>
                    </div>
                  </div>
                    {/* Add more fields as needed */}
                  </div>
                </div>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  )
}

export default UserEdit