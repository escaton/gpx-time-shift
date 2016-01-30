import React from 'react';
import shiftTime from 'gpx-shift-time';
import fs from 'fs';

import bootstrapStyle from 'bootstrap/dist/css/bootstrap.css';
import bootstrapThemeStyle from 'bootstrap/dist/css/bootstrap-theme.css';
import bootstrapJs from 'bootstrap';
import datepickerJs from 'eonasdan-bootstrap-datetimepicker';
import datepickerStyle from 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css';
import style from './startup.css';

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

export default React.createClass({
    displayName: 'StartUpPage',

    getInitialState() {
        return {}
    },

    componentDidMount() {
        $('#datepicker').datetimepicker({
            inline: true,
            showTodayButton: true,
            format: 'YYYY-MM-DD HH:mm:ss'
        });
    },

    onFileButtonClick(e) {
        $('#fileDialog').trigger('click');
    },

    onSaveButtonClick(e) {
        $('#out').trigger('click');
    },

    handleTrackNameChange(e) {
        this.setState({trackName: e.target.value});
    },

    handleOpenFile(e) {
        var self = this;
        var file = e.target.files[0];
        var fileString = fs.readFileSync(file.path, 'utf-8');
        shiftTime.fromString(fileString);
        var curTime = Date.now() //shiftTime.getCurrentTime();
        var trackName = 'test' //shiftTime.getName();
        $('#datepicker').data("DateTimePicker").date(new Date(curTime));
        self.refs.out.getDOMNode().setAttribute('nwsaveas', file.path);
        self.setState({
            file: fileString,
            fileName: file.name,
            curTime: new Date(curTime),
            trackName: trackName
        });
    },

    handleSaveFile(e) {
        var self = this;
        var newTime = $('#datepicker').data("DateTimePicker").date();
        var diff = (+newTime - +this.state.curTime)/1000;
        shiftTime.shiftTime(diff);
        // shiftTime.setName(this.state.trackName);
        var newFile = shiftTime.toString();
        var pathToSave = e.target.files[0].path;
        fs.writeFileSync(pathToSave, newFile, 'utf-8');
    },

    render() {
        var selectFile = (
            <div className="select-file row">
                <button type="button" className="btn btn-primary" autoComplete="off" onClick={this.onFileButtonClick}>
                  { this.state.fileName ? this.state.fileName : 'Select .gpx file' }
                </button>
                <input id="fileDialog" type="file" accept=".gpx" ref="file" onChange={this.handleOpenFile}/>
            </div>
        )
        var processFile = (
            <div className="process-file row">
                <h3>Track name</h3>
                <div className='col-sm-6'>
                    <input type="text" className="form-control" id="" value={this.state.trackName ? this.state.trackName : ''} disabled={this.state.trackName !== undefined ? false : 'disabled'} onChange={this.handleTrackNameChange}/>
                </div>
                <h3>Select start time</h3>
                <div className='col-sm-6'>
                    <input type="text" className="form-control" id="datepicker" disabled={this.state.curTime ? false : 'disabled'}/>
                </div>
            </div>
        )
        var saveFile = (
            <div className="save-file row">
                <button type="button" className="btn btn-primary" autoComplete="off" onClick={this.onSaveButtonClick} disabled={this.state.file ? false : 'disabled'}>
                    Save
                </button>
                <input type="file" id="out" ref="out" onChange={this.handleSaveFile} />
            </div>
        )
        return (
            <div className="startup container">
                {selectFile}
                {processFile}
                {saveFile}
            </div>
        )
    }
})
