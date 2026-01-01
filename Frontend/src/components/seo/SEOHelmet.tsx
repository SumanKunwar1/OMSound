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
nofollow?: boolean
noarchive?: boolean
nosnippet?: boolean
noimageindex?: boolean
notranslate?: boolean
maxSnippet?: number
maxImagePreview?: 'none' | 'standard' | 'large'
maxVideoPreview?: number
twitterCard?: string
twitterSite?: string
twitterCreator?: string
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
nofollow = false,
noarchive = false,
nosnippet = false,
noimageindex = false,
notranslate = false,
maxSnippet,
maxImagePreview = 'large',
maxVideoPreview,
twitterCard = "summary_large_image",
twitterSite,
twitterCreator,
}) => {
const baseUrl = "https://omsounds.com"
const fullUrl = url ? `${baseUrl}${url}` : baseUrl
const fullImageUrl = image ? (image.startsWith("http") ? image : `${baseUrl}${image}`) : ""

// Handle keywords as array or string
const keywordsString = Array.isArray(keywords) ? keywords.join(", ") : keywords

// Robots meta directives
const robotsDirectives = [];
if (noindex) robotsDirectives.push('noindex');
else robotsDirectives.push('index'); // Explicitly allow indexing if noindex is false

if (nofollow) robotsDirectives.push('nofollow');
else robotsDirectives.push('follow'); // Explicitly allow following if nofollow is false

if (noarchive) robotsDirectives.push('noarchive');
if (nosnippet) robotsDirectives.push('nosnippet');
if (noimageindex) robotsDirectives.push('noimageindex');
if (notranslate) robotsDirectives.push('notranslate');

if (maxSnippet !== undefined) robotsDirectives.push(`max-snippet:${maxSnippet}`);
if (maxImagePreview) robotsDirectives.push(`max-image-preview:${maxImagePreview}`);
if (maxVideoPreview !== undefined) robotsDirectives.push(`max-video-preview:${maxVideoPreview}`);

const robotsContent = robotsDirectives.join(', ');

return (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
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
    {fullImageUrl && <meta property="og:image" content={fullImageUrl} />}

    {/* Twitter */}
    <meta property="twitter:card" content={twitterCard} />
    <meta property="twitter:url" content={fullUrl} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    {fullImageUrl && <meta property="twitter:image" content={fullImageUrl} />}
    {twitterSite && <meta property="twitter:site" content={twitterSite} />}
    {twitterCreator && <meta property="twitter:creator" content={twitterCreator} />}

    {/* Structured data */}
    {structuredData && <script type="application/ld+json">{JSON.stringify(structuredData)}</script>}
  </Helmet>
)
}

export default SEOHelmet
