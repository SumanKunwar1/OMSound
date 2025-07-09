import fetch from "node-fetch"
import type { Response } from "node-fetch"

async function testServer(): Promise<void> {
  try {
    console.log("Testing server connection...")

    // Test basic server connection
    const response: Response = await fetch("http://localhost:5000/api/products", {
      method: "GET",
    })

    console.log("Server response status:", response.status)
    console.log("Server response headers:", Object.fromEntries(response.headers.entries()))

    if (response.ok) {
      const data = (await response.json()) as unknown[]
      console.log("Server is running! Products:", Array.isArray(data) ? data.length : 0)
    } else {
      const errorText: string = await response.text()
      console.error("Server error:", errorText)
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("Failed to connect to server:", errorMessage)
    console.log("Make sure your backend server is running on http://localhost:5000")
  }
}

testServer().catch((error: unknown) => {
  const errorMessage = error instanceof Error ? error.message : "Unknown error"
  console.error("Test failed:", errorMessage)
})
