import React, { PureComponent } from 'react';

class FocusArea extends PureComponent {

    renderFocusArea(focusArea) {
        if (focusArea === null) {
            return ('--');
        }
        else {
            return this.props.focusAreaName;
        }
    }

    render() {
        return (
            <div style={{ display: "middle" }}>
                <div className={"ht68 idea-grid-primary-text col-padding v-word-break"}
                    style={{ display: "table-cell", verticalAlign: "middle" }}>
                    {this.props.focusAreaName}
                </div>
            </div>
        );
    }
}



export default FocusArea;
