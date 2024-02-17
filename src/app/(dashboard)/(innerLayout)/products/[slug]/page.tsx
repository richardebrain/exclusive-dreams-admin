"use client";
import CustomInput from "@/components/forms/CustomInput";
import { UploadProductType, AddProductForm } from "@/utils/type";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomButton from "@/components/forms/CustomButton";
import Spinner from "@/components/Spinner";
import Select from "react-select";
import FileUploader from "@/components/forms/FileUploader";
import { fileExtensionTest, fileSizeTest } from "@/utils/yupTest";
import {
  addProductToStore,
  updateProductInStore,
  uploadImage,
} from "@/utils/firebase";
import { useEffect } from "react";
import { useSingleProduct } from "@/hooks/useSingleProduct";
import Image from "next/image";
import { routes } from "@/utils/routes";

const schema = yup.object().shape({
  productTitle: yup.string().required("Product Title is required"),
  price: yup
    .string()
    .required("Price is required")
    // also with decimal numbers
    .matches(/^\d+(\.\d{1,2})?$/, "Invalid Amount"),
  // filter out the commas
  color: yup
    .string()
    .required("Color is required")
    // filter out the commas
    .matches(/^[a-zA-Z\s]+$/, "Can't add multiple colors"),
  // quantity: yup
  //   .string()
  //   .required("Quantity is required")
  //   .matches(/^[0-9]+$/, "Must be only digits"),
  highlights: yup.string().required("Highlights is required"),
  category: yup.string().required("Category is required"),
  sizes: yup.string().when("category", {
    is: (val: string) => val === "headwears",
    then: (schema) => schema.notRequired(),
    otherwise: (schema) =>
      schema.required("Sizes are required for this category"),
  }),
  imageUrl: yup
    .mixed<FileList>()
    .nonNullable()
    .test("filesize", "File Size is too large", (value) => {
      if (!value) return true;
      return fileSizeTest(value as FileList, 3, false);
    })
    .test("fileFormat", "Unsupported Format", (value) => {
      if (!value) return true;
      return fileExtensionTest(
        value as FileList,
        ["jpg", "jpeg", "png"],
        false
      );
    })
    .defined("Product Image is required"),
  // .test("required", "Product Image is required", (value: any) => {
  //   if (!value || value === undefined || value.length <= 0) return false;
  //   return true;
  // })
  hasSize: yup.boolean().required(),
  isFinishedInStore: yup.boolean().required(),
});

const categories = [
  { value: routes["t-shirts"], label: "T-shirts" },
  { value: routes["headwears"], label: "Head Wears" },
  { value: routes["varsity-jackets"], label: "Varsity Jackets" },
  { value: routes["hoodies"], label: "Hoodies" },
  { value: routes["bottoms"], label: "Bottoms" },
  { value: routes["shirts"], label: "Shirts" },
];
export default function Page({ params }: { params: { slug: string } }) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
    control,
    setValue,
    reset,
  } = useForm<Omit<AddProductForm, "productId">>({
    resolver: yupResolver(schema),
    defaultValues: {
      hasSize: true,
    },
  });
  const { product, isLoading, isError } = useSingleProduct(params.slug);
  useEffect(() => {
    if (!isLoading && product) {
      reset(product);
    }
  }, [product, isLoading]);
  const handleProductUpdate = async (
    data: Omit<AddProductForm, "productId">
  ) => {
    const isImageUrl = data.imageUrl instanceof FileList;
    if (isImageUrl) {
      const arrOfImages = Array.from(data.imageUrl);
      const res = await Promise.all(
        arrOfImages.map(async (image) => {
          const url = await uploadImage(image);
          return url!;
        })
      );
      const uploadProduct = {
        ...data,
        imageUrl: res,
      };
      return await updateProductInStore(product?.productId!, uploadProduct);
    } else {
      return await updateProductInStore(product?.productId, data!);
    }
  };
  const watchCategory = watch("category");
  useEffect(() => {
    if (watchCategory === routes.headwears) {
      setValue("hasSize", false);
    } else {
      setValue("hasSize", true);
    }
  }, [watchCategory]);

  return (
    <section className="">
      <div className="">
        <div className="max-w-4xl md:px-12 mx-auto">
          <div className="mt-10">
            <h3 className="text-3xl font-bold mb-10">Edit Product</h3>
          </div>
          {isLoading && (
            <Spinner className="w-5 h-5 animate-spin fill-black mx-auto" />
          )}
          {!isLoading && product && (
            <form
              onSubmit={handleSubmit(handleProductUpdate)}
              className="flex flex-col space-y-4"
            >
              <div className=" flex flex-col gap-3 sm:flex-row w-full sm:gap-6">
                <CustomInput
                  type="text"
                  label="Product Title"
                  name="productTitle"
                  outerClassName="w-full"
                  placeholder="Enter product title e.g. Green T-Shirt with logo"
                  register={register}
                  errors={errors.productTitle?.message}
                />
                <CustomInput
                  type="text"
                  label="Product Price"
                  name="price"
                  register={register}
                  outerClassName="w-full"
                  placeholder="Enter price in USD e.g 100.00"
                  errors={errors.price?.message}
                />
              </div>
              <div className=" flex w-full gap-6">
                <CustomInput
                  type="text"
                  label="Product Color"
                  name="color"
                  register={register}
                  outerClassName="w-full"
                  placeholder="Enter product color e.g. red, blue, green"
                  errors={errors.color?.message}
                />
              </div>
              <CustomInput
                type="text"
                label="Product Highlights"
                name="highlights"
                register={register}
                outerClassName="w-full"
                placeholder="Enter product highlghts , if multiple separate by comma e.g. 100% cotton, washable"
                errors={errors.highlights?.message}
              />
              <div className="flex flex-col gap-3 sm:flex-row w-full sm:gap-6">
                <div className=" flex flex-col sm:w-2/4">
                  <div className="flex gap-px flex-col ">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 mb-2 text-gray-900"
                    >
                      Product Category
                    </label>
                    <Controller
                      render={({ field: { onChange, ref, value, name } }) => (
                        <Select
                          ref={ref}
                          id="category"
                          name={name}
                          value={categories.find((c) => c.value === value)}
                          onChange={(value) => onChange(value?.value)}
                          options={categories}
                          className="w-full"
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              border: `1px solid ${
                                errors.category?.message && "red"
                              }`,
                              boxShadow: "none",
                              ":hover": {
                                border: `2px solid ${
                                  errors.category?.message && "red"
                                }`,
                              },
                              outline: "0",
                              minHeight: "47px",
                            }),
                          }}
                        />
                      )}
                      name="category"
                      control={control}
                    />
                  </div>
                  {errors.category?.message && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.category?.message}
                    </p>
                  )}
                </div>
                {watchCategory !== routes.headwears && (
                  <CustomInput
                    type="text"
                    label="Product Sizes"
                    name="sizes"
                    register={register}
                    outerClassName="w-full"
                    placeholder="Enter product sizes , if multiple separate by comma e.g. S, M, L"
                    errors={errors.sizes?.message}
                  />
                )}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row w-full sm:gap-6 sm:items-center">
                <FileUploader
                  label="Product Images"
                  {...register("imageUrl")}
                  multiple
                  errors={errors?.imageUrl?.message!}
                />
                <div className="checkbox flex flex-col">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      {...register("isFinishedInStore")}
                    />
                    <span className="ml-2">Is Product Finished in Store ?</span>
                  </label>
                  {errors.isFinishedInStore && (
                    <p className="tetx-red-500 text-sm">
                      {errors.isFinishedInStore.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                {product?.imageUrl && (
                  <div className="flex gap-4">
                    {product?.imageUrl.map((url: string, i: number) => (
                      <Image
                        src={url}
                        alt="product image"
                        key={i}
                        className="w-24 h-24 object-cover"
                        width={100}
                        height={100}
                      />
                    ))}
                  </div>
                )}
              </div>
              <CustomButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Spinner className="w-5 h-5 animate-spin fill-white mx-auto" />
                ) : (
                  "Update Product"
                )}{" "}
              </CustomButton>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
