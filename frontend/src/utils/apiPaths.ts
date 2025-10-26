
export const apiPaths = {
  products: {
    create: "/api/product",                         
    list: "/api/product",                           
    getById: (id: string) => `/api/product/${id}`, 
    update: (id: string) => `/api/product/${id}`,  
    delete: (id: string) => `/api/product/${id}`,   
    uploadImages: (id: string) => `/api/product/${id}/images`,
    deleteImage: (id: string) => `/api/product/${id}/images`, 
  },
};
