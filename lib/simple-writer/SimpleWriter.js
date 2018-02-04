import { AbstractEditor, Toolbar, ContainerEditor} from 'substance'

/**
  We extend from AbstractEditor which provides an abstract implementation
  that should be feasible for most editors.
*/
class SimpleWriter extends AbstractEditor {

    render($$) {
        let SplitPane = this.componentRegistry.get('split-pane')
        let el = $$('div').addClass('sc-prose-editor')
        let toolbar = this._renderToolbar($$)
        let editor = this._renderEditor($$)
        let configurator = this.getConfigurator()
        let ScrollPane = this.componentRegistry.get('scroll-pane')
        let Overlay = this.componentRegistry.get('overlay')
        let ContextMenu = this.componentRegistry.get('context-menu')
        let Dropzones = this.componentRegistry.get('dropzones')

        let contentPanel = $$(ScrollPane, {
            name: 'contentPanel',
            contextMenu: this.props.contextMenu || 'native',
            scrollbarPosition: 'right',
            scrollbarType: this.props.scrollbarType
        }).append(
            editor,
            $$(Overlay, {
                toolPanel: configurator.getToolPanel('main-overlay'),
                theme: 'dark'
            }),
            $$(ContextMenu),
            $$(Dropzones)
        ).ref('contentPanel')

        el.append(
            $$(SplitPane, {splitType: 'horizontal'}).append(
                toolbar,
                contentPanel
            )
        )
        return el
    }

    _renderToolbar($$) {
        let configurator = this.getConfigurator()
        return $$('div').addClass('se-toolbar-wrapper').append(
            $$(Toolbar, {
                toolPanel: configurator.getToolPanel('toolbar')
            }).ref('toolbar')
        )
    }

    _renderEditor($$) {
        let configurator = this.getConfigurator()
        return $$(ContainerEditor, {
            disabled: this.props.disabled,
            editorSession: this.editorSession,
            node: this.doc.get('body'),
            commands: configurator.getSurfaceCommandNames()
        }).ref('body')
    }
}

export default SimpleWriter
