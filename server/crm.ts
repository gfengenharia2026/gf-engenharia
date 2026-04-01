import { eq, desc, and, gte, lte } from "drizzle-orm";
import { leads, vistorias, laudos, clientes, Lead, InsertLead, Vistoria, InsertVistoria, Laudo, InsertLaudo } from "../drizzle/schema";
import { getDb } from "./db";

/**
 * LEADS MANAGEMENT
 */

export async function createLead(data: InsertLead): Promise<Lead | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.insert(leads).values(data);
    const leadId = (result[0] as any).insertId || result[0];
    const lead = await db.select().from(leads).where(eq(leads.id, leadId as number)).limit(1);
    return lead[0] || null;
  } catch (error) {
    console.error("[CRM] Failed to create lead:", error);
    return null;
  }
}

export async function getLeads(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db.select()
      .from(leads)
      .orderBy(desc(leads.createdAt))
      .limit(limit)
      .offset(offset);
  } catch (error) {
    console.error("[CRM] Failed to get leads:", error);
    return [];
  }
}

export async function getLeadById(id: number): Promise<Lead | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("[CRM] Failed to get lead:", error);
    return null;
  }
}

export async function updateLead(id: number, data: Partial<Lead>) {
  const db = await getDb();
  if (!db) return null;

  try {
    await db.update(leads).set(data).where(eq(leads.id, id));
    return await getLeadById(id);
  } catch (error) {
    console.error("[CRM] Failed to update lead:", error);
    return null;
  }
}

export async function getLeadsCount() {
  const db = await getDb();
  if (!db) return 0;

  try {
    const result = await db.select({ count: leads.id }).from(leads);
    return result.length;
  } catch (error) {
    console.error("[CRM] Failed to count leads:", error);
    return 0;
  }
}

export async function getLeadsByStatus(status: string) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db.select()
      .from(leads)
      .where(eq(leads.status, status as any))
      .orderBy(desc(leads.createdAt));
  } catch (error) {
    console.error("[CRM] Failed to get leads by status:", error);
    return [];
  }
}

/**
 * VISTORIAS MANAGEMENT
 */

export async function createVistoria(data: InsertVistoria): Promise<Vistoria | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.insert(vistorias).values(data);
    const vistoriaId = (result[0] as any).insertId || result[0];
    const vistoria = await db.select().from(vistorias).where(eq(vistorias.id, vistoriaId as number)).limit(1);
    return vistoria[0] || null;
  } catch (error) {
    console.error("[CRM] Failed to create vistoria:", error);
    return null;
  }
}

export async function getVistoriasByLead(leadId: number) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db.select()
      .from(vistorias)
      .where(eq(vistorias.leadId, leadId))
      .orderBy(desc(vistorias.createdAt));
  } catch (error) {
    console.error("[CRM] Failed to get vistorias:", error);
    return [];
  }
}

/**
 * LAUDOS MANAGEMENT
 */

export async function createLaudo(data: InsertLaudo): Promise<Laudo | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.insert(laudos).values(data);
    const laudoId = (result[0] as any).insertId || result[0];
    const laudo = await db.select().from(laudos).where(eq(laudos.id, laudoId as number)).limit(1);
    return laudo[0] || null;
  } catch (error) {
    console.error("[CRM] Failed to create laudo:", error);
    return null;
  }
}

export async function getLaudosByLead(leadId: number) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db.select()
      .from(laudos)
      .where(eq(laudos.leadId, leadId))
      .orderBy(desc(laudos.createdAt));
  } catch (error) {
    console.error("[CRM] Failed to get laudos:", error);
    return [];
  }
}

/**
 * ANALYTICS
 */

export async function getLeadsAnalytics() {
  const db = await getDb();
  if (!db) return null;

  try {
    const total = await db.select({ count: leads.id }).from(leads);
    const novo = await db.select({ count: leads.id }).from(leads).where(eq(leads.status, "novo" as any));
    const contatado = await db.select({ count: leads.id }).from(leads).where(eq(leads.status, "contatado" as any));
    const agendado = await db.select({ count: leads.id }).from(leads).where(eq(leads.status, "agendado" as any));
    const finalizado = await db.select({ count: leads.id }).from(leads).where(eq(leads.status, "finalizado" as any));

    return {
      total: total.length,
      novo: novo.length,
      contatado: contatado.length,
      agendado: agendado.length,
      finalizado: finalizado.length,
    };
  } catch (error) {
    console.error("[CRM] Failed to get analytics:", error);
    return null;
  }
}
