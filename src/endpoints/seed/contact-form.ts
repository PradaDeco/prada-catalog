import { RequiredDataFromCollectionSlug } from 'payload'

export const contactFormData: () => RequiredDataFromCollectionSlug<'forms'> = () => {
  return {
    confirmationMessage: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'El formulario de contacto se envió correctamente.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h2',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    confirmationType: 'message',
    createdAt: '2023-01-12T21:47:41.374Z',
    emails: [
      {
        emailFrom: '"Prada Design" \u003Cdemo@payloadcms.com\u003E',
        emailTo: '{{email}}',
        message: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Hemos recibido correctamente tu formulario de contacto.',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        subject: 'Has recibido un nuevo mensaje.',
      },
    ],
    fields: [
      {
        name: 'full-name',
        blockName: 'full-name',
        blockType: 'text',
        label: 'Nombre completo',
        required: true,
        width: 100,
      },
      {
        name: 'email',
        blockName: 'email',
        blockType: 'email',
        label: 'Correo electrónico',
        required: true,
        width: 100,
      },
      {
        name: 'phone',
        blockName: 'phone',
        blockType: 'number',
        label: 'Teléfono',
        required: false,
        width: 100,
      },
      {
        name: 'message',
        blockName: 'message',
        blockType: 'textarea',
        label: 'Mensaje',
        required: true,
        width: 100,
      },
    ],
    redirect: undefined,
    submitButtonLabel: 'Enviar',
    title: 'Formulario de contacto',
    updatedAt: '2023-01-12T21:47:41.374Z',
  }
}
