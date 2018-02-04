import {Configurator, EditorSession, DefaultLabelProvider, JSONConverter} from 'substance'
import SimpleWriter from '../lib/simple-writer/SimpleWriter'
import SimpleWriterPackage from '../lib/simple-writer/SimpleWriterPackage'
import fixture from './fixture'
import DragManager from '../lib/override/ui/DragManager';

export default function(target, options) {
    console.log('Mouting', options);

    const setup = Object.assign({
        input: null,
        onSave: (value) => null,
    }, options);

    let cfg = new Configurator();
    cfg.getLabelProvider = function () {
        return new DefaultLabelProvider(this.config.labels, 'ca');
    };
    cfg.setDragManagerClass(DragManager);

    class SaveHandler {
        saveDocument(params) {
            return new Promise((resolve) => {
                const doc = params.editorSession.getDocument();
                const value = JSON.stringify(doc.toJSON());
                if (setup.input) setup.input.value = value;
                setup.onSave(value);
                resolve();
            });
        }
    }

    cfg.setSaveHandlerClass(SaveHandler);
    cfg.setDefaultLanguage('ca');
    cfg.import(SimpleWriterPackage);

    // Import article from the given input
    let doc = cfg.createDocument(fixture);
    if (setup.input && setup.input.value) {
        try {
            console.info('Importing document');
            const json = JSON.parse(setup.input.value);
            const converter = new JSONConverter();
            converter.importDocument(doc, json);
        } catch(err) {
            console.warn('Cannot import document from the given input');
        }
    }

    // This is the data structure manipulated by the editor
    let editorSession = new EditorSession(doc, {
        configurator: cfg,
        lang: 'ca',
        context: {
            DOMRoot: target
        }
    });
    editorSession.setLanguage('ca');

    // Mount SimpleWriter to the DOM and run it.
    let component = SimpleWriter.mount({
        editorSession: editorSession
    }, target);

    return {
        editorSession,
        cfg,
        component
    }
}
