import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, DollarSign, Phone, Mail, Calendar, ArrowUp, ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";

// Dados simulados para demonstração
const leadsTrendData = [
  { month: "Jan", leads: 5, conversions: 1, value: 2000 },
  { month: "Fev", leads: 8, conversions: 2, value: 4000 },
  { month: "Mar", leads: 12, conversions: 3, value: 6000 },
  { month: "Abr", leads: 15, conversions: 4, value: 8000 },
];

const serviceDistribution = [
  { name: "Vistoria Imóvel", value: 35, color: "#0D3B66" },
  { name: "Laudo Patologias", value: 25, color: "#8FA3B3" },
  { name: "Avaliação Imóvel", value: 20, color: "#E8EEF3" },
  { name: "Perícia Judicial", value: 15, color: "#F59E0B" },
  { name: "Inspeção Predial", value: 5, color: "#1F2937" },
];

const leadSourceData = [
  { source: "WhatsApp", leads: 45, conversion: 22 },
  { source: "Formulário", leads: 30, conversion: 12 },
  { source: "Calendly", leads: 20, conversion: 8 },
  { source: "Telefone", leads: 15, conversion: 10 },
  { source: "Email", leads: 10, conversion: 3 },
];

const conversionFunnelData = [
  { stage: "Visitantes", value: 1000, percentage: 100 },
  { stage: "Leads", value: 150, percentage: 15 },
  { stage: "Qualificados", value: 75, percentage: 50 },
  { stage: "Agendados", value: 45, percentage: 60 },
  { stage: "Clientes", value: 30, percentage: 67 },
];

export default function SalesDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Verificar se é admin
  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Acesso Restrito</h1>
          <p className="text-muted-foreground mb-6">Apenas administradores podem acessar este painel.</p>
          <Button onClick={() => window.location.href = "/"}>Voltar ao Início</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard de Vendas</h1>
          <p className="text-muted-foreground">Análise completa de leads, conversões e performance</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-l-4 border-l-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total de Leads</p>
                <p className="text-3xl font-bold text-foreground">127</p>
                <p className="text-xs text-green-600 flex items-center mt-2">
                  <ArrowUp className="w-3 h-3 mr-1" /> +15% vs mês anterior
                </p>
              </div>
              <Users className="w-12 h-12 text-primary opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-accent">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Taxa Conversão</p>
                <p className="text-3xl font-bold text-foreground">24%</p>
                <p className="text-xs text-green-600 flex items-center mt-2">
                  <ArrowUp className="w-3 h-3 mr-1" /> +8% vs mês anterior
                </p>
              </div>
              <TrendingUp className="w-12 h-12 text-accent opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-muted">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Valor Estimado</p>
                <p className="text-3xl font-bold text-foreground">R$ 45.000</p>
                <p className="text-xs text-green-600 flex items-center mt-2">
                  <ArrowUp className="w-3 h-3 mr-1" /> +25% vs mês anterior
                </p>
              </div>
              <DollarSign className="w-12 h-12 text-muted opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tempo Resposta Médio</p>
                <p className="text-3xl font-bold text-foreground">2h 15m</p>
                <p className="text-xs text-green-600 flex items-center mt-2">
                  <ArrowDown className="w-3 h-3 mr-1" /> -30% vs mês anterior
                </p>
              </div>
              <Phone className="w-12 h-12 text-primary opacity-20" />
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Leads Trend */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Tendência de Leads</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={leadsTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EEF3" />
                <XAxis dataKey="month" stroke="#8FA3B3" />
                <YAxis stroke="#8FA3B3" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#FFFFFF", border: "1px solid #E8EEF3" }}
                  formatter={(value) => [`${value}`, ""]}
                />
                <Legend />
                <Line type="monotone" dataKey="leads" stroke="#0D3B66" strokeWidth={2} name="Leads" />
                <Line type="monotone" dataKey="conversions" stroke="#F59E0B" strokeWidth={2} name="Conversões" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Service Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Distribuição de Serviços</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {serviceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Lead Source & Conversion Funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Lead Source */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Origem dos Leads</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={leadSourceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EEF3" />
                <XAxis dataKey="source" stroke="#8FA3B3" />
                <YAxis stroke="#8FA3B3" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#FFFFFF", border: "1px solid #E8EEF3" }}
                />
                <Legend />
                <Bar dataKey="leads" fill="#0D3B66" name="Leads" />
                <Bar dataKey="conversion" fill="#F59E0B" name="Conversões" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Conversion Funnel */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Funil de Conversão</h3>
            <div className="space-y-4">
              {conversionFunnelData.map((stage, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{stage.stage}</span>
                    <span className="text-sm text-muted-foreground">{stage.value} ({stage.percentage}%)</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all"
                      style={{ width: `${stage.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Leads Table */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Leads Recentes</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Nome</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Serviço</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Origem</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Data</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "João Silva", service: "Vistoria Imóvel", origin: "WhatsApp", status: "Agendado", date: "03/04/2026" },
                  { name: "Maria Santos", service: "Laudo Patologias", origin: "Formulário", status: "Qualificado", date: "02/04/2026" },
                  { name: "Pedro Costa", service: "Perícia Judicial", origin: "Calendly", status: "Agendado", date: "01/04/2026" },
                  { name: "Ana Oliveira", service: "Avaliação Imóvel", origin: "WhatsApp", status: "Novo", date: "31/03/2026" },
                  { name: "Carlos Mendes", service: "Inspeção Predial", origin: "Email", status: "Qualificado", date: "30/03/2026" },
                ].map((lead, index) => (
                  <tr key={index} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4 text-sm text-foreground">{lead.name}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{lead.service}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{lead.origin}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        lead.status === "Agendado" ? "bg-green-100 text-green-800" :
                        lead.status === "Qualificado" ? "bg-blue-100 text-blue-800" :
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{lead.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
