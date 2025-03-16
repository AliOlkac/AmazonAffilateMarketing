import Link from 'next/link';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import JsonLd from './JsonLd';

// BreadcrumbItem için geliştirilmiş tip tanımlaması
interface BreadcrumbItem {
  name: string;
  path: string;
  isCurrent?: boolean;
  description?: string; // SEO için opsiyonel açıklama
  image?: string; // SEO için opsiyonel görsel URL'si
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  baseUrl?: string; // Opsiyonel temel URL (varsayılan: https://bestcamerareview.com)
}

// Breadcrumb bileşeni, kullanıcıların site içinde nerede olduklarını göstermeye yarar
export default function Breadcrumb({ 
  items, 
  className = '',
  baseUrl = 'https://bestcamerareview.com'
}: BreadcrumbProps) {
  // Breadcrumb için geliştirilmiş JSON-LD yapılandırılmış veri
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
      <JsonLd data={breadcrumbJsonLd} />
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
                // Ana sayfa öğesi için ev ikonu ekle
                <Link 
                  href={item.path} 
                  className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                  itemProp="item"
                  title={`Ana Sayfa: ${item.name}`}
                >
                  <FaHome className="mr-1 group-hover:scale-110 transition-transform" />
                  <span itemProp="name">{item.name}</span>
                  <meta itemProp="position" content={`${index + 1}`} />
                </Link>
              ) : (
                // Diğer öğeler için
                <>
                  <FaChevronRight 
                    className="mx-2 text-gray-400" 
                    aria-hidden="true"
                  />
                  {item.isCurrent ? (
                    // Mevcut sayfa için sadece metin göster
                    <span 
                      aria-current="page" 
                      className="font-medium text-blue-600 dark:text-blue-400"
                      itemProp="name"
                    >
                      {item.name}
                      <meta itemProp="position" content={`${index + 1}`} />
                    </span>
                  ) : (
                    // Diğer sayfalar için bağlantı göster
                    <Link 
                      href={item.path} 
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                      itemProp="item"
                      title={item.description || `Sayfaya git: ${item.name}`}
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