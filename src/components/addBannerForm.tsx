"use client";

import {
  useCreateBannerMutation,
  useGetBannersQuery,
} from "@/app/redux/feature/bannerSlice";
import { useRouter } from "next/navigation";

import React, { useState, FormEvent } from "react";
import { toast } from "sonner";

export default function AddBannerForm() {
  const { data, isLoading, error, refetch } = useGetBannersQuery();

  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [productId, setProductId] = useState("");
  const [image, setImageUrl] = useState("");
  const [createBanner] = useCreateBannerMutation();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newBanner = {
      title,
      category,
      price,
      productId,
      image,
    };
    // console.log(newBanner);
    // TODO: Add mutation or API call
    // await createBanner(newBanner).then((res) => {
    //   console.log(res.data);
    //   router.push("/");
    // });
    toast.promise(createBanner(newBanner), {
      loading: "Creating new banner...",
      success: () => {
        refetch();
        router.push("/");

        return <b>Banner Created Successfully!</b>;
      },
      error: (err) => err.message,
    });
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="shadow-xl p-6 bg-white rounded-md w-full max-w-xl">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">
          Add New Banner
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Banner Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Product Name (e.g., Ray-Ban Avia)"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Category</option>
                <option value="sunglasses">Sunglasses</option>
                <option value="eyeglasses">Eyeglasses</option>
                <option value="contacts">Contact Lenses</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter Price (e.g., ৳1200)"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Product ID
              </label>
              <input
                type="text"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="Enter Product ID (e.g., PROD12345)"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter Image URL (e.g., https://...)"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold py-2 px-4 rounded hover:opacity-90 transition"
          >
            Add Banner
          </button>
        </form>
      </div>
    </div>
  );
}
