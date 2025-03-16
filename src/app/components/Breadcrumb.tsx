import Link from 'next/link';
import { FaHome, FaChevronRight } from 'react-icons/fa';

// Type definition for BreadcrumbItem
interface BreadcrumbItem {
  name: string;
  path: string;
  isCurrent?: boolean;
  description?: string; // Optional description for SEO
  image?: string; // Optional image URL for SEO
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  baseUrl?: string; // Optional base URL (default: https://bestcamerareview.com)
}

// Breadcrumb component helps users understand their location in the site
export default function Breadcrumb({ 
  items, 
  className = '',
  baseUrl = 'https://bestcamerareview.com'
}: BreadcrumbProps) {
  // Enhanced JSON-LD structured data for breadcrumb
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': `${baseUrl}${item.path}`,
        name: item.name,
        ...(item.description && { description: item.description }),
        ...(item.image && { image: item.image }),
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </script>
      <nav 
        aria-label="Breadcrumb" 
        className={`py-3 ${className}`}
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
      >
        <ol 
          className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400"
          role="list"
        >
          {items.map((item, index) => (
            <li 
              key={index} 
              className="flex items-center"
              itemProp="itemListElement" 
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {index === 0 ? (
                // Add home icon for homepage item
                <Link 
                  href={item.path} 
                  className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                  itemProp="item"
                  title={`Home: ${item.name}`}
                >
                  <FaHome className="mr-1 group-hover:scale-110 transition-transform" />
                  <span itemProp="name">{item.name}</span>
                  <meta itemProp="position" content={`${index + 1}`} />
                </Link>
              ) : (
                // For other items
                <>
                  <FaChevronRight 
                    className="mx-2 text-gray-400" 
                    aria-hidden="true"
                  />
                  {item.isCurrent ? (
                    // Show only text for current page
                    <span 
                      aria-current="page" 
                      className="font-medium text-blue-600 dark:text-blue-400"
                      itemProp="name"
                    >
                      {item.name}
                      <meta itemProp="position" content={`${index + 1}`} />
                    </span>
                  ) : (
                    // Show link for other pages
                    <Link 
                      href={item.path} 
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                      itemProp="item"
                      title={item.description || `Go to ${item.name}`}
                    >
                      <span itemProp="name" className="group-hover:underline">
                        {item.name}
                      </span>
                      <meta itemProp="position" content={`${index + 1}`} />
                    </Link>
                  )}
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
} 