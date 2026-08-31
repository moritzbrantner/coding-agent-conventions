export type GeneratorRegistration = {
  id: string;
  path: string;
};

export type GeneratorDescriptor = {
  schemaVersion: number;
  id: string;
  rules: string[];
  technologies: string[];
  compose: Array<{ generator: string; inputs?: Record<string, string> }>;
};

export type RegistryModule = {
  dependencies: string[];
  generators?: GeneratorRegistration[];
};

export type RegistryShape = {
  modules: Record<string, RegistryModule>;
};

const allowedTransforms = new Set(["pascal", "camel", "kebab", "snake"]);

export function validateTemplateExpressions(template: string): string[] {
  const errors: string[] = [];

  for (const match of template.matchAll(/{{(.*?)}}/gs)) {
    const expression = match[1]?.trim() ?? "";
    const [name, transform, ...rest] = expression.split("|").map((part) => part.trim());

    if (!name || !/^[A-Za-z][A-Za-z0-9_-]*$/.test(name)) {
      errors.push(`unsupported-template-expression:${expression}`);
      continue;
    }

    if (rest.length > 0 || (transform && !allowedTransforms.has(transform))) {
      errors.push(`unsupported-template-expression:${expression}`);
    }
  }

  return errors;
}

export function validateGeneratorRegistry(
  registry: RegistryShape,
  descriptorsByPath: Record<string, GeneratorDescriptor>,
  knownRules: ReadonlySet<string>,
): string[] {
  const errors: string[] = [];
  const registrations = new Map<string, GeneratorRegistration>();

  for (const [moduleId, module] of Object.entries(registry.modules)) {
    for (const dependency of module.dependencies) {
      if (!(dependency in registry.modules)) {
        errors.push(`unknown-module-dependency:${moduleId}:${dependency}`);
      }
    }

    for (const registration of module.generators ?? []) {
      if (registrations.has(registration.id)) {
        errors.push(`duplicate-generator-id:${registration.id}`);
      } else {
        registrations.set(registration.id, registration);
      }

      const descriptor = descriptorsByPath[registration.path];
      if (!descriptor) {
        errors.push(`missing-generator-descriptor:${registration.path}`);
        continue;
      }

      if (descriptor.id !== registration.id) {
        errors.push(`generator-id-mismatch:${registration.id}:${descriptor.id}`);
      }

      for (const rule of descriptor.rules) {
        if (!knownRules.has(rule)) {
          errors.push(`unknown-generator-rule:${registration.id}:${rule}`);
        }
      }
    }
  }

  const graph = new Map<string, string[]>();
  for (const [id, registration] of registrations) {
    const descriptor = descriptorsByPath[registration.path];
    const children = descriptor?.compose.map((entry) => entry.generator) ?? [];
    graph.set(id, children);

    for (const child of children) {
      if (!registrations.has(child)) {
        errors.push(`unknown-composed-generator:${id}:${child}`);
      }
    }
  }

  const visiting = new Set<string>();
  const visited = new Set<string>();

  const visit = (id: string): void => {
    if (visiting.has(id)) {
      errors.push(`generator-composition-cycle:${id}`);
      return;
    }
    if (visited.has(id)) return;

    visiting.add(id);
    for (const child of graph.get(id) ?? []) visit(child);
    visiting.delete(id);
    visited.add(id);
  };

  for (const id of graph.keys()) visit(id);

  return errors;
}
