import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as enums from '../src/lib/enums';

/**
 * `src/lib/enums.ts` hand-mirrors the enums in `prisma/schema.prisma` so that
 * application code and tests do not depend on `prisma generate` having run.
 * This test parses the schema and asserts the two never drift apart.
 */

function parseSchemaEnums(): Record<string, string[]> {
  const schema = readFileSync(join(__dirname, '..', 'prisma', 'schema.prisma'), 'utf8');
  const result: Record<string, string[]> = {};

  const enumBlock = /enum\s+(\w+)\s*\{([^}]*)\}/g;
  let match: RegExpExecArray | null;

  while ((match = enumBlock.exec(schema)) !== null) {
    const [, name, body] = match;
    result[name] = body
      .split('\n')
      .map((line) => line.replace(/\/\/.*$/, '').trim())
      .filter((line) => line.length > 0);
  }

  return result;
}

describe('Prisma enum mirrors (src/lib/enums.ts)', () => {
  const schemaEnums = parseSchemaEnums();

  it('parses every enum out of the Prisma schema', () => {
    expect(Object.keys(schemaEnums).length).toBeGreaterThan(0);
  });

  it('mirrors an object for every enum declared in the schema', () => {
    for (const name of Object.keys(schemaEnums)) {
      expect(enums, `missing mirror for enum ${name}`).toHaveProperty(name);
    }
  });

  it('has exactly the same members, with identical string values', () => {
    for (const [name, members] of Object.entries(schemaEnums)) {
      const mirror = (enums as Record<string, unknown>)[name] as Record<string, string>;

      expect(Object.keys(mirror).sort(), `member mismatch for ${name}`).toEqual([...members].sort());

      // Each member must map to its own name so the values stay wire-identical
      // to the database enum members.
      for (const member of members) {
        expect(mirror[member], `${name}.${member} must equal '${member}'`).toBe(member);
      }
    }
  });

  it('does not declare mirrors for enums that no longer exist in the schema', () => {
    const mirrored = Object.keys(enums).filter(
      (key) => typeof (enums as Record<string, unknown>)[key] === 'object'
    );

    for (const name of mirrored) {
      expect(schemaEnums, `stale mirror '${name}' is not in schema.prisma`).toHaveProperty(name);
    }
  });
});
