"use client";
import FileUploader from "@/components/forms/FileUploader";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { fileExtensionTest, fileSizeTest } from "@/utils/yupTest";
import CustomButton from "@/components/forms/CustomButton";
import Spinner from "@/components/Spinner";
import { addCarouselImages, getCarouselImages } from "@/utils/firebase";
import Image from "next/image";

interface Props {
  carousel: FileList;
}

const Schema = yup.object().shape({
  carousel: yup
    .mixed<FileList>()
    .test("fileSize", "File Size is too large", (value) => {
      return fileSizeTest(value as FileList, 3, true);
    })
    .test(
      "fileFormat",
      "Unsupported Format only jpeg,jpg and png are allowed",
      (value) => {
        return fileExtensionTest(
          value as FileList,
          ["jpg", "jpeg", "png"],
          true
        );
      }
    )
    .test(
      "required",
      "Carousel Image is required and must be at least 2",
      (value?) => {
        if (!value || value === undefined || value.length < 2) return false;
        return true;
      }
    )
    .defined(""),
});
type ImageData = {
  url: string;
};
const Page = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await getCarouselImages();
      if (res) {
        setIsLoading(false);
        setImageData(res);
      }
    })();
  }, []);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<Props>({
    resolver: yupResolver(Schema),
  });
  const [imageData, setImageData] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const handleImageUpload = async (data: Props) => {
    setIsUploading(true);
    try {
      const res = await addCarouselImages(data.carousel);
      if (res?.success) {
        setImageData(res?.urls);
        setIsUploading(false);
      }
    } catch (error) {
      console.log(error, "error uploading carousel images");
    }
  };
  return (
    <main className="flex flex-col gap-10 max-w-4xl mx-auto ">
      <h3 className="text-3xl font-bold">Upload Your Carousel Images Here</h3>
      <div>
        <form onSubmit={handleSubmit(handleImageUpload)}>
          <div className="flex flex-col max-md:space-y-3  md:flex-row md:justify-between items-center">
            <div className="w-full">
              <FileUploader
                {...register("carousel")}
                label="Upload Carousel Images"
                multiple
                errors={errors.carousel?.message!}
              />
              <p className="text-xs mt-2">
                Note: New Images overides the previous one
              </p>
            </div>
            <CustomButton
              type="submit"
              className="w-full"
              outerClassName="w-full md:w-1/3 self-end"
            >
              {isSubmitting ? (
                <Spinner className="mx-auto text-white fill-white stroke-2 animate-spin w-6 h-6" />
              ) : (
                "Upload"
              )}
            </CustomButton>
          </div>
        </form>
        <div>
          {isLoading && (
            <Spinner className="mx-auto text-black fill-black stroke-2 animate-spin w-6 h-6 mt-10" />
          )}
          {imageData.length > 0 && (
            <div className="flex flex-col gap-4 mt-10">
              <h3 className="text-2xl font-bold">Uploaded Images</h3>
              <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
                {imageData.map((img, idx) => (
                  <div key={idx} className="relative w-40 h-40">
                    <Image
                      src={img}
                      alt="carousel"
                      blurDataURL=""
                      placeholder="blur"
                      className="w-full h-full object-cover "
                      width={800}
                      fill
                      height={800}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;
