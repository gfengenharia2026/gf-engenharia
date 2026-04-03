import { Play, Eye, ThumbsUp } from 'lucide-react';
import Header from '@/components/Header';

const videos = [
  {
    id: 1,
    title: 'Como Funciona Uma Vistoria Técnica',
    description: 'Veja passo a passo como realizamos uma vistoria profissional em imóvel',
    thumbnail: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663057289090/FfhZ2VxW9RDUmNFz5qwBY3/hero-engenheiro-YD5NWNMKezgrrJhjC8vjux.webp',
    duration: '5:32',
    views: '1.2K',
    likes: '89',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 2,
    title: 'Identificando Patologias em Imóveis',
    description: 'Aprenda a reconhecer infiltração, fissuras e outros problemas estruturais',
    thumbnail: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663057289090/FfhZ2VxW9RDUmNFz5qwBY3/servicos-background-cFUjx8bDgh9m4NPLSfybPN.webp',
    duration: '8:15',
    views: '2.5K',
    likes: '156',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 3,
    title: 'Depoimento de Cliente Satisfeito',
    description: 'Veja o que nossos clientes dizem sobre nossos serviços',
    thumbnail: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663057289090/FfhZ2VxW9RDUmNFz5qwBY3/autoridade-background-jPPZs4gbkdNba3Ypb6yR9U.webp',
    duration: '3:45',
    views: '890',
    likes: '72',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 4,
    title: 'NBR 14653 Explicada',
    description: 'Entenda a norma técnica de avaliação de imóveis',
    thumbnail: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663057289090/FfhZ2VxW9RDUmNFz5qwBY3/problemas-background-hUw6tV8zoisycwdh2NchXw.webp',
    duration: '6:20',
    views: '1.8K',
    likes: '124',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 5,
    title: 'Processo de Perícia Judicial',
    description: 'Como funciona uma perícia para fins judiciais',
    thumbnail: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663057289090/FfhZ2VxW9RDUmNFz5qwBY3/hero-engenheiro-YD5NWNMKezgrrJhjC8vjux.webp',
    duration: '7:10',
    views: '1.5K',
    likes: '98',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 6,
    title: 'Inspeção Predial Completa',
    description: 'Conheça todos os pontos verificados em uma inspeção predial',
    thumbnail: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663057289090/FfhZ2VxW9RDUmNFz5qwBY3/servicos-background-cFUjx8bDgh9m4NPLSfybPN.webp',
    duration: '9:05',
    views: '2.1K',
    likes: '167',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];

export default function Videos() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Videos Header */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Vídeos Técnicos</h1>
          <p className="text-xl text-gray-100">Aprenda sobre perícias, vistorias e avaliação de imóveis com nossos vídeos profissionais</p>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map(video => (
              <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition group">
                {/* Thumbnail */}
                <div className="relative overflow-hidden bg-black aspect-video">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-center justify-center">
                    <Play size={48} className="text-white" fill="white" />
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{video.description}</p>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-3">
                    <span className="flex items-center gap-1">
                      <Eye size={16} /> {video.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp size={16} /> {video.likes}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-12">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Inscreva-se no Nosso Canal</h2>
          <p className="text-xl text-gray-100 mb-6">Receba notificações de novos vídeos técnicos e dicas profissionais</p>
          <a 
            href="https://www.youtube.com/@engustavo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-orange-400 hover:bg-orange-500 text-white px-8 py-3 rounded-lg font-bold transition"
          >
            Inscrever-se no YouTube
          </a>
        </div>
      </section>
    </div>
  );
}
