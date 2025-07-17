import { Helmet } from "react-helmet-async"
import type React from "react"

interface SEOHelmetProps {
  title: string
  description: string
  keywords?: string | string[]
  image?: string
  type?: string
  structuredData?: object
  url?: string
  noindex?: boolean
}

const SEOHelmet: React.FC<SEOHelmetProps> = ({
  title,
  description,
  keywords = "",
  image = "",
  type = "website",
  structuredData,
  url = "",
  noindex = false,
}) => {
  const fullUrl = url ? `https://omsounds.com${url}` : "https://omsounds.com"
  const fullImageUrl = image ? (image.startsWith("http") ? image : `https://omsounds.com${image}`) : ""

  // Handle keywords as array or string
  const keywordsString = Array.isArray(keywords) ? keywords.join(", ") : keywords

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywordsString && <meta name="keywords" content={keywordsString} />}
      {noindex && <meta name="robots" content="noindex" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {fullImageUrl && <meta property="og:image" content={fullImageUrl} />}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {fullImageUrl && <meta property="twitter:image" content={fullImageUrl} />}

      {/* Structured data */}
      {structuredData && <script type="application/ld+json">{JSON.stringify(structuredData)}</script>}
    </Helmet>
  )
}

export default SEOHelmet
