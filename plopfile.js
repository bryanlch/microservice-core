module.exports = function (plop) {
  plop.setGenerator('feature:layered', {
    description: 'Create a new feature using Layered Architecture (NestJS Standard)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Feature name (e.g. users, orders):',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/features/{{dashCase name}}/{{dashCase name}}.module.ts',
        templateFile: 'plop-templates/layered/module.hbs',
      },
      {
        type: 'add',
        path: 'src/features/{{dashCase name}}/{{dashCase name}}.controller.ts',
        templateFile: 'plop-templates/layered/controller.hbs',
      },
      {
        type: 'add',
        path: 'src/features/{{dashCase name}}/{{dashCase name}}.service.ts',
        templateFile: 'plop-templates/layered/service.hbs',
      },
    ],
  });

  plop.setGenerator('feature:hexagonal', {
    description: 'Create a new feature using Hexagonal Architecture',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Feature name (e.g. users, orders):',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/features/{{dashCase name}}/{{dashCase name}}.module.ts',
        templateFile: 'plop-templates/hexagonal/module.hbs',
      },
      {
        type: 'add',
        path: 'src/features/{{dashCase name}}/domain/entities/{{dashCase name}}.entity.ts',
        templateFile: 'plop-templates/hexagonal/entity.hbs',
      },
      {
        type: 'add',
        path: 'src/features/{{dashCase name}}/application/use-cases/create-{{dashCase name}}.use-case.ts',
        templateFile: 'plop-templates/hexagonal/use-case.hbs',
      },
      {
        type: 'add',
        path: 'src/features/{{dashCase name}}/infrastructure/controllers/{{dashCase name}}.controller.ts',
        templateFile: 'plop-templates/hexagonal/controller.hbs',
      },
      {
        type: 'add',
        path: 'src/features/{{dashCase name}}/domain/ports/{{dashCase name}}.repository.ts',
        templateFile: 'plop-templates/hexagonal/repository.hbs',
      },
      {
        type: 'add',
        path: 'src/features/{{dashCase name}}/infrastructure/adapters/{{dashCase name}}.repository.impl.ts',
        templateFile: 'plop-templates/hexagonal/repository.impl.hbs',
      },
    ],
  });
};
