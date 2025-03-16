import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

interface RelatedContentProps {
  currentPath: string;
}

// Kamera kategorileri ve yolları
const cameraCategories = [
  { name: 'DSLR Cameras', path: '/dslr-cameras', description: 'Professional DSLR camera reviews and comparisons' },
  { name: 'Mirrorless Cameras', path: '/mirrorless-cameras', description: 'Latest mirrorless camera technology and reviews' },
  { name: 'Action Cameras', path: '/action-cameras', description: 'Best action cameras for adventures and sports' },
  { name: 'Vlog Cameras', path: '/vlog-cameras', description: 'Top cameras for vlogging and content creation' },
  { name: 'Compact Cameras', path: '/compact-cameras', description: 'Portable cameras for everyday photography' },
];

// İlgili içerik bileşeni, kullanıcılara diğer kamera kategorilerini gösterir
export default function RelatedContent({ currentPath }: RelatedContentProps) {
  // Mevcut kategori dışındaki diğer kategorileri filtrele
  const relatedCategories = cameraCategories.filter(category => 
    category.path !== currentPath
  );

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">
          Explore Other Camera Categories
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedCategories.map((category, index) => (
            <Link 
              href={category.path}
              key={index}
              className="group bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {category.description}
                  </p>
                </div>
                <FaArrowRight className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 