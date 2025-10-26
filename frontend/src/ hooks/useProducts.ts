import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { apiPaths } from "../utils/apiPaths";

export interface Product {
  _id?: string;
  title: string;
  category: string;
  quantity: number;
  price: number;
  description?: string;
  images?: string[];
  color?: string;
  size?: string;
  brand?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  // expose a simple uploading state for image uploads
  const [uploading, setUploading] = useState(false);

  async function fetchProducts(search?: string, category?: string) {
    setLoading(true);
    try {
      const res = await axiosInstance.get(apiPaths.products.list, {
        params: { search, category },
      });
      // expect res.data to be an array of products
      setProducts(res.data || []);
    } finally {
      setLoading(false);
    }
  }

  async function createProduct(data: Product) {
    const res = await axiosInstance.post(apiPaths.products.create, data);
    const created = res.data;
    // add directly to local list for immediate UI feedback
    setProducts((p) => [created, ...p]);
    return created;
  }

  async function updateProduct(id: string, data: Partial<Product>) {
    const res = await axiosInstance.put(apiPaths.products.update(id), data);
    const updated = res.data;
    // Update the product in the local list immediately
    setProducts((p) => p.map((product) => (product._id === id ? updated : product)));
    return updated;
  }

  async function deleteProduct(id: string) {
    await axiosInstance.delete(apiPaths.products.delete(id));
    // remove locally for immediate UI update
    setProducts((p) => p.filter((x) => x._id !== id));
  }

  async function uploadImages(id: string, files: { uri: string; name?: string; type?: string }[]) {
    if (!files || !files.length) return null;
    setUploading(true);
    try {
      const form = new FormData();
      files.forEach((f) => {
        // FormData in RN expects an object with uri, name and type
        form.append("images", {
          uri: f.uri,
          name: f.name || `photo-${Date.now()}.jpg`,
          // default to jpeg if not provided
          type: f.type || "image/jpeg",
        } as any);
      });

      // Use fetch for multipart upload to avoid axios Content-Type/boundary issues on React Native
      const base = axiosInstance.defaults.baseURL || "";
      const url = `${base}${apiPaths.products.uploadImages(id)}`;
      const resp = await fetch(url, {
        method: "POST",
        body: form,
      });

      if (!resp.ok) {
        let text = await resp.text().catch(() => "");
        throw new Error(`Upload failed: ${resp.status} ${resp.statusText} ${text}`);
      }

      const resJson = await resp.json();
      const updated = resJson?.product;
      if (updated) {
        // replace in local list
        setProducts((p) => p.map((it) => (it._id === updated._id ? updated : it)));
      }
      return resJson;
    } finally {
      setUploading(false);
    }
  }

  async function deleteImage(id: string, imageUrl: string) {
    setUploading(true);
    try {
      const res = await axiosInstance.delete(apiPaths.products.deleteImage(id), {
        data: { imageUrl },
      });
      const updated = res.data?.product;
      if (updated) {
        // Update the product in the local list
        setProducts((p) => p.map((it) => (it._id === updated._id ? updated : it)));
      }
      return updated;
    } finally {
      setUploading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, uploading, fetchProducts, createProduct, updateProduct, deleteProduct, uploadImages, deleteImage };
}
