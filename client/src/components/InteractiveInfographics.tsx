import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const riskFactorsData = [
  { factor: 'Idade do Imóvel', risk: 85, color: '#F59E0B' },
  { factor: 'Umidade', risk: 72, color: '#EF4444' },
  { factor: 'Infiltração', risk: 68, color: '#F97316' },
  { factor: 'Fissuras', risk: 55, color: '#FBBF24' },
  { factor: 'Estrutura', risk: 42, color: '#34D399' },
];

const experienceTimeline = [
  { year: 2019, projects: 2000, expertise: 'Iniciante' },
  { year: 2020, projects: 4500, expertise: 'Intermediário' },
  { year: 2021, projects: 7000, expertise: 'Avançado' },
  { year: 2022, projects: 10000, expertise: 'Especialista' },
  { year: 2023, projects: 12500, expertise: 'Mestre' },
  { year: 2024, projects: 15000, expertise: 'Referência' },
];

export default function InteractiveInfographics() {
  const [selectedFactor, setSelectedFactor] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Risk Factors */}
      <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <h3 className="text-2xl font-bold text-foreground mb-6">Fatores de Risco Analisados</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskFactorsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EEF3" />
                <XAxis dataKey="factor" stroke="#8FA3B3" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#8FA3B3" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E8EEF3' }}
                  formatter={(value) => `${value}%`}
                />
                <Bar dataKey="risk" fill="#0D3B66" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            {riskFactorsData.map((factor) => (
              <button
                key={factor.factor}
                onClick={() => setSelectedFactor(selectedFactor === factor.factor ? null : factor.factor)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  selectedFactor === factor.factor
                    ? 'border-accent bg-accent/10'
                    : 'border-border hover:border-primary'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">{factor.factor}</span>
                  <span className="text-lg font-bold text-accent">{factor.risk}%</span>
                </div>
                {selectedFactor === factor.factor && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Risco elevado. Recomenda-se inspeção técnica profissional.
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Experience Timeline */}
      <Card className="p-8 bg-gradient-to-br from-accent/5 to-primary/5">
        <h3 className="text-2xl font-bold text-foreground mb-6">Evolução de Expertise (2019-2024)</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={experienceTimeline}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8EEF3" />
            <XAxis dataKey="year" stroke="#8FA3B3" />
            <YAxis stroke="#8FA3B3" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E8EEF3' }}
              formatter={(value) => [`${value.toLocaleString()} laudos`, 'Projetos']}
            />
            <Line 
              type="monotone" 
              dataKey="projects" 
              stroke="#0D3B66" 
              strokeWidth={3}
              dot={{ fill: '#F59E0B', r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {experienceTimeline.map((item) => (
            <div key={item.year} className="p-4 bg-secondary rounded-lg text-center">
              <p className="text-sm text-muted-foreground">{item.year}</p>
              <p className="text-xl font-bold text-primary">{(item.projects / 1000).toFixed(1)}k</p>
              <p className="text-xs text-accent font-semibold">{item.expertise}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Service Distribution */}
      <Card className="p-8">
        <h3 className="text-2xl font-bold text-foreground mb-6">Distribuição de Serviços</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Vistoria', value: 35, color: '#0D3B66' },
                  { name: 'Laudo Patologias', value: 25, color: '#8FA3B3' },
                  { name: 'Avaliação', value: 20, color: '#E8EEF3' },
                  { name: 'Perícia', value: 15, color: '#F59E0B' },
                  { name: 'Inspeção', value: 5, color: '#1F2937' },
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {[
                  { color: '#0D3B66' },
                  { color: '#8FA3B3' },
                  { color: '#E8EEF3' },
                  { color: '#F59E0B' },
                  { color: '#1F2937' },
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg border-l-4 border-l-primary">
              <p className="text-sm text-muted-foreground">Serviço Mais Solicitado</p>
              <p className="text-2xl font-bold text-primary">Vistoria de Imóvel</p>
              <p className="text-xs text-muted-foreground mt-1">35% dos laudos realizados</p>
            </div>
            <div className="p-4 bg-accent/10 rounded-lg border-l-4 border-l-accent">
              <p className="text-sm text-muted-foreground">Especialidade</p>
              <p className="text-2xl font-bold text-accent">Laudo de Patologias</p>
              <p className="text-xs text-muted-foreground mt-1">Infiltração, fissuras, umidade</p>
            </div>
            <div className="p-4 bg-muted/10 rounded-lg border-l-4 border-l-muted">
              <p className="text-sm text-muted-foreground">Serviço Premium</p>
              <p className="text-2xl font-bold text-muted">Perícia Judicial</p>
              <p className="text-xs text-muted-foreground mt-1">Aceita em tribunal (TJSP, TRT-15, TRF-3)</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
