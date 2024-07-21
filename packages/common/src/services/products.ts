import Product from "core/entities/productEntities"

export const getAllProducts = async (url: string): Promise<Product[]> => {
  const response = await fetch(`${url}/product/all`)
  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }
  const responseData = await response.json()
  if (!responseData.body || !Array.isArray(responseData.body.data)) {
    throw new Error("Fetched data is not in the expected format")
  }
  return responseData.body.data
}

export const createProducts = async (url: string, newProduct: Omit<Product, "id">): Promise<void> => {
  fetch(`${URL}/product/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  })
}
