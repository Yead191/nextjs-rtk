// src/app/banners/page.tsx
"use client";

import Link from "next/link";
import {
  useDeleteBannerMutation,
  useGetBannersQuery,
} from "./redux/feature/bannerSlice";
import { useState } from "react";
import { toast } from "sonner";

interface Banner {
  _id: string;
  title: string;
  category: string;
  price: string;
  image: string;
  status: string;
  createdAt: string;
}

export default function BannersPage() {
  const { data, isLoading, error, refetch } = useGetBannersQuery();
  const [deleteBanner] = useDeleteBannerMutation();
  if (isLoading) return <div>Loading banners...</div>;
  if (error) return <div>Error: {error.toString()}</div>;
  console.log(data);

  // handle delete
  const handleDeleteBanner = (id: any) => {
    toast("Are you sure you want to delete this banner?", {
      duration: 3000,
      action: {
        label: "Delete",
        onClick: () => {
          toast.promise(deleteBanner(id), {
            loading: "Deleting Banner...",
            success: () => {
              refetch();
              return <b>Banner Deleted Successfully!</b>;
            },
            error: (err) => err.message,
          });
        },
      },
      cancel: {
        label: "Cancel",
      },
    });
  };
  return (
    <div style={{ padding: "20px" }}>
      <div className="flex justify-between items-center  mb-12">
        <h1>Banners: {data?.length}</h1>
        <Link href={"/add-banner"}>
          <button className="py-2 px-5 rounded-xl text-white bg-blue-600">
            Add New Banner
          </button>
        </Link>
      </div>

      <ul
        className="flex items-center gap-6"
        style={{ listStyle: "none", padding: 0 }}
      >
        {data?.map((banner: Banner) => (
          <li key={banner._id} style={{ marginBottom: "20px" }}>
            <img
              src={banner.image}
              alt={banner.title}
              style={{ maxWidth: "200px" }}
            />
            <h2>{banner.title}</h2>
            <p>Category: {banner.category}</p>
            <p>Price: ${banner.price}</p>
            <p>Status: {banner.status}</p>
            <p>Created: {banner.createdAt}</p>

            <button
              onClick={() => handleDeleteBanner(banner._id)}
              className="py-2 px-4 text-white bg-red-500 mt-1 rounded-lg"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
