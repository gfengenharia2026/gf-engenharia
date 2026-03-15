import { Star, Users, Clock } from 'lucide-react';

export default function SocialProof() {
  return (
    <div className="bg-white border-b border-gray-200 py-4 sticky top-20 z-40 shadow-sm">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Avaliações */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div>
              <p className="font-bold text-gray-900">4.9/5</p>
              <p className="text-sm text-gray-600">127 avaliações</p>
            </div>
          </div>

          {/* Clientes Atendidos */}
          <div className="flex items-center gap-3">
            <Users size={24} className="text-blue-900" />
            <div>
              <p className="font-bold text-gray-900">2.847+ Clientes</p>
              <p className="text-sm text-gray-600">Atendidos com sucesso</p>
            </div>
          </div>

          {/* Tempo de Resposta */}
          <div className="flex items-center gap-3">
            <Clock size={24} className="text-green-600" />
            <div>
              <p className="font-bold text-gray-900">Resposta em 2h</p>
              <p className="text-sm text-gray-600">Garantido</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
