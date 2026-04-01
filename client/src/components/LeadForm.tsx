import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "vistoria",
    propertyAddress: "",
    propertyType: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const createLeadMutation = trpc.crm.createLead.useMutation();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      serviceType: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await createLeadMutation.mutateAsync({
        name: formData.name,
        email: formData.email || undefined,
        phone: formData.phone,
        serviceType: formData.serviceType as any,
        propertyAddress: formData.propertyAddress || undefined,
        propertyType: formData.propertyType || undefined,
        message: formData.message || undefined,
      });

      if (result.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          serviceType: "vistoria",
          propertyAddress: "",
          propertyType: "",
          message: "",
        });

        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error("Erro ao enviar lead:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="p-8 bg-gradient-to-br from-white to-slate-50 border-slate-200">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Solicite uma Vistoria</h2>
        <p className="text-slate-600 mb-8">Preencha o formulário abaixo e entraremos em contato em breve</p>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
          >
            <CheckCircle2 className="text-green-600" size={20} />
            <div>
              <p className="font-semibold text-green-900">Lead registrado com sucesso!</p>
              <p className="text-sm text-green-700">Entraremos em contato em breve via WhatsApp</p>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nome Completo *</label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Seu nome"
                required
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Telefone/WhatsApp *</label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(19) 99999-9999"
                required
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Tipo de Serviço */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Serviço *</label>
              <Select value={formData.serviceType} onValueChange={handleServiceTypeChange}>
                <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vistoria">Vistoria de Imóvel</SelectItem>
                  <SelectItem value="laudo">Laudo Técnico</SelectItem>
                  <SelectItem value="pericia">Perícia de Engenharia</SelectItem>
                  <SelectItem value="avaliacao">Avaliação de Imóvel</SelectItem>
                  <SelectItem value="inspecao">Inspeção Predial</SelectItem>
                  <SelectItem value="assistencia">Assistência Técnica</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Endereço do Imóvel */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Endereço do Imóvel</label>
              <Input
                type="text"
                name="propertyAddress"
                value={formData.propertyAddress}
                onChange={handleChange}
                placeholder="Rua, número, bairro"
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Tipo de Imóvel */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Imóvel</label>
              <Select value={formData.propertyType} onValueChange={(value) => setFormData((prev) => ({ ...prev, propertyType: value }))}>
                <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residencial">Residencial</SelectItem>
                  <SelectItem value="comercial">Comercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="terreno">Terreno</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mensagem */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Mensagem</label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Descreva seu problema ou necessidade..."
              rows={4}
              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Botão */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={createLeadMutation.isPending}
              className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-3 rounded-lg transition-all"
            >
              {createLeadMutation.isPending ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Enviando...
                </>
              ) : (
                "Solicitar Vistoria"
              )}
            </Button>
          </motion.div>

          <p className="text-xs text-slate-500 text-center">
            Seus dados serão usados apenas para contato sobre sua solicitação
          </p>
        </form>
      </Card>
    </motion.div>
  );
}
