// Debug utility for development
export const debugAuth = {
  logToken: (token: string | null) => {
    if (import.meta.env.DEV) {
      console.log("🔑 Token status:", {
        hasToken: !!token,
        tokenLength: token?.length || 0,
        tokenPreview: token ? `${token.substring(0, 20)}...` : "No token",
      })
    }
  },

  logRequest: (method: string, url: string, headers: any) => {
    if (import.meta.env.DEV) {
      console.log(`🚀 ${method.toUpperCase()} ${url}`, {
        hasAuth: !!headers.Authorization,
        authPreview: headers.Authorization ? `${headers.Authorization.substring(0, 30)}...` : "No auth header",
      })
    }
  },

  logResponse: (status: number, data: any) => {
    if (import.meta.env.DEV) {
      console.log(`📥 Response ${status}:`, data)
    }
  },

  logError: (error: any) => {
    if (import.meta.env.DEV) {
      console.error("❌ Error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        code: error.response?.data?.code,
      })
    }
  },
}
