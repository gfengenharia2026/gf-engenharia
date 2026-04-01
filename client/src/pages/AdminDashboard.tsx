import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Users, TrendingUp, CheckCircle2, Clock, AlertCircle, Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const { data: leads, isLoading } = trpc.crm.list.useQuery({ limit: 100 }, { enabled: isAuthenticated });
  const { data: analytics } = trpc.crm.analytics.useQuery(undefined, { enabled: isAuthenticated });
  const updateLeadMutation = trpc.crm.update.useMutation();
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<string>("todos");

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="p-8 text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <h1 className="text-2xl font-bold mb-2">Acesso Negado</h1>
          <p className="text-gray-600">Você não tem permissão para acessar este painel.</p>
        </Card>
      </div>
    );
  }

  const filteredLeads = leads?.filter((lead: any) => {
    if (filterStatus === "todos") return true;
    return lead.status === filterStatus;
  }) || [];

  const statCards = [
    {
      title: "Total de Leads",
      value: analytics?.total || 0,
      icon: Users,
      color: "from-blue-500 to-blue-600",
      label: "Leads capturados",
    },
    {
      title: "Novos",
      value: analytics?.novo || 0,
      icon: AlertCircle,
      color: "from-yellow-500 to-yellow-600",
      label: "Aguardando contato",
    },
    {
      title: "Agendados",
      value: analytics?.agendado || 0,
      icon: Clock,
      color: "from-orange-500 to-orange-600",
      label: "Vistorias marcadas",
    },
    {
      title: "Finalizados",
      value: analytics?.finalizado || 0,
      icon: CheckCircle2,
      color: "from-green-500 to-green-600",
      label: "Conversões",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: any }> = {
      novo: { label: "Novo", variant: "default" },
      contatado: { label: "Contatado", variant: "secondary" },
      agendado: { label: "Agendado", variant: "outline" },
      visitado: { label: "Visitado", variant: "secondary" },
      laudo_gerado: { label: "Laudo Gerado", variant: "outline" },
      finalizado: { label: "Finalizado", variant: "default" },
      descartado: { label: "Descartado", variant: "secondary" },
    };

    const config = statusMap[status] || { label: status, variant: "default" };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      alta: "bg-red-100 text-red-800",
      media: "bg-yellow-100 text-yellow-800",
      baixa: "bg-green-100 text-green-800",
    };
    return colors[priority] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Dashboard de Leads</h1>
          <p className="text-slate-600">Gerencie todos os leads e vistorias do seu negócio</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {statCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow bg-white overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 hover:opacity-5 transition-opacity`} />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-slate-600">{stat.title}</h3>
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
                        <Icon size={20} />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                    <p className="text-xs text-slate-500">{stat.label}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Leads Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Leads Recentes</h2>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="novo">Novo</SelectItem>
                  <SelectItem value="contatado">Contatado</SelectItem>
                  <SelectItem value="agendado">Agendado</SelectItem>
                  <SelectItem value="finalizado">Finalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin">
                  <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full" />
                </div>
                <p className="mt-4 text-slate-600">Carregando leads...</p>
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p className="text-slate-600">Nenhum lead encontrado</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Nome</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Contato</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Serviço</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Prioridade</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead: any, idx: number) => (
                      <motion.tr
                        key={lead.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="font-medium text-slate-900">{lead.name}</div>
                          <div className="text-sm text-slate-500">{lead.propertyType || "Imóvel"}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-col gap-1">
                            {lead.email && (
                              <a href={`mailto:${lead.email}`} className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                                <Mail size={14} />
                                {lead.email}
                              </a>
                            )}
                            <a href={`https://wa.me/55${lead.phone}`} className="text-sm text-green-600 hover:underline flex items-center gap-1">
                              <Phone size={14} />
                              {lead.phone}
                            </a>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline">{lead.serviceType}</Badge>
                        </td>
                        <td className="py-4 px-4">{getStatusBadge(lead.status)}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(lead.priority)}`}>
                            {lead.priority}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedLead(lead)}
                              >
                                Editar
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Editar Lead: {selectedLead?.name}</DialogTitle>
                              </DialogHeader>
                              <LeadEditForm lead={selectedLead} onUpdate={() => {}} />
                            </DialogContent>
                          </Dialog>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function LeadEditForm({ lead, onUpdate }: { lead: any; onUpdate: () => void }) {
  const [status, setStatus] = useState(lead?.status || "novo");
  const [priority, setPriority] = useState(lead?.priority || "media");
  const updateMutation = trpc.crm.update.useMutation();

  const handleSave = async () => {
    if (lead?.id) {
      await updateMutation.mutateAsync({
        id: lead.id,
        status: status as any,
        priority: priority as any,
      });
      onUpdate();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Status</label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="novo">Novo</SelectItem>
            <SelectItem value="contatado">Contatado</SelectItem>
            <SelectItem value="agendado">Agendado</SelectItem>
            <SelectItem value="visitado">Visitado</SelectItem>
            <SelectItem value="laudo_gerado">Laudo Gerado</SelectItem>
            <SelectItem value="finalizado">Finalizado</SelectItem>
            <SelectItem value="descartado">Descartado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Prioridade</label>
        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="baixa">Baixa</SelectItem>
            <SelectItem value="media">Média</SelectItem>
            <SelectItem value="alta">Alta</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleSave} className="w-full" disabled={updateMutation.isPending}>
        {updateMutation.isPending ? "Salvando..." : "Salvar Alterações"}
      </Button>
    </div>
  );
}
