import React from 'react';
import { Helmet } from 'react-helmet-async';

interface RobotsMetaProps {
  noindex?: boolean;
  nofollow?: boolean;
  noarchive?: boolean;
  nosnippet?: boolean;
  noimageindex?: boolean;
  notranslate?: boolean;
  maxSnippet?: number;
  maxImagePreview?: 'none' | 'standard' | 'large';
  maxVideoPreview?: number;
}

const RobotsMeta: React.FC<RobotsMetaProps> = ({
  noindex = false,
  nofollow = false,
  noarchive = false,
  nosnippet = false,
  noimageindex = false,
  notranslate = false,
  maxSnippet,
  maxImagePreview = 'large',
  maxVideoPreview
}) => {
  const robotsDirectives = [];
  
  if (noindex) robotsDirectives.push('noindex');
  else robotsDirectives.push('index');
  
  if (nofollow) robotsDirectives.push('nofollow');
  else robotsDirectives.push('follow');
  
  if (noarchive) robotsDirectives.push('noarchive');
  if (nosnippet) robotsDirectives.push('nosnippet');
  if (noimageindex) robotsDirectives.push('noimageindex');
  if (notranslate) robotsDirectives.push('notranslate');
  
  if (maxSnippet) robotsDirectives.push(`max-snippet:${maxSnippet}`);
  if (maxImagePreview) robotsDirectives.push(`max-image-preview:${maxImagePreview}`);
  if (maxVideoPreview) robotsDirectives.push(`max-video-preview:${maxVideoPreview}`);

  return (
    <Helmet>
      <meta name="robots" content={robotsDirectives.join(', ')} />
      <meta name="googlebot" content={robotsDirectives.join(', ')} />
      <meta name="bingbot" content={robotsDirectives.join(', ')} />
    </Helmet>
  );
};

export default RobotsMeta;