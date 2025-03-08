'use client';

import Link from "next/link";
import { FaCamera, FaInfoCircle, FaCheckCircle, FaSearch, FaMoneyBillWave, FaQuestionCircle } from "react-icons/fa";
import { MdCompare, MdPhotoCamera, MdCameraAlt, MdVideocam, MdSettings } from "react-icons/md";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Adım 1: Kamera Türlerini Anlama - İçerik Verileri
const cameraTypes = [
  {
    id: "dslr",
    name: "DSLR Kameralar",
    image: "/images/cameras/hero-bg.webp",
    description: "DSLR (Digital Single-Lens Reflex) kameralar, optik vizör ve ayna mekanizması kullanarak gerçek zamanlı görüntüleme sağlayan profesyonel kameralardır.",
    pros: [
      "Üstün görüntü kalitesi",
      "Geniş lens ekosistemi",
      "Uzun pil ömrü",
      "Dayanıklı gövde yapısı",
      "Optik vizör avantajı"
    ],
    cons: [
      "Büyük ve ağır gövde",
      "Karmaşık menü sistemi",
      "Aynasız kameralara göre daha az video özellikleri",
      "Daha yavaş otomatik odaklama (canlı görüntü modunda)"
    ],
    idealFor: "Profesyonel fotoğrafçılık, spor, vahşi yaşam ve portre fotoğrafçılığı",
    link: "/dslr-cameras"
  },
  {
    id: "mirrorless",
    name: "Aynasız Kameralar",
    image: "/images/cameras/hero-bg.webp",
    description: "Aynasız kameralar, DSLR'lara benzer görüntü kalitesi sunarken daha kompakt yapıda olan ve elektronik vizör kullanan modern kameralardır.",
    pros: [
      "Kompakt ve hafif gövde",
      "Üstün video özellikleri",
      "Sessiz çekim imkanı",
      "Gelişmiş otomatik odaklama",
      "WYSIWYG (Ne görüyorsan onu alırsın) elektronik vizör"
    ],
    cons: [
      "Daha kısa pil ömrü",
      "Daha sınırlı lens seçeneği (gelişmekte)",
      "Bazı modellerde aşırı ısınma sorunları",
      "Profesyonel modeller için yüksek fiyat"
    ],
    idealFor: "Seyahat fotoğrafçılığı, video içerik üretimi, sokak fotoğrafçılığı",
    link: "/mirrorless-cameras"
  },
  {
    id: "compact",
    name: "Kompakt Kameralar",
    image: "/images/cameras/hero-bg.webp",
    description: "Kompakt kameralar, cep boyu boyutlarında, sabit lensli ve kolay kullanımlı kameralardır.",
    pros: [
      "Ultra taşınabilir boyut",
      "Kullanım kolaylığı",
      "Akıllı telefonlardan daha iyi görüntü kalitesi",
      "Zoom özelliği",
      "Otomatik modlarda iyi performans"
    ],
    cons: [
      "Sınırlı manuel kontrol",
      "Lens değiştirilemez",
      "Düşük ışık performansı sınırlı",
      "Küçük sensör boyutu"
    ],
    idealFor: "Günlük kullanım, seyahat, aile etkinlikleri, başlangıç seviyesi fotoğrafçılık",
    link: "/compact-cameras"
  },
  {
    id: "action",
    name: "Aksiyon Kameraları",
    image: "/images/cameras/hero-bg.webp",
    description: "Aksiyon kameraları, zorlu koşullarda kullanım için tasarlanmış, ultra dayanıklı ve kompakt video kameralarıdır.",
    pros: [
      "Çok dayanıklı yapı",
      "Su geçirmez özellik",
      "Geniş açılı lens",
      "Stabilizasyon teknolojisi",
      "Kompakt boyut"
    ],
    cons: [
      "Sınırlı düşük ışık performansı",
      "Kısa pil ömrü",
      "Düşük ses kalitesi",
      "Sınırlı zoom yeteneği"
    ],
    idealFor: "Macera sporları, sualtı çekimleri, POV (bakış açısı) videolar, ekstrem koşullar",
    link: "/action-cameras"
  },
  {
    id: "vlog",
    name: "Vlog Kameraları",
    image: "/images/cameras/hero-bg.webp",
    description: "Vlog kameraları, içerik üreticileri için tasarlanmış, kendini çekme özellikleri gelişmiş kameralardır.",
    pros: [
      "Döner ekran",
      "Gelişmiş otofokus",
      "İyi mikrofon kalitesi",
      "Kompakt boyut",
      "Sosyal medya bağlantı özellikleri"
    ],
    cons: [
      "Genellikle sabit lens",
      "DSLR/aynasıza göre daha küçük sensör",
      "Sınırlı manuel kontrol",
      "Bazı modellerde aşırı ısınma"
    ],
    idealFor: "YouTube içerik üreticileri, sosyal medya influencerları, video bloggerlar",
    link: "/vlog-cameras"
  }
];

// Satın alma faktörleri ve diğer veriler sonraki adımlarda eklenecek

export default function BuyingGuide() {
  // Animasyon referansları
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroButtonsRef = useRef(null);
  const introTitleRef = useRef(null);
  const introTextRef = useRef(null);
  const camerasWrapperRef = useRef(null);
  const cameraCardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const factorsSectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaSectionRef = useRef(null);
  const faqRef = useRef(null);
  const tableRef = useRef(null);
  const parallaxBgRef = useRef(null);

  useEffect(() => {
    // ScrollTrigger plugin'ini GSAP ile kaydet
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
    
    // Hero arka plan parallax efekti
    if (parallaxBgRef.current) {
      gsap.to(parallaxBgRef.current, {
        scrollTrigger: {
          trigger: parallaxBgRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        y: 150,
        scale: 1.1,
        ease: "none"
      });
    }

    // Giriş bölümü animasyonu
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

    // Temizleme fonksiyonu
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-16">
      {/* Hero Bölümü */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden flex items-center justify-center">
        {/* Arka plan ve Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-700/80 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/images/cameras/hero-bg.webp)` }}
          ref={parallaxBgRef}
        ></div>
        
        {/* Hero İçeriği */}
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 ref={heroTitleRef} className="text-4xl md:text-6xl font-bold text-white mb-6">Kamera Satın Alma Rehberi</h1>
          <p ref={heroSubtitleRef} className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Fotoğrafçılık seviyenize ve ihtiyaçlarınıza uygun en iyi kamerayı seçmek için kapsamlı rehberimiz
          </p>
          
          {/* Hero Butonları */}
          <div ref={heroButtonsRef} className="flex flex-wrap gap-4 justify-center">
            <a href="#camera-types" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2">
              <FaCamera /> Kamera Türlerini Keşfet
            </a>
            <a href="#buying-factors" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-all flex items-center gap-2">
              <FaInfoCircle /> Satın Alma Faktörleri
            </a>
          </div>
        </div>
      </section>

      {/* Giriş Bölümü */}
      <section className="py-16 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 ref={introTitleRef} className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Doğru Kamera Seçimi İçin Kapsamlı Rehber</h2>
          <div ref={introTextRef} className="space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Doğru kamera seçimi, hem bütçenize hem de fotoğrafçılık veya video çekim ihtiyaçlarınıza uygun olmalıdır. Piyasada çok çeşitli kamera seçenekleri bulunduğundan, hangi kamera türünün sizin için en uygun olduğunu belirlemek karmaşık bir süreç olabilir.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Bu rehberde, farklı kamera türlerinin özelliklerini, avantaj ve dezavantajlarını inceleyerek doğru seçimi yapmanıza yardımcı olacağız. Ayrıca, satın alma sırasında dikkat edilmesi gereken faktörleri ve bütçenize uygun en iyi seçenekleri de değerlendireceğiz.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Bu rehberin sonunda, ihtiyaçlarınıza en uygun kamera türünü belirlemiş olacak ve satın alma sürecinizde bilinçli bir karar verebileceksiniz.
            </p>
          </div>
        </div>
      </section>

      {/* İçindekiler Bölümü */}
      <section id="table-of-contents" className="py-12 px-4 bg-gray-100 dark:bg-gray-800 rounded-3xl mx-4 md:mx-8 lg:mx-16 mb-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white text-center">Bu Rehberde Neler Var?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="#camera-types" className="flex gap-4 items-center p-4 bg-white dark:bg-gray-700 rounded-xl hover:shadow-lg transition-all group">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 flex-shrink-0 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-all">
                <MdCameraAlt className="text-blue-500 dark:text-blue-300 text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white text-lg">Kamera Türleri</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">DSLR, aynasız, kompakt ve diğer kamera türlerinin karşılaştırması</p>
              </div>
            </a>
            
            <a href="#buying-factors" className="flex gap-4 items-center p-4 bg-white dark:bg-gray-700 rounded-xl hover:shadow-lg transition-all group">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 flex-shrink-0 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-all">
                <MdSettings className="text-blue-500 dark:text-blue-300 text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white text-lg">Satın Alma Faktörleri</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Kamera seçerken dikkat edilmesi gereken teknik özellikler</p>
              </div>
            </a>
            
            <a href="#comparison" className="flex gap-4 items-center p-4 bg-white dark:bg-gray-700 rounded-xl hover:shadow-lg transition-all group">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 flex-shrink-0 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-all">
                <MdCompare className="text-blue-500 dark:text-blue-300 text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white text-lg">Karşılaştırma Tablosu</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Farklı kamera türlerini yan yana karşılaştırın</p>
              </div>
            </a>
            
            <a href="#decision-guide" className="flex gap-4 items-center p-4 bg-white dark:bg-gray-700 rounded-xl hover:shadow-lg transition-all group">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 flex-shrink-0 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-all">
                <FaSearch className="text-blue-500 dark:text-blue-300 text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white text-lg">Karar Rehberi</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">İhtiyaçlarınıza göre en uygun kamerayı bulun</p>
              </div>
            </a>
            
            <a href="#faq" className="flex gap-4 items-center p-4 bg-white dark:bg-gray-700 rounded-xl hover:shadow-lg transition-all group">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 flex-shrink-0 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-all">
                <FaQuestionCircle className="text-blue-500 dark:text-blue-300 text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white text-lg">Sık Sorulan Sorular</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Kamera alımı ile ilgili en çok sorulan sorular</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Adım 2: Kamera Türleri Bölümü */}
      <section id="camera-types" className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white text-center">Kamera Türleri</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Farklı türdeki kameraların özelliklerini, avantaj ve dezavantajlarını anlayarak ihtiyaçlarınıza en uygun kamerayı seçin
          </p>
          
          <div className="space-y-16" ref={camerasWrapperRef}>
            {cameraTypes.map((camera, index) => (
              <div 
                key={camera.id}
                ref={(el) => {
                  if (cameraCardsRefs.current) {
                    cameraCardsRefs.current[index] = el;
                  }
                }}
                className="flex flex-col md:flex-row gap-8 bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg p-6"
              >
                <div className="md:w-1/3 relative aspect-video md:aspect-square overflow-hidden rounded-xl">
                  <Image 
                    src={camera.image}
                    alt={`${camera.name} örneği`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {camera.id.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{camera.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{camera.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" /> Avantajlar
                      </h4>
                      <ul className="space-y-2">
                        {camera.pros.map((pro, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white flex items-center gap-2">
                        <span className="text-red-500 font-bold">✕</span> Dezavantajlar
                      </h4>
                      <ul className="space-y-2">
                        {camera.cons.map((con, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                            <span className="text-red-500 mt-1">✕</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">İdeal Kullanım Alanları:</h4>
                    <p className="text-gray-700 dark:text-gray-300">{camera.idealFor}</p>
                  </div>
                  
                  <Link 
                    href={camera.link}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
                  >
                    <FaCamera /> {camera.name}ı İncele
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Satın Alma Faktörleri Bölümü */}
      <section id="buying-factors" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white text-center">Kamera Seçerken Dikkat Edilmesi Gereken Faktörler</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Doğru kamera seçimi yaparken göz önünde bulundurmanız gereken önemli teknik özellikler ve faktörler
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Sensör Boyutu ve Çözünürlük",
                content: "Sensör boyutu (Full-Frame, APS-C, Micro 4/3 vb.) görüntü kalitesini, alan derinliğini ve düşük ışık performansını etkiler. Çözünürlük (megapiksel) ise detay seviyesini belirler ancak daha yüksek her zaman daha iyi anlamına gelmez.",
                icon: <MdPhotoCamera className="text-2xl" />
              },
              {
                title: "Lens Ekosistemi",
                content: "Kamera gövdesi için mevcut lens çeşitliliği önemlidir. Farklı çekim türleri için geniş bir lens seçeneği olması fotoğrafçılık deneyiminizi geliştirir. İleriye dönük lens yatırımlarınızı da düşünün.",
                icon: <MdCameraAlt className="text-2xl" />
              },
              {
                title: "Otomatik Odaklama Performansı",
                content: "Hızlı ve doğru otomatik odaklama sistemi, özellikle hareketli konuları çekerken kritik öneme sahiptir. Göz takibi, yüz tanıma ve konu takibi gibi özellikler de önemli avantajlar sağlar.",
                icon: <MdSettings className="text-2xl" />
              },
              {
                title: "Video Özellikleri",
                content: "Video çekmeyi planlıyorsanız, kameranın sunduğu çözünürlük (4K, 1080p), kare hızı, codec ve bit hızı önemlidir. Ayrıca mikrofon girişi ve HDMI çıkışı gibi özellikler de video iş akışınızı kolaylaştırır.",
                icon: <MdVideocam className="text-2xl" />
              },
              {
                title: "Görüntü Stabilizasyonu",
                content: "Gövde içi (IBIS) veya lens içi stabilizasyon, düşük enstantanede çekim yaparken veya video çekerken titremeyi azaltarak daha net sonuçlar almanızı sağlar.",
                icon: <MdSettings className="text-2xl" />
              },
              {
                title: "Pil Ömrü ve Ergonomi",
                content: "Uzun çekim günleri için iyi bir pil ömrü önemlidir. Ayrıca kameranın tutuş ergonomisi, kontrollerin yerleşimi ve genel kullanım kolaylığı da uzun vadede çok önemli faktörlerdir.",
                icon: <FaCheckCircle className="text-2xl" />
              },
              {
                title: "Bağlantı Özellikleri",
                content: "Wi-Fi, Bluetooth ve NFC gibi bağlantı özellikleri, fotoğrafların mobil cihazlara aktarılmasını ve uzaktan kumanda imkanı sağlar. Bu özellikler sosyal medya paylaşımları için önemlidir.",
                icon: <MdCompare className="text-2xl" />
              },
              {
                title: "Bütçe ve Değer",
                content: "En pahalı kamera her zaman sizin için en iyi seçenek olmayabilir. İhtiyaçlarınıza ve kullanım amacınıza en uygun özellikleri sunan, paranızın karşılığını veren bir kamera seçmek önemlidir.",
                icon: <FaMoneyBillWave className="text-2xl" />
              }
            ].map((factor, index) => (
              <div 
                key={index}
                ref={(el) => {
                  if (factorsSectionRefs.current) {
                    factorsSectionRefs.current[index] = el;
                  }
                }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 flex-shrink-0">
                    <span className="text-blue-600 dark:text-blue-300">
                      {factor.icon}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{factor.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{factor.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Adım 3: Karşılaştırma Tablosu */}
      <section id="comparison" className="py-16 px-4 bg-white dark:bg-gray-800" ref={tableRef}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white text-center">Kamera Türleri Karşılaştırması</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Farklı kamera türlerini yan yana karşılaştırarak ihtiyaçlarınızı karşılayan en iyi seçeneği belirleyin
          </p>

          <div className="overflow-x-auto pb-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-50 dark:bg-blue-900/30">
                  <th className="p-4 border-b-2 border-blue-200 dark:border-blue-800 text-left">Özellik</th>
                  <th className="p-4 border-b-2 border-blue-200 dark:border-blue-800 text-left">DSLR</th>
                  <th className="p-4 border-b-2 border-blue-200 dark:border-blue-800 text-left">Aynasız</th>
                  <th className="p-4 border-b-2 border-blue-200 dark:border-blue-800 text-left">Kompakt</th>
                  <th className="p-4 border-b-2 border-blue-200 dark:border-blue-800 text-left">Aksiyon</th>
                  <th className="p-4 border-b-2 border-blue-200 dark:border-blue-800 text-left">Vlog</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 font-medium">Boyut ve Ağırlık</td>
                  <td className="p-4">Büyük ve Ağır</td>
                  <td className="p-4">Orta</td>
                  <td className="p-4">Küçük ve Hafif</td>
                  <td className="p-4">Çok Küçük</td>
                  <td className="p-4">Küçük-Orta</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <td className="p-4 font-medium">Görüntü Kalitesi</td>
                  <td className="p-4">Mükemmel</td>
                  <td className="p-4">Mükemmel</td>
                  <td className="p-4">İyi</td>
                  <td className="p-4">Orta</td>
                  <td className="p-4">İyi-Çok İyi</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 font-medium">Lens Değiştirme</td>
                  <td className="p-4">Evet</td>
                  <td className="p-4">Evet</td>
                  <td className="p-4">Hayır</td>
                  <td className="p-4">Sınırlı</td>
                  <td className="p-4">Model Bağımlı</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <td className="p-4 font-medium">Otomatik Odaklama</td>
                  <td className="p-4">İyi-Çok İyi</td>
                  <td className="p-4">Mükemmel</td>
                  <td className="p-4">İyi</td>
                  <td className="p-4">Temel</td>
                  <td className="p-4">Çok İyi</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 font-medium">Video Yetenekleri</td>
                  <td className="p-4">İyi</td>
                  <td className="p-4">Mükemmel</td>
                  <td className="p-4">İyi</td>
                  <td className="p-4">Çok İyi</td>
                  <td className="p-4">Mükemmel</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <td className="p-4 font-medium">Pil Ömrü</td>
                  <td className="p-4">Mükemmel</td>
                  <td className="p-4">İyi</td>
                  <td className="p-4">İyi</td>
                  <td className="p-4">Zayıf</td>
                  <td className="p-4">Orta</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 font-medium">Dayanıklılık</td>
                  <td className="p-4">Çok İyi</td>
                  <td className="p-4">İyi-Çok İyi</td>
                  <td className="p-4">Orta</td>
                  <td className="p-4">Mükemmel</td>
                  <td className="p-4">İyi</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <td className="p-4 font-medium">Fiyat Aralığı</td>
                  <td className="p-4">Orta-Yüksek</td>
                  <td className="p-4">Orta-Çok Yüksek</td>
                  <td className="p-4">Düşük-Orta</td>
                  <td className="p-4">Düşük-Orta</td>
                  <td className="p-4">Orta</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 font-medium">Öğrenme Eğrisi</td>
                  <td className="p-4">Dik</td>
                  <td className="p-4">Orta-Dik</td>
                  <td className="p-4">Düşük</td>
                  <td className="p-4">Düşük</td>
                  <td className="p-4">Düşük-Orta</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="p-4 font-medium">İdeal Kullanıcı</td>
                  <td className="p-4">Profesyoneller, Ciddi Amatörler</td>
                  <td className="p-4">Profesyoneller, İçerik Üreticileri</td>
                  <td className="p-4">Seyahat Edenler, Günlük Kullanıcılar</td>
                  <td className="p-4">Macera Severler, Sporcular</td>
                  <td className="p-4">İçerik Üreticileri, Vloggerlar</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Karar Rehberi */}
      <section id="decision-guide" className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white text-center">Hangi Kamera Sizin İçin Doğru Seçim?</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Aşağıdaki sorulara vereceğiniz cevaplara göre ihtiyaçlarınıza en uygun kamera türünü belirleyin
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="space-y-10">
              {/* Sorular - Gerçek uygulamada etkileşimli olabilir */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">1. Kamerayı hangi amaçla kullanacaksınız?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Profesyonel fotoğrafçılık için</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">DSLR veya Aynasız kameralar idealdir.</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Video içerik üretimi için</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Aynasız veya Vlog kameralar daha uygundur.</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Seyahat ve günlük kullanım için</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Kompakt kameralar ideal seçimdir.</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Macera ve spor aktiviteleri için</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Aksiyon kameralar en uygun seçenektir.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">2. Bütçeniz ne kadar?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Düşük (500$ altı)</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Kompakt, Aksiyon veya giriş seviyesi Vlog kameralar</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Orta (500$-1500$)</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Giriş/orta seviye DSLR, Aynasız veya premium Vlog kameralar</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Yüksek (1500$+)</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Profesyonel DSLR veya Aynasız kameralar</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">3. Taşınabilirlik ne kadar önemli?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Çok önemli</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Kompakt, Aksiyon veya Vlog kameralar</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Orta derecede önemli</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Aynasız kameralar (daha hafif lenslerle)</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Önemli değil</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">DSLR kameralar (daha iyi tutuş ve pil ömrü için)</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">4. Fotoğrafçılık deneyiminiz ne seviyede?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Yeni başlayan</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Kompakt veya giriş seviyesi DSLR/Aynasız</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Orta seviye</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Orta seviye DSLR veya Aynasız kameralar</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-gray-700 dark:text-gray-300">İleri seviye/Profesyonel</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Profesyonel DSLR veya Aynasız kameralar</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-bold text-yellow-700 dark:text-yellow-400 mb-2">Karar vermekte zorlanıyor musunuz?</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Her kamera türünün kendine has avantajları ve dezavantajları vardır. En iyi seçimi yapmak için, mümkünse bir kamera mağazasında farklı modelleri elinize alıp denemenizi öneririz. Ayrıca, detaylı bilgi için ilgilendiğiniz kamera kategorisine ait sayfalarımızı ziyaret edebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Adım 4: Sık Sorulan Sorular Bölümü */}
      <section id="faq" className="py-16 px-4 bg-white dark:bg-gray-800" ref={faqRef}>
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white text-center">Sık Sorulan Sorular</h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Kamera seçimi ve satın alımı hakkında en çok sorulan soruların cevapları
          </p>

          <div className="space-y-6">
            {[
              {
                question: "DSLR ve aynasız kamera arasındaki temel fark nedir?",
                answer: "DSLR kameralar, görüntüyü optik vizöre yansıtan bir ayna mekanizması kullanırken, aynasız kameralar elektronik vizör kullanır. Aynasız kameralar daha kompakt ve hafiftir, genellikle daha iyi video özellikleri sunar ve sessiz çekim yapabilir. DSLR'lar ise daha uzun pil ömrü, daha geniş lens seçenekleri ve genellikle daha iyi tutuş ergonomisi sunar."
              },
              {
                question: "Yeni başlayan biri için hangi kamera türü en uygundur?",
                answer: "Yeni başlayanlar için genellikle giriş seviyesi DSLR veya aynasız kameralar önerilir. Bu kameralar öğrenme sürecinde büyüme imkanı sunarken, otomatik modları sayesinde hemen güzel sonuçlar almanızı sağlar. Alternatif olarak, taşınabilirlik önemliyse ve daha basit bir deneyim arıyorsanız, iyi bir kompakt kamera da ideal olabilir."
              },
              {
                question: "Kamera alırken megapiksel sayısı ne kadar önemlidir?",
                answer: "Megapiksel sayısı, çözünürlüğü ve dolayısıyla fotoğrafın detay seviyesini etkiler. Ancak, daha fazla megapiksel her zaman daha iyi görüntü kalitesi anlamına gelmez. Sensör boyutu, lens kalitesi ve görüntü işleme yetenekleri genellikle megapiksel sayısından daha önemlidir. Çoğu modern kamera, normal baskılar ve dijital kullanım için yeterli megapiksel sunar (16MP ve üzeri)."
              },
              {
                question: "İkinci el kamera satın almak güvenli midir?",
                answer: "İkinci el kamera satın almak, doğru kaynaktan aldığınız sürece güvenli olabilir. Güvenilir satıcılar veya özel kamera mağazalarından alım yapmak, ürün garantisi veya iade politikası sunan platformları tercih etmek daha güvenlidir. Satın almadan önce kamerayı fiziksel olarak incelemek, deklanşör sayısını öğrenmek ve tüm fonksiyonları test etmek önemlidir."
              },
              {
                question: "Kamera gövdesi mi yoksa lens mi daha önemlidir?",
                answer: "Genellikle lens, görüntü kalitesini belirlemede kamera gövdesinden daha önemli bir faktördür. İyi bir lens, orta seviye bir gövde ile mükemmel sonuçlar verebilir, ancak kötü bir lens, en iyi gövdeyle bile sınırlı sonuçlar verecektir. Bu nedenle, kaliteli lensler için bütçe ayırmak genellikle daha iyi bir yatırımdır. Başlangıç için, bir kit lens ile başlayıp zaman içinde lens koleksiyonunuzu genişletebilirsiniz."
              },
              {
                question: "Video çekimi için en önemli kamera özellikleri nelerdir?",
                answer: "Video çekimi için önemli özellikler: 4K çözünürlük, yüksek kare hızı seçenekleri (60fps veya üzeri), etkili görüntü stabilizasyonu, iyi otomatik odaklama, mikrofon girişi, uzun kayıt süreleri ve iyi pil ömrüdür. Aynasız kameralar ve özel vlog kameraları genellikle video performansında öne çıkar."
              },
              {
                question: "Ne zaman tam çerçeve (full-frame) kamera almak gerekir?",
                answer: "Tam çerçeve kameralar, düşük ışık performansı, daha geniş dinamik aralık ve daha sığ alan derinliği kontrolü gibi avantajlar sunar. Özellikle profesyonel portre, manzara, mimari veya düğün fotoğrafçılığı yapıyorsanız, düşük ışık koşullarında sıklıkla çekim yapıyorsanız veya büyük baskılar oluşturacaksanız, tam çerçeve sensörleri düşünmelisiniz. Ancak, bu kameralar genellikle daha pahalıdır ve daha ağırdır."
              },
              {
                question: "Bir kamera için en önemli aksesuarlar nelerdir?",
                answer: "Önemli kamera aksesuarları: yedek piller, hafıza kartları, temizleme kiti, UV filtre (lens koruma), tripod veya monopod, kamera çantası ve biraz daha ileri seviye için harici flaş veya mikrofondur. Kullanım amacınıza göre, uzaktan kumanda, ND filtreler veya gimbal gibi özel aksesuarlar da düşünülebilir."
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
              >
                <button 
                  className="w-full text-left p-6 font-bold text-gray-800 dark:text-white text-lg flex justify-between items-center focus:outline-none"
                  onClick={() => {
                    // Bu basit gösterim amaçlı - gerçek projede bir state ile toggle yapılmalı
                    const content = document.getElementById(`faq-content-${index}`);
                    if (content) {
                      content.classList.toggle('hidden');
                    }
                  }}
                >
                  {item.question}
                  <FaQuestionCircle className="text-blue-500 ml-3 flex-shrink-0" />
                </button>
                <div id={`faq-content-${index}`} className="hidden p-6 pt-0 text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-600">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Adım 5: CTA Bölümü */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-900 to-indigo-900 text-white relative overflow-hidden" ref={ctaSectionRef}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-purple-400 rounded-full filter blur-2xl"></div>
        </div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Kamera Türünüzü Seçtiniz mi?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Rehberimiz yardımıyla artık hangi kamera türünün size uygun olduğunu biliyorsunuz. Şimdi her kategorideki en iyi kameraları keşfedin!
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <Link href="/dslr-cameras" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center transition-all">
              <FaCamera className="text-3xl mb-4" />
              <span className="font-medium">DSLR Kameralar</span>
            </Link>
            <Link href="/mirrorless-cameras" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center transition-all">
              <MdCameraAlt className="text-3xl mb-4" />
              <span className="font-medium">Aynasız Kameralar</span>
            </Link>
            <Link href="/compact-cameras" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center transition-all">
              <MdPhotoCamera className="text-3xl mb-4" />
              <span className="font-medium">Kompakt Kameralar</span>
            </Link>
            <Link href="/action-cameras" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center transition-all">
              <MdVideocam className="text-3xl mb-4" />
              <span className="font-medium">Aksiyon Kameraları</span>
            </Link>
            <Link href="/vlog-cameras" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center transition-all">
              <FaCamera className="text-3xl mb-4" />
              <span className="font-medium">Vlog Kameraları</span>
            </Link>
          </div>
          
          <div className="mt-12 bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Hala Kararsız mısınız?</h3>
            <p className="mb-6">
              Kamera seçimi konusunda uzman tavsiyesine mi ihtiyacınız var? İhtiyaçlarınızı ve bütçenizi belirtin, size en uygun modelleri önerelim.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-3 rounded-full font-medium hover:bg-blue-50 transition-all">
              <FaInfoCircle /> Bize Ulaşın
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 