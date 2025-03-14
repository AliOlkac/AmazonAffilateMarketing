import Link from 'next/link';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import JsonLd from './JsonLd';

// BreadcrumbItem tipi ile breadcrumb yapısının her bir öğesini tanımlıyoruz
interface BreadcrumbItem {
  name: string;
  path: string;
  isCurrent?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

// Breadcrumb bileşeni, kullanıcıların site içinde nerede olduklarını göstermeye yarar
export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  // Breadcrumb için JSON-LD yapılandırılmış veri
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': `https://bestcamerareview.com${item.path}`,
        name: item.name,
      },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <nav aria-label="Breadcrumb" className={`py-3 ${className}`}>
        <ol className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index === 0 ? (
                // Ana sayfa öğesi için ev ikonu ekle
                <Link 
                  href={item.path} 
                  className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <FaHome className="mr-1" />
                  <span>{item.name}</span>
                </Link>
              ) : (
                // Diğer öğeler için
                <>
                  <FaChevronRight className="mx-2 text-gray-400" />
                  {item.isCurrent ? (
                    // Mevcut sayfa için sadece metin göster
                    <span aria-current="page" className="font-medium text-blue-600 dark:text-blue-400">
                      {item.name}
                    </span>
                  ) : (
                    // Diğer sayfalar için bağlantı göster
                    <Link 
                      href={item.path} 
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {item.name}
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