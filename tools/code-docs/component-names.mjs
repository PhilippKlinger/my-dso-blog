import {Converter, ReflectionKind} from 'typedoc';
import ts from 'typescript';

/**
 * Shows declared function names for default exports in the generated reference.
 *
 * @param {import('typedoc').Application} app - TypeDoc application to configure.
 */
export function load(app) {
  // Rename before TypeDoc builds URLs, navigation and the search index.
  app.converter.on(Converter.EVENT_RESOLVE_BEGIN, context => {
    for (const reflection of context.project.getReflectionsByKind(ReflectionKind.Function)) {
      if (reflection.name !== 'default') continue;

      const symbol = context.getSymbolFromReflection(reflection);
      const declaration = symbol?.declarations?.find(node =>
        ts.isFunctionDeclaration(node) && node.name);
      if (!declaration) continue;

      const name = declaration.name.text;
      reflection.name = name;
      for (const signature of reflection.signatures ?? []) {
        signature.name = name;
      }
    }
  });
}
