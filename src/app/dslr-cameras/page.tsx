"use client";

import Link from "next/link";
import { FaCamera, FaInfoCircle, FaStar, FaCheckCircle, FaAmazon } from "react-icons/fa";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// DSLR Kameralar sayfası için meta veriler - Next.js'de metadata client component'lerde çalışmaz, bu nedenle kaldıralım
// export const metadata = {
//   title: "En İyi DSLR Kameralar | 2024 Satın Alma Rehberi",
//   description: "2024 yılının en iyi DSLR kameraları, özellikler, fiyat karşılaştırması ve profesyonel incelemeler.",
// };

// Örnek DSLR kamera verileri
const dslrCameras = [
  {
    id: 1,
    name: "Canon EOS 90D",
    image: "/images/cameras/canon-eos-90d.jpg", // Kamera görseli eklenmeli
    rating: 4.8,
    description: "Gelişmiş özellikleri ve etkileyici performansıyla profesyonel DSLR kamera deneyimi",
    price: "$1,199.00",
    key_features: [
      "32.5 MP APS-C CMOS sensör",
      "DIGIC 8 işlemci",
      "4K video kayıt",
      "Çift Piksel CMOS AF",
      "45-nokta çapraz tipi AF"
    ],
    pros: ["Yüksek çözünürlük", "Hızlı otofokus", "Ergonomik tasarım"],
    cons: ["Ağır gövde", "Batarya ömrü sınırlı"],
    amazon_link: "https://amazon.com/product-link"
  },
  {
    id: 2,
    name: "Nikon D780",
    image: "/images/cameras/nikon-d780.jpg", // Kamera görseli eklenmeli
    rating: 4.7,
    description: "Hem profesyoneller hem de yarı profesyoneller için üstün performans sunan gelişmiş DSLR",
    price: "$2,299.00",
    key_features: [
      "24.5 MP FX-format CMOS sensör",
      "EXPEED 6 işlemci",
      "4K UHD video",
      "273-nokta hibrit AF sistemi",
      "ISO 100-51,200"
    ],
    pros: ["Mükemmel düşük ışık performansı", "Hızlı otofokus", "Üstün bağlantı özellikleri"],
    cons: ["Yüksek fiyat", "Ağır ekipman"],
    amazon_link: "https://amazon.com/product-link"
  },
  {
    id: 3,
    name: "Pentax K-3 Mark III",
    image: "/images/cameras/pentax-k3.jpg", // Kamera görseli eklenmeli
    rating: 4.6,
    description: "Dayanıklı gövde ve gelişmiş sensör teknolojisiyle doğa fotoğrafçılığı için ideal",
    price: "$1,999.00",
    key_features: [
      "25.73 MP APS-C CMOS sensör",
      "PRIME V işlemci",
      "4K video kayıt",
      "101-nokta SAFOX 13 AF",
      "5.5 stop görüntü sabitleme"
    ],
    pros: ["Hava koşullarına dayanıklı", "Gelişmiş görüntü sabitleme", "Ergonomik kullanım"],
    cons: ["Canon ve Nikon&apos;a göre daha az lens seçeneği", "Batarya ömrü sınırlı"],
    amazon_link: "https://amazon.com/product-link"
  }
];

export default function DSLRCameras() {
  // Element referansları
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroButtonsRef = useRef(null);
  const introTitleRef = useRef(null);
  const introTextRef = useRef(null);
  const camerasWrapperRef = useRef(null);
  const cameraCardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const guideSectionsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaSectionRef = useRef(null);

  useEffect(() => {
    // ScrollTrigger eklentisini GSAP ile kaydet
    gsap.registerPlugin(ScrollTrigger);

    // Sayfa yükleme animasyonları
    const tl = gsap.timeline();

    // Hero bölümü animasyonları
    tl.from(heroTitleRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(heroSubtitleRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4")
    .from(heroButtonsRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.2");

    // Intro bölümü animasyonu
    gsap.from(introTitleRef.current, {
      scrollTrigger: {
        trigger: introTitleRef.current,
        start: "top 80%"
      },
      opacity: 0,
      y: 30,
      duration: 0.6
    });

    gsap.from(introTextRef.current, {
      scrollTrigger: {
        trigger: introTextRef.current,
        start: "top 80%"
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: 0.2
    });

    // Kamera kartları animasyonu
    gsap.from(camerasWrapperRef.current, {
      scrollTrigger: {
        trigger: camerasWrapperRef.current,
        start: "top 80%"
      },
      opacity: 0,
      y: 40,
      duration: 0.5
    });

    // Her kamera kartı için staggered animasyon
    cameraCardsRefs.current.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%"
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        delay: index * 0.15, // Her kart için artan gecikme
        ease: "power3.out"
      });
    });

    // Rehber bölümleri için staggered animasyon
    guideSectionsRefs.current.forEach((section, index) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%"
        },
        opacity: 0,
        x: index % 2 === 0 ? -40 : 40, // Alternatif yönlerden giriş
        duration: 0.7,
        delay: index * 0.1,
        ease: "power2.out"
      });
    });

    // CTA bölümü animasyonu
    gsap.from(ctaSectionRef.current, {
      scrollTrigger: {
        trigger: ctaSectionRef.current,
        start: "top 80%"
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out"
    });

    // Temizleme fonksiyonu
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        {/* Hero Image - Örnek bir DSLR kamera fotoğrafı eklenecek */}
        <div className="absolute inset-0 bg-black/70">
          <div className="w-full h-full bg-[url('/images/hero-dslr.jpg')] bg-cover bg-center opacity-70 mix-blend-overlay"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center md:items-start text-white">
          <h1 ref={heroTitleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center md:text-left">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              En İyi DSLR Kameralar
            </span>
          </h1>
          <h2 ref={heroSubtitleRef} className="text-xl md:text-2xl mb-6 text-gray-200 max-w-2xl text-center md:text-left">
            Profesyonel kalitede fotoğraflar çekmek için 2024 yılının en iyi DSLR kamera seçenekleri ve uzman tavsiyeleri
          </h2>
          <div ref={heroButtonsRef} className="flex gap-4 flex-col sm:flex-row items-center">
            <Link href="#top-cameras" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition duration-300 flex items-center gap-2">
              <FaCamera className="text-lg" /> En İyi Kameralar
            </Link>
            <Link href="#buying-guide" className="px-8 py-3 bg-transparent hover:bg-white/10 border border-white text-white rounded-full font-medium transition duration-300 flex items-center gap-2">
              <FaInfoCircle className="text-lg" /> Satın Alma Rehberi
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 ref={introTitleRef} className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">DSLR Kameralar: Profesyonel Fotoğrafçılığın Temeli</h2>
          <div ref={introTextRef}>
            <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
              DSLR (Digital Single-Lens Reflex) kameralar, değiştirilebilir lensleri, optik vizörleri ve gelişmiş sensörleriyle profesyonel fotoğrafçıların birincil tercihi olmaya devam ediyor. 
              Bu kameralar, üstün görüntü kalitesi, hızlı performans ve geniş lens ekosistemi ile hem profesyoneller hem de fotoğrafçılığa yeni başlayanlar için ideal seçenekler sunuyor.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Bu sayfada, 2024 yılının en çok tercih edilen ve en iyi performans sunan DSLR kameralarını bulabilir, 
              özelliklerini karşılaştırabilir ve bütçenize en uygun modeli seçebilirsiniz.
            </p>
          </div>
        </div>
      </section>

      {/* Top DSLR Cameras Section */}
      <section id="top-cameras" className="py-16 px-4 bg-white dark:bg-gray-800 rounded-t-[40px] shadow-lg">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">2024&apos;ün En İyi DSLR Kameraları</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Uzman incelemelerimiz ve kullanıcı deneyimlerine dayalı olarak seçilmiş, farklı ihtiyaçlara ve bütçelere uygun en iyi DSLR kameraları
          </p>

          {/* DSLR Camera Cards */}
          <div ref={camerasWrapperRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dslrCameras.map((camera, index) => (
              <div 
                key={camera.id} 
                ref={el => {
                  cameraCardsRefs.current[index] = el;
                }}
                className="bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-2"
              >
                {/* Camera Image Placeholder - Gerçek resimler eklenecek */}
                <div className="relative h-60 bg-gray-200 dark:bg-gray-600 overflow-hidden">
                  <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 py-1 px-3 rounded-full flex items-center gap-1 font-medium">
                    <FaStar /> {camera.rating}
                  </div>
                  {/* Kamera resmi eklenecek */}
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <FaCamera size={60} />
                  </div>
                </div>

                {/* Camera Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{camera.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{camera.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Temel Özellikler:</h4>
                    <ul className="space-y-2">
                      {camera.key_features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Artılar:</h4>
                      <ul className="space-y-1">
                        {camera.pros.map((pro, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-300">+ {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Eksiler:</h4>
                      <ul className="space-y-1">
                        {camera.cons.map((con, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-300">- {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-gray-800 dark:text-white">{camera.price}</div>
                    <a 
                      href={camera.amazon_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center gap-2 transition duration-300"
                    >
                      <FaAmazon /> Amazon&apos;da İncele
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buying Guide Section */}
      <section id="buying-guide" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">DSLR Kamera Satın Alma Rehberi</h2>
          
          <div className="space-y-8">
            {[
              {
                title: "Sensör Boyutu ve Çözünürlük",
                content: "DSLR kameralarda genellikle APS-C veya Full Frame sensörler bulunur. Full Frame sensörler daha büyük olduğu için düşük ışık performansı daha iyidir, ancak daha pahalıdır. Megapiksel sayısı, çektiğiniz fotoğrafların çözünürlüğünü belirler, ancak daha yüksek megapiksel her zaman daha iyi görüntü kalitesi anlamına gelmez."
              },
              {
                title: "Otofokus Sistemi",
                content: "İyi bir otofokus sistemi, özellikle hareketli konuları çekerken kritik öneme sahiptir. Daha fazla AF noktası ve çapraz tipte AF sensörleri, daha hızlı ve doğru odaklama sağlar. Günümüzün modern DSLR&apos;leri, canlı görüntü modunda çalışan gelişmiş hibrit AF sistemlerine de sahiptir."
              },
              {
                title: "Video Özellikleri",
                content: "Video çekimi de yapacaksanız, kameranın 4K gibi yüksek çözünürlüklü video kayıt yapabilmesi önemlidir. Ayrıca, harici mikrofon girişi, yavaş çekim özellikleri ve video odaklama performansı da göz önünde bulundurulmalıdır."
              },
              {
                title: "Lens Ekosistemi",
                content: "DSLR kameralar için mevcut lens seçenekleri, farklı markalar arasında değişiklik gösterir. Canon ve Nikon gibi büyük markaların daha geniş lens ekosistemleri vardır. Çekmek istediğiniz fotoğraf türüne göre uygun lenslerin mevcut olduğundan emin olun."
              }
            ].map((section, index) => (
              <div 
                key={index}
                ref={el => {
                  guideSectionsRefs.current[index] = el;
                }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{section.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section ref={ctaSectionRef} className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">En İyi Fotoğraf Deneyimi İçin Doğru DSLR Kamerayı Seçin!</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            İster portreler, ister manzaralar, ister hareketli konular için olsun, ihtiyaçlarınıza uygun bir DSLR kamera vardır.
            Yukarıdaki önerilerimizi inceleyin ve fotoğraf yolculuğunuzu bir üst seviyeye taşıyın.
          </p>
          <Link href="#top-cameras" className="px-8 py-4 bg-white text-blue-700 rounded-full font-medium text-lg hover:bg-blue-50 transition duration-300">
            Şimdi İncele
          </Link>
        </div>
      </section>
    </div>
  );
}
