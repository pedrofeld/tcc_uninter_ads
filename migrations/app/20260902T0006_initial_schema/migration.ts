#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/beffe4e1daca9c958606a5c2cfa2fd5c64210b66007929ddf96908021b0d9cc8/contract';
import endContract from '../../snapshots/beffe4e1daca9c958606a5c2cfa2fd5c64210b66007929ddf96908021b0d9cc8/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'investors',
        columns: [
          col('biography', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('companyName', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('companyWebsite', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('investorType', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('linkedIn', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('phoneNumber', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('position', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'investors_investorType_check_7823aac0',
            "\"investorType\" IN ('INDIVIDUAL', 'COMPANY')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'project_supports',
        columns: [
          col('projectId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('type', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['projectId', 'type']),
          checkExpression(
            'project_supports_type_check_db98e630',
            "\"type\" IN ('FINANCIAL', 'MENTORSHIP', 'PARTNERSHIP', 'EQUIPMENT', 'TECNOLOGICAL', 'DIVULGATION', 'SPACE', 'OTHER')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'projects',
        columns: [
          col('city', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('obstacles', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('projectImageUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('publishedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('resume', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('sector', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('state', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('DRAFT'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'projects_sector_check_064f27a4',
            "\"sector\" IN ('TECH', 'HEALTH', 'EDUCATION', 'ENVIRONMENT', 'SOCIAL', 'OTHER')",
          ),
          checkExpression(
            'projects_status_check_bc64f66b',
            "\"status\" IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'users',
        columns: [
          col('city', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('firstName', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('lastName', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('passwordHash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('role', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('state', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'users_role_check_e0b44a39',
            "\"role\" IN ('VISIONARY', 'INVESTOR', 'ADMIN')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'visionarys',
        columns: [
          col('biography', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('linkedIn', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('phoneNumber', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('profession', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('studyArea', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'investors',
        constraint: 'investors_userId_key',
        columns: ['userId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'users',
        constraint: 'users_email_key',
        columns: ['email'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'visionarys',
        constraint: 'visionarys_userId_key',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'project_supports',
        index: 'project_supports_projectId_idx_a96e4d92',
        columns: ['projectId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'projects',
        index: 'projects_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'investors',
        foreignKey: {
          name: 'investors_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'project_supports',
        foreignKey: {
          name: 'project_supports_projectId_fkey',
          columns: ['projectId'],
          references: { schema: 'public', table: 'projects', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'projects',
        foreignKey: {
          name: 'projects_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'visionarys',
        foreignKey: {
          name: 'visionarys_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
