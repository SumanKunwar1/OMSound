// Helper functions to handle different order status formats
export const normalizeOrderStatus = (status: string): string => {
  // Convert any status format to lowercase
  return status.toLowerCase()
}

export const isOrderDeliveredOrShipped = (status: string): boolean => {
  const normalizedStatus = normalizeOrderStatus(status)
  return (
    normalizedStatus === "delivered" ||
    normalizedStatus === "shipped" ||
    normalizedStatus === "shipping" ||
    normalizedStatus === "ready to ship"
  )
}

export const canShowPurchasedProducts = (status: string): boolean => {
  const normalizedStatus = normalizeOrderStatus(status)
  // Show products for delivered orders and orders that are shipped/shipping
  return normalizedStatus === "delivered" || normalizedStatus === "shipped" || normalizedStatus === "shipping"
}
