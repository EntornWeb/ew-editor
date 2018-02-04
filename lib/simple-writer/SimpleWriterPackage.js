import {
    BasePackage, StrongPackage, EmphasisPackage, LinkPackage, Document,
    ParagraphPackage, HeadingPackage, CodeblockPackage, BlockquotePackage,
    ListPackage
} from 'substance'

import BodyPackage from '../body/BodyPackage'
//import SimpleHTMLImporter from './SimpleHTMLImporter'

/**
 Standard configuration for SimpleWriter

 We define a schema (simple-article) import some core packages
 from Substance, as well as custom node types.

 An HTML importer is registered to be able to turn HTML markup
 into a SimpleArticle instance.
 */
export default {
    name: 'simple-writer',
    configure: function (config) {
        config.defineSchema({
            name: 'simple-article',
            DocumentClass: Document,
            defaultTextType: 'paragraph'
        });

        // BasePackage provides core functionaliy, such as undo/redo
        // and the SwitchTextTypeTool. However, you could import those
        // functionalities individually if you need more control
        config.import(BasePackage);
        config.addLabel('undo', {
            ca: 'Desfer',
            es: 'Deshacer'
        });
        config.addLabel('redo', {
            ca: 'Refer',
            es: 'Rehacer'
        });
        config.addLabel('select-all', {
            ca: 'Seleccionar-ho tot',
            es: 'Seleccionar todo'
        });
        config.addLabel('text-types', {
            ca: 'Tipus text',
            es: 'Tipo texto'
        });
        config.addLabel('container-selection', {
            ca: 'Contenidor',
            es: 'Contenedor'
        });
        config.addLabel('container', {
            ca: 'Contenidor',
            es: 'Contenedor'
        });
        config.addLabel('insert', {
            ca: 'Insertar',
            es: 'Insertar'
        });
        config.addLabel('insert-container', {
            ca: 'Insertar contenidor',
            es: 'Insertar contenedor'
        });

        // core nodes
        config.import(BlockquotePackage);
        config.addLabel('blockquote', {
            ca: 'Cita',
            es: 'Cita'
        });

        config.addLabel('paragraph', {
            ca: 'Normal',
            es: 'Normal'
        });
        config.import(ParagraphPackage);

        config.import(HeadingPackage);
        config.addLabel('heading1', {
            ca: 'Títol 1',
            es: 'Título 1'
        });
        config.addLabel('heading2', {
            ca: 'Títol 2',
            es: 'Título 2'
        });
        config.addLabel('heading3', {
            ca: 'Títol 3',
            es: 'Título 3'
        });

        config.import(CodeblockPackage);
        config.addLabel('codeblock', {
            ca: 'Bloc de codi',
            es: 'Bloque de código'
        });

        config.import(StrongPackage, {toolGroup: 'annotations'});
        config.addLabel('strong', {
            ca: 'Negreta',
            es: 'Negrita'
        });
        config.import(EmphasisPackage, {toolGroup: 'annotations'});
        config.addLabel('emphasis', {
            ca: 'Cursiva',
            es: 'Cursiva'
        });
        config.import(LinkPackage, {toolGroup: 'annotations'});
        config.addLabel('link', {
            ca: 'Enllaç',
            es: 'Enlace'
        });
        config.addLabel('open-link', {
            ca: 'Obrir enllaç',
            es: 'Abrir enlace'
        });
        config.addLabel('delete-link', {
            ca: 'Eliminar enllaç',
            es: 'Eliminar enlace'
        });
        config.import(ListPackage);
        config.addLabel('insert-unordered-list', {
            ca: 'Llista',
            es: 'Lista'
        });
        config.addLabel('insert-ordered-list', {
            ca: 'LLista numerada',
            es: 'Lista numerada'
        });


        // custom nodes
        config.import(BodyPackage);

        // Configure overlay
        config.addToolPanel('main-overlay', [
            {
                name: 'prompt',
                type: 'tool-group',
                commandGroups: ['prompt']
            }
        ]);

        // Configure toolbar
        config.addToolPanel('toolbar', [
            {
                name: 'text-types',
                type: 'tool-dropdown',
                showDisabled: true,
                style: 'descriptive',
                commandGroups: ['text-types']
            },
            {
                name: 'annotations',
                type: 'tool-group',
                showDisabled: true,
                style: 'minimal',
                commandGroups: ['annotations']
            }
        ]);
    }
}
