import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo, updateUserAsync } from './userSlice';
import { useForm } from 'react-hook-form';

export default function UserProfile() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  console.log(user)
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1)
  const [showAddAddressForm, setShowAddAddressForm] = useState(false)
  //TODO: we will add payment section when we work on backend.

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  }

  const handleRemove = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] } //for shallow copy issue
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser))
  }
  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = user.addresses[index]
    setValue('name', address.name);
    setValue('email', address.email);
    setValue('phone', address.phone);
    setValue('street', address.street);
    setValue('city', address.city);
    setValue('state', address.state);
    setValue('pinCode', address.pinCode);
  }
  const handleAdd = (address) => {
    dispatch(updateUserAsync({ ...user, addresses: [...user.addresses, address] }));
    setShowAddAddressForm(false);
  }

  return (
    <div>
      <div>
        <div className='mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className="border-t flex justify-between border-gray-200 px-4 py-6 sm:px-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 my-5">Name: {user.name ? user.name : 'New user'}</h1>
              <h3 className="text-xl font-bold tracking-tight text-indigo-600 my-5">email address: {user.email} </h3>
              {user.role==='admin' && <h3 className="text-xl font-bold tracking-tight text-indigo-600 my-5">role: {user.role} </h3>}
            </div>
            <div>
              {
                !showAddAddressForm && <button
                  onClick={e => { setShowAddAddressForm(true); setSelectedEditIndex(-1) }}
                  type="submit"
                  className="rounded-md my-5 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Add New Address
                </button>
              }
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            {
              showAddAddressForm ? <form noValidate className='bg-white px-5 py-8 mt-12' onSubmit={handleSubmit((data) => {
                handleAdd(data)
                reset();
              })}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl font-semibold text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                          Full name
                        </label>
                        <div className="mt-2">
                          <input
                            id="name"
                            {...register("name", {
                              required: "name is required.",
                            })}

                            type="text"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                          {errors.name && <p className='text-red-500' >{errors?.name?.message}</p>}
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", {
                              required: "email is required.",
                              pattern: {
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi,
                                message: "email not valid"
                              }
                            })}

                            type="email"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                          {errors.email && <p className='text-red-500' >{errors?.email?.message}</p>}
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900">
                          Phone
                        </label>
                        <div className="mt-2 grid grid-cols-1">
                          <input
                            id="phone"
                            {...register("phone", {
                              required: "phone is required.",

                            })}

                            type="tel"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                          {errors.phone && <p className='text-red-500' >{errors?.phone?.message}</p>}
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label htmlFor="street" className="block text-sm/6 font-medium text-gray-900">
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            id="street"
                            {...register("street", {
                              required: "street is required."
                            })}

                            type="text"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                          {errors.street && <p className='text-red-500' >{errors?.street?.message}</p>}
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            id="city"
                            {...register("city", {
                              required: "city is required."
                            })}

                            type="text"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                          {errors.city && <p className='text-red-500' >{errors?.city?.message}</p>}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="state" className="block text-sm/6 font-medium text-gray-900">
                          State / Province
                        </label>
                        <div className="mt-2">
                          <input

                            id="state"
                            {...register("state", {
                              required: "state is required."
                            })}
                            type="text"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                          {errors.state && <p className='text-red-500' >{errors?.state?.message}</p>}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="pinCode" className="block text-sm/6 font-medium text-gray-900">
                          Pin Code / Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            id="pinCode"
                            {...register("pinCode", {
                              required: "pinCode is required."
                            })}

                            type="text"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                          {errors.pinCode && <p className='text-red-500' >{errors?.pinCode?.message}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      onClick={e => setShowAddAddressForm(false)}
                      type="button" className="text-sm/6 font-semibold text-gray-900">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>
                </div>
              </form> : null
            }
            <p className="mt-0.5 text-sm my-2 text-gray-500">Your Address:</p>
            {
              user.addresses.map((address, index) =>
                <div>
                  {
                    selectedEditIndex === index ? <form noValidate className='bg-white px-5 py-8 mt-12' onSubmit={handleSubmit((data) => {
                      handleEdit(data, index)
                      reset();
                    })}>
                      <div className="space-y-12">

                        <div className="border-b border-gray-900/10 pb-12">
                          <h2 className="text-2xl font-semibold text-gray-900">Personal Information</h2>
                          <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>

                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                Full name
                              </label>
                              <div className="mt-2">
                                <input
                                  id="name"
                                  {...register("name", {
                                    required: "name is required.",
                                  })}

                                  type="text"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.name && <p className='text-red-500' >{errors?.name?.message}</p>}
                              </div>
                            </div>

                            <div className="sm:col-span-4">
                              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                              </label>
                              <div className="mt-2">
                                <input
                                  id="email"
                                  {...register("email", {
                                    required: "email is required.",
                                    pattern: {
                                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi,
                                      message: "email not valid"
                                    }
                                  })}

                                  type="email"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.email && <p className='text-red-500' >{errors?.email?.message}</p>}
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900">
                                Phone
                              </label>
                              <div className="mt-2 grid grid-cols-1">
                                <input
                                  id="phone"
                                  {...register("phone", {
                                    required: "phone is required.",

                                  })}

                                  type="tel"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.phone && <p className='text-red-500' >{errors?.phone?.message}</p>}
                              </div>
                            </div>

                            <div className="col-span-full">
                              <label htmlFor="street" className="block text-sm/6 font-medium text-gray-900">
                                Street address
                              </label>
                              <div className="mt-2">
                                <input
                                  id="street"
                                  {...register("street", {
                                    required: "street is required."
                                  })}

                                  type="text"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.street && <p className='text-red-500' >{errors?.street?.message}</p>}
                              </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                              <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                                City
                              </label>
                              <div className="mt-2">
                                <input
                                  id="city"
                                  {...register("city", {
                                    required: "city is required."
                                  })}

                                  type="text"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.city && <p className='text-red-500' >{errors?.city?.message}</p>}
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label htmlFor="state" className="block text-sm/6 font-medium text-gray-900">
                                State / Province
                              </label>
                              <div className="mt-2">
                                <input

                                  id="state"
                                  {...register("state", {
                                    required: "state is required."
                                  })}
                                  type="text"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.state && <p className='text-red-500' >{errors?.state?.message}</p>}
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label htmlFor="pinCode" className="block text-sm/6 font-medium text-gray-900">
                                Pin Code / Postal code
                              </label>
                              <div className="mt-2">
                                <input
                                  id="pinCode"
                                  {...register("pinCode", {
                                    required: "pinCode is required."
                                  })}

                                  type="text"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.pinCode && <p className='text-red-500' >{errors?.pinCode?.message}</p>}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                          <button
                            onClick={e => setSelectedEditIndex(-1)}
                            type="button" className="text-sm/6 font-semibold text-gray-900">
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Edit Address
                          </button>
                        </div>
                      </div>
                    </form> : null
                  }
                  <div key={index} className="flex justify-between gap-x-6 my-4 py-5 px-5 border-2 border-gray-200">
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm/6 font-semibold text-gray-900">{address.name}</p>
                        <p className="mt-1 truncate text-xs/5 text-gray-500">{address.email}</p>
                        <p className="mt-1 truncate text-xs/5 text-gray-900">{address.phone}</p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="mt-1 text-sm/6 text-gray-900">{address.details}</p>
                      <p className="mt-1 text-xs/5 text-gray-500">{address.city}, {address.state}</p>
                      <p className="mt-1 text-xs/5 text-gray-500">{address.pin}</p>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="mt-1 text-sm/6 text-gray-900">{address.details}</p>
                      <button onClick={(e) => handleEditForm(index)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Edit
                      </button>
                      <button onClick={(e) => handleRemove(e, index)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
