import React from 'react'
import shiftTime from 'gpx-shift-time';
import fs from 'fs';

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

export default React.createClass({
    displayName: 'StartUpPage',

    getInitialState() {
        return {
            file: ''
        }
    },

    componentDidMount() {
        this.refs.out.getDOMNode().setAttribute('nwsaveas', '');
    },

    handleOpenFile(e) {

        var self = this;
        var reader = new FileReader();
        var file = e.target.files[0];

        reader.onload = function(upload) {
            var decoder = new TextDecoder('utf-8');
            var decodedString = decoder.decode(upload.target.result);
            self.setState({
                file: decodedString
            });
        }

        reader.readAsArrayBuffer(file);
    },

    handleSaveFile(e) {
        var self = this;
        var pathToSave = e.target.files[0].path;
        fs.writeFileSync(pathToSave, this.state.file, 'utf-8');
    },

    handleShift() {
        var file = this.state.file;
        shiftTime.fromString(file);
        shiftTime.shiftTime(60*60);
        var newFile = shiftTime.toString();

        this.setState({
            file: newFile
        });
    },

    render() {
        return (
            <div>
                <h1>Select .gpx file</h1>
                <input id="fileDialog" type="file" accept=".gpx" ref="file" onChange={this.handleOpenFile}/>
                <button onClick={this.handleShift}>Shift</button>
                <input type="file" id="out" ref="out" onChange={this.handleSaveFile}/>
                <pre>
                    {this.state.file}
                </pre>
            </div>
        )
    }
})
