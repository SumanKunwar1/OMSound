import { Helmet } from "react-helmet-async"
import type React from "react"

interface SEOHelmetProps {
  title?: string
  description?: string
  keywords?: string | string[]
  image?: string
  ogImage?: string
  type?: string
  structuredData?: object
  url?: string
  noindex?: boolean
  nofollow?: boolean
  noarchive?: boolean
  nosnippet?: boolean
  noimageindex?: boolean
  notranslate?: boolean
  maxSnippet?: number
  maxImagePreview?: "none" | "standard" | "large"
  maxVideoPreview?: number
  twitterCard?: string
  twitterSite?: string
  twitterCreator?: string
}

const SEOHelmet: React.FC<SEOHelmetProps> = ({
  title = "Trinity Waterproofing",
  description = "Premium waterproofing solutions for residential and commercial properties in Nepal",
  keywords = "",
  image = "",
  ogImage = "",
  type = "website",
  structuredData,
  url = "",
  noindex = false,
  nofollow = false,
  noarchive = false,
  nosnippet = false,
  noimageindex = false,
  notranslate = false,
  maxSnippet,
  maxImagePreview = "large",
  maxVideoPreview,
  twitterCard = "summary_large_image",
  twitterSite = "@trinitywaterproofing",
  twitterCreator,
}) => {
  const baseUrl = "https://www.trinitywaterproofing.com.np"
  const fullUrl = url && url !== "/" ? `${baseUrl}${url}` : baseUrl
  const imageToUse = ogImage || image
  const fullImageUrl = imageToUse
    ? imageToUse.startsWith("http")
      ? imageToUse
      : `${baseUrl}${imageToUse}`
    : "https://res.cloudinary.com/dihev9qxc/image/upload/v1767254272/logo_vfmrxy.png"

  // Handle keywords as array or string
  const keywordsString = Array.isArray(keywords) ? keywords.join(", ") : keywords || ""

  // Robots meta directives
  const robotsDirectives: string[] = []
  if (noindex) robotsDirectives.push("noindex")
  else robotsDirectives.push("index")

  if (nofollow) robotsDirectives.push("nofollow")
  else robotsDirectives.push("follow")

  if (noarchive) robotsDirectives.push("noarchive")
  if (nosnippet) robotsDirectives.push("nosnippet")
  if (noimageindex) robotsDirectives.push("noimageindex")
  if (notranslate) robotsDirectives.push("notranslate")

  if (maxSnippet !== undefined) robotsDirectives.push(`max-snippet:${maxSnippet}`)
  if (maxImagePreview) robotsDirectives.push(`max-image-preview:${maxImagePreview}`)
  if (maxVideoPreview !== undefined) robotsDirectives.push(`max-video-preview:${maxVideoPreview}`)

  const robotsContent = robotsDirectives.join(", ")

  // Default structured data for Trinity Waterproofing
  const defaultStructuredData = structuredData || {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Trinity Waterproofing",
    image: "https://res.cloudinary.com/dihev9qxc/image/upload/v1767254272/logo_vfmrxy.png",
    description: "Premium waterproofing solutions for residential and commercial properties in Nepal",
    url: baseUrl,
    telephone: "+977-1-XXXX-XXXX",
    email: "info@trinitywaterproofing.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati",
      postalCode: "44600",
      addressCountry: "NP",
    },
  }

  return (
    <Helmet>
      {/* Page Title - THIS OVERRIDES index.html title */}
      <title>{title}</title>
      <meta name="title" content={title} />

      {/* Meta Description */}
      <meta name="description" content={description} />

      {/* Keywords */}
      {keywordsString && <meta name="keywords" content={keywordsString} />}

      {/* Robots Meta Tags */}
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="bingbot" content={robotsContent} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content="Trinity Waterproofing" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}

      {/* Structured data */}
      <script type="application/ld+json">{JSON.stringify(defaultStructuredData)}</script>
    </Helmet>
  )
}

export default SEOHelmet