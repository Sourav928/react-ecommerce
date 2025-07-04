import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedProduct, createProductAsync, fetchProductsByIdAsync, selectBrands, selectCategories, selectedProductById, updateProductAsync } from '../product/productSlice';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function ProductForm() {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm()
    const dispacth = useDispatch();
    const brands = useSelector(selectBrands);
    const categories = useSelector(selectCategories);
    const selectedProduct = useSelector(selectedProductById);
    console.log(selectedProduct)
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            dispacth(fetchProductsByIdAsync(params.id))
        } else {
            dispacth(clearSelectedProduct)
        }
    }, [dispacth, params.id]);

    useEffect(() => {
        if (selectedProduct && params.id) {
            setValue('title', selectedProduct.title);
            setValue('description', selectedProduct.description);
            setValue('brand', selectedProduct.brand);
            setValue('category', selectedProduct.category);
            setValue('price', selectedProduct.price);
            setValue('discountPercentage', selectedProduct.discountPercentage);
            setValue('stock', selectedProduct.stock);
            setValue('thumbnail', selectedProduct.thumbnail);
            setValue('image1', selectedProduct.images[0]);
            setValue('image2', selectedProduct.images[1]);
            setValue('image3', selectedProduct.images[2]);
        }
    }, [selectedProduct, params.id, setValue])

    const handleDelete = () => {
        const product = { ...selectedProduct };
        product.deleted = true;
        dispacth(updateProductAsync(product))
    }

    return (
        <>
            <form noValidate onSubmit={handleSubmit((data) => {
                // dispatch(createUserAsync({email:data.email,password:data.password,addresses:[],role:'user'}))
                // this role can be directly given on backend
                const product = { ...data };
                product.images = [product.image1, product.image2, product.image3];
                product.rating = 0;
                product.price = +product.price;
                product.discountPercentage = +product.discountPercentage;
                product.stock = +product.stock;
                delete product['image1']
                delete product['image2']
                delete product['image3']
                console.log(product);
                if (params.id) {
                    product.id = params.id;
                    product.rating = selectedProduct.rating || 0;
                    dispacth(updateProductAsync(product))
                    reset()
                } else {
                    dispacth(createProductAsync(product))
                    reset()
                    //TODO: on product successfully added clear fields and show message.
                }
            })}>
                <div className="space-y-12 bg-white p-4">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">Add Product Details</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">
                            This information will be displayed publicly so be careful what you share.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                                    Product Name
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <input
                                            id="title"
                                            {...register("title", {
                                                required: "title is required."
                                            })}
                                            type="text"
                                            className="block min-w-0 grow p-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        {...register("description", {
                                            required: "description is required."
                                        })}
                                        rows={3}
                                        placeholder='Write product description. '
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        defaultValue={''}
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="brand" className="block text-sm/6 font-medium text-gray-900">
                                    Brand
                                </label>
                                <div className="mt-2">
                                    <select {...register("brand", {
                                        required: "brand is required."
                                    })} >
                                        <option value="" >--chose-brand--</option>
                                        {brands.map((brand) => (<option value={brand.value}>{brand.label}</option>))}
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="category" className="block text-sm/6 font-medium text-gray-900">
                                    Category
                                </label>
                                <div className="mt-2">
                                    <select {...register("category", {
                                        required: "category is required."
                                    })}>
                                        <option value="" >--chose-category--</option>
                                        {categories.map((category) => (<option value={category.value}>{category.label}</option>))}
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">
                                    Price
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <input
                                            id="price"
                                            {...register("price", {
                                                required: "price is required.",
                                                min: 1,
                                                max: 10000
                                            })}
                                            type="number"
                                            className="block min-w-0 grow p-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="discountPercentage" className="block text-sm/6 font-medium text-gray-900">
                                    Discount
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <input
                                            id="discountPercentage"
                                            {...register("discountPercentage", {
                                                required: "Discount is required.",
                                                min: 0,
                                                max: 100
                                            })}
                                            type="number"
                                            className="block min-w-0 grow p-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="stock" className="block text-sm/6 font-medium text-gray-900">
                                    Stock
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <input
                                            id="stock"
                                            {...register("stock", {
                                                required: "stock is required.",
                                                min: 0,
                                            })}
                                            type="number"
                                            className="block min-w-0 grow p-2 text-base text-gray-900 placeholder:text-gray-400 border focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="thumbnail" className="block text-sm/6 font-medium text-gray-900">
                                    Thumbnail
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <input
                                            id="thumbnail"
                                            {...register("thumbnail", {
                                                required: "thumbnail is required.",
                                            })}
                                            type="text"
                                            className="block min-w-0 grow p-2 text-base text-gray-900 placeholder:text-gray-400 border focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="image1" className="block text-sm/6 font-medium text-gray-900">
                                    Image 1
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <input
                                            id="image1"
                                            {...register("image1", {
                                                required: "image1 is required.",
                                            })}
                                            type="text"
                                            className="block min-w-0 grow p-2 text-base text-gray-900 placeholder:text-gray-400 border focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="image2" className="block text-sm/6 font-medium text-gray-900">
                                    Image 2
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <input
                                            id="image2"
                                            {...register("image2", {
                                                required: "image2 is required.",
                                            })}
                                            type="text"
                                            className="block min-w-0 grow p-2 text-base text-gray-900 placeholder:text-gray-400 border focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="image3" className="block text-sm/6 font-medium text-gray-900">
                                    Image 3
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <input
                                            id="image3"
                                            {...register("image3", {
                                                required: "image3 is required.",
                                            })}
                                            type="text"
                                            className="block min-w-0 grow p-2 text-base text-gray-900 placeholder:text-gray-400 border focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm/6 font-semibold text-gray-900">
                        Cancel
                    </button>
                    {selectedProduct &&
                        <button
                            onClick={handleDelete}
                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            Delete
                        </button>
                    }
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </>
    );
}

export default ProductForm;