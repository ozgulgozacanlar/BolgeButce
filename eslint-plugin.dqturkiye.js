const dqturkiye = {
    meta: {
        name: "eslint-plugin-dqturkiye",
        version: "1.0.0"
    },
    rules: {
        "no-double-dot": {
            create(context) {
                return {
                  ImportDeclaration(node) {
                    const path = node.source.value;
            
                    if (path.startsWith('../')) {
                      context.report({
                        node: node,
                        message: 'Do not use "../" on imports, use "@/"',
                        // fix(fixer) {
                        //   const fixedPath = path.replace(/^(\.\.\/)+/, '@/');
                        //   return fixer.replaceText(node.source, `'${fixedPath}'`);
                        // },
                      });
                    }
                  },
                };
              }
        }
    }
};

export default dqturkiye;