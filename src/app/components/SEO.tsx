import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  keywords?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  category?: string;
  tags?: string[];
}

export default function SEO({
  title,
  description,
  canonical = 'https://bestcamerareview.com',
  ogImage = 'https://bestcamerareview.com/images/og-default.jpg',
  noindex = false,
  keywords,
  author = 'BestCameraReview',
  publishedTime,
  modifiedTime,
  category,
  tags,
}: SEOProps) {
  // Base title for the website
  const siteTitle = 'Best Camera Review';
  // Format the full title
  const fullTitle = `${title} | ${siteTitle}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Robots Meta */}
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow" />
      )}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteTitle} />
      {author && <meta property="article:author" content={author} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {category && <meta property="article:section" content={category} />}
      {tags && tags.map(tag => (
        <meta property="article:tag" content={tag} key={tag} />
      ))}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@bestcamerareview" />
      {author && <meta name="twitter:creator" content="@bestcamerareview" />}
      
      {/* Additional Meta Tags for SEO */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#0F4C81" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      
      {/* Language and Locale */}
      <meta property="og:locale" content="en_US" />
      <link rel="alternate" href={canonical} hrefLang="en" />
      <link rel="alternate" href={canonical} hrefLang="x-default" />
    </Head>
  );
} 