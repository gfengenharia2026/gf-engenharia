import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { createLead, getLeads, getLeadById, updateLead, getLeadsCount, getLeadsByStatus, getLeadsAnalytics } from "../crm";

export const crmRouter = router({
  // PUBLIC: Criar novo lead
  createLead: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        email: z.string().email().optional(),
        phone: z.string().min(10),
        serviceType: z.enum(["vistoria", "laudo", "pericia", "avaliacao", "inspecao", "assistencia"]),
        propertyAddress: z.string().optional(),
        propertyArea: z.string().optional(),
        propertyType: z.string().optional(),
        message: z.string().optional(),
        source: z.string().default("website"),
        utmSource: z.string().optional(),
        utmMedium: z.string().optional(),
        utmCampaign: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const lead = await createLead({
        name: input.name,
        email: input.email || null,
        phone: input.phone,
        serviceType: input.serviceType,
        propertyAddress: input.propertyAddress || null,
        propertyArea: input.propertyArea ? (parseFloat(input.propertyArea) as any) : null,
        propertyType: input.propertyType || null,
        message: input.message || null,
        source: input.source,
        utmSource: input.utmSource || null,
        utmMedium: input.utmMedium || null,
        utmCampaign: input.utmCampaign || null,
        status: "novo",
        priority: "media",
      });

      return {
        success: !!lead,
        leadId: lead?.id,
      };
    }),

  // PROTECTED: Listar leads (admin)
  list: protectedProcedure
    .input(
      z.object({
        limit: z.number().default(50),
        offset: z.number().default(0),
        status: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        return [];
      }

      if (input.status) {
        return await getLeadsByStatus(input.status);
      }

      return await getLeads(input.limit, input.offset);
    }),

  // PROTECTED: Obter lead específico
  getById: protectedProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        return null;
      }

      return await getLeadById(input);
    }),

  // PROTECTED: Atualizar lead
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["novo", "contatado", "agendado", "visitado", "laudo_gerado", "finalizado", "descartado"]).optional(),
        priority: z.enum(["baixa", "media", "alta"]).optional(),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        return null;
      }

      const updateData: any = {};
      if (input.status) updateData.status = input.status;
      if (input.priority) updateData.priority = input.priority;
      if (input.message) updateData.message = input.message;

      return await updateLead(input.id, updateData);
    }),

  // PROTECTED: Obter analytics
  analytics: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user?.role !== "admin") {
      return null;
    }

    return await getLeadsAnalytics();
  }),

  // PROTECTED: Contar leads
  count: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user?.role !== "admin") {
      return 0;
    }

    return await getLeadsCount();
  }),
});
