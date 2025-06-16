// src/app/redux/features/banner/bannerSlice.ts

import { baseApi } from "../base/baseApi";

interface Banner {
  _id: string;
  title: string;
  category: string;
  price: string;
  image: string;
  status: string;
  createdAt: string;
}

interface BannersResponse {
  data: Banner[];
}

// ✅ Inject endpoints AND export this object
export const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query<Banner[], void>({
      query: () => ({
        url: "/banners",
        method: "GET",
      }),
      // transformResponse: (res: BannersResponse) => res,
      providesTags: ["Banners"],
    }),
    createBanner: builder.mutation({
      query: (data) => ({
        url: "/banners",
        method: "POST",
        body: data,
      }),
    }),
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `banner/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// ✅ Export the generated hook from bannerApi (NOT baseApi)
export const { useGetBannersQuery, useCreateBannerMutation, useDeleteBannerMutation } = bannerApi;
