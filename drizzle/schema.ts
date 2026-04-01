import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean, longtext } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * LEADS TABLE - CRM de Captura de Leads
 * Armazena todos os leads gerados pelo site
 */
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  
  // Informações do Lead
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }).notNull(),
  
  // Detalhes do Serviço
  serviceType: mysqlEnum("serviceType", [
    "vistoria",
    "laudo",
    "pericia",
    "avaliacao",
    "inspecao",
    "assistencia"
  ]).notNull(),
  
  // Informações do Imóvel
  propertyAddress: text("propertyAddress"),
  propertyArea: decimal("propertyArea", { precision: 10, scale: 2 }),
  propertyType: varchar("propertyType", { length: 100 }),
  
  // Status e Prioridade
  status: mysqlEnum("status", [
    "novo",
    "contatado",
    "agendado",
    "visitado",
    "laudo_gerado",
    "finalizado",
    "descartado"
  ]).default("novo").notNull(),
  
  priority: mysqlEnum("priority", ["baixa", "media", "alta"]).default("media").notNull(),
  
  // Mensagem do Lead
  message: longtext("message"),
  
  // Timestamps
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  
  // Rastreamento
  source: varchar("source", { length: 100 }).default("website"),
  utmSource: varchar("utmSource", { length: 100 }),
  utmMedium: varchar("utmMedium", { length: 100 }),
  utmCampaign: varchar("utmCampaign", { length: 100 }),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

/**
 * VISTORIAS TABLE - Registro de Vistorias Realizadas
 */
export const vistorias = mysqlTable("vistorias", {
  id: int("id").autoincrement().primaryKey(),
  leadId: int("leadId").notNull(),
  
  dataVistoria: timestamp("dataVistoria"),
  endereco: text("endereco").notNull(),
  descricao: longtext("descricao"),
  
  status: mysqlEnum("status", [
    "agendada",
    "realizada",
    "laudo_em_preparacao",
    "laudo_pronto",
    "entregue"
  ]).default("agendada").notNull(),
  
  preco: decimal("preco", { precision: 10, scale: 2 }),
  pago: boolean("pago").default(false),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Vistoria = typeof vistorias.$inferSelect;
export type InsertVistoria = typeof vistorias.$inferInsert;

/**
 * LAUDOS TABLE - Laudos Técnicos Gerados
 */
export const laudos = mysqlTable("laudos", {
  id: int("id").autoincrement().primaryKey(),
  vistoriaId: int("vistoriaId").notNull(),
  leadId: int("leadId").notNull(),
  
  numero: varchar("numero", { length: 100 }).unique(),
  tipo: mysqlEnum("tipo", [
    "vistoria",
    "laudo_patologias",
    "avaliacao",
    "inspecao",
    "pericia"
  ]).notNull(),
  
  conteudo: longtext("conteudo"),
  pdfUrl: varchar("pdfUrl", { length: 500 }),
  
  status: mysqlEnum("status", [
    "rascunho",
    "em_revisao",
    "finalizado",
    "entregue"
  ]).default("rascunho").notNull(),
  
  assinadoEm: timestamp("assinadoEm"),
  assinadoPor: varchar("assinadoPor", { length: 255 }),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Laudo = typeof laudos.$inferSelect;
export type InsertLaudo = typeof laudos.$inferInsert;

/**
 * CLIENTES TABLE - Dados de Clientes Recorrentes
 */
export const clientes = mysqlTable("clientes", {
  id: int("id").autoincrement().primaryKey(),
  
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).unique(),
  phone: varchar("phone", { length: 20 }).notNull(),
  
  tipo: mysqlEnum("tipo", [
    "pessoa_fisica",
    "imobiliaria",
    "advogado",
    "empresa"
  ]).notNull(),
  
  cpfCnpj: varchar("cpfCnpj", { length: 20 }),
  endereco: text("endereco"),
  
  totalVistorias: int("totalVistorias").default(0),
  totalGasto: decimal("totalGasto", { precision: 15, scale: 2 }).default("0"),
  
  leadId: int("leadId"),
  
  ativo: boolean("ativo").default(true),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Cliente = typeof clientes.$inferSelect;
export type InsertCliente = typeof clientes.$inferInsert;