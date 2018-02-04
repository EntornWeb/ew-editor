import {Configurator, EditorSession, DefaultLabelProvider, JSONConverter} from 'substance'
import SimpleWriter from '../lib/simple-writer/SimpleWriter'
import SimpleWriterPackage from '../lib/simple-writer/SimpleWriterPackage'
import fixture from './fixture'

export default function(target, input) {
    console.log('Mouting', target, input);

    let cfg = new Configurator();
    cfg.getLabelProvider = function () {
        return new DefaultLabelProvider(this.config.labels, 'ca');
    };

    class SaveHandler {
        saveDocument(params) {
            return new Promise((resolve) => {
                let doc = params.editorSession.getDocument();
                input.value = JSON.stringify(doc.toJSON());
                resolve();
            });
        }
    }

    cfg.setSaveHandlerClass(SaveHandler);
    cfg.setDefaultLanguage('ca');
    cfg.import(SimpleWriterPackage);

    // Import article from the given input
    let doc = cfg.createArticle(fixture);
    if (input.value) {
        try {
            console.info('Importing document');
            const json = JSON.parse(input.value);
            const converter = new JSONConverter();
            converter.importDocument(doc, json);
        } catch(err) {
            console.warn('Cannot import document from the given input');
        }
    }

    // This is the data structure manipulated by the editor
    let editorSession = new EditorSession(doc, {
        configurator: cfg,
        lang: 'ca'
    });
    editorSession.setLanguage('ca');

    // Mount SimpleWriter to the DOM and run it.
    let component = SimpleWriter.mount({
        editorSession: editorSession
    }, target);
    setInterval(() => {
        editorSession.save();
    }, 1000);

    return {
        editorSession,
        cfg,
        component
    }
}
